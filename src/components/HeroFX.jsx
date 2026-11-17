import { useEffect, useRef } from "react";

/* Interactive hero layer: rising bubbles that flee the cursor, live sine waves
   that swell where you move, click splash ripples, mouse parallax variables,
   rotating light rays and a scroll cue. */
const HeroFX = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf, visible = true;
    const pointer = { x: -999, y: -999, nx: 0.5 };
    const ripples = [];

    const mkBubble = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      r: 2 + Math.random() * 7,
      vy: 0.4 + Math.random() * 0.9,
      base: 0.4 + Math.random() * 0.9,
      vx: 0,
      ph: Math.random() * 6.28,
    });
    let bubbles = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 700 ? 22 : 46;
      bubbles = Array.from({ length: count }, () => mkBubble(true));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    const local = (e) => {
      const r = hero.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
    };
    const onMove = (e) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.nx = p.x / p.w;
      hero.style.setProperty("--mx", ((p.x / p.w - 0.5) * 2).toFixed(3));
      hero.style.setProperty("--my", ((p.y / p.h - 0.5) * 2).toFixed(3));
    };
    const onLeave = () => {
      pointer.x = pointer.y = -999;
      hero.style.setProperty("--mx", 0);
      hero.style.setProperty("--my", 0);
    };
    const onDown = (e) => {
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, r: 0, a: 0.9 });
      ripples.push({ x: p.x, y: p.y, r: -18, a: 0.6 });
      for (let i = 0; i < 12; i++) {
        const b = mkBubble(false);
        b.x = p.x; b.y = p.y; b.r = 2 + Math.random() * 5;
        b.vx = (Math.random() - 0.5) * 4; b.vy = 1 + Math.random() * 2.5;
        bubbles.push(b);
      }
      if (bubbles.length > 140) bubbles.splice(0, bubbles.length - 140);
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("pointerdown", onDown);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(hero);

    const waves = [
      { amp: 14, freq: 0.006, speed: 0.9, color: "rgba(255,255,255,0.10)", off: 150 },
      { amp: 18, freq: 0.0045, speed: -0.7, color: "rgba(80,230,255,0.14)", off: 135 },
      { amp: 11, freq: 0.0085, speed: 1.3, color: "rgba(255,255,255,0.12)", off: 118 },
    ];

    let t = 0, last = performance.now();
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!visible) { last = now; return; }
      const dt = Math.min((now - last) / 16.7, 3);
      last = now;
      t += 0.016 * dt * (reduce ? 0.2 : 1);
      ctx.clearRect(0, 0, w, h);

      // live waves, swelling toward the pointer
      waves.forEach((wv, k) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 8) {
          const near = Math.exp(-Math.pow((x - pointer.x) / 160, 2));
          const boost = pointer.y > 0 ? near * 22 : 0;
          const y = h - wv.off + Math.sin(x * wv.freq + t * wv.speed * 2 + k) * (wv.amp + boost);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wv.color;
        ctx.fill();
      });

      // bubbles (vy = upward speed)
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const dx = b.x - pointer.x, dy = b.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120 && d2 > 1) {
          const d = Math.sqrt(d2), f = (120 - d) / 120;
          b.vx += (dx / d) * f * 0.9;
          b.vy -= (dy / d) * f * 0.5;
        }
        b.vx *= 0.96;
        b.vy += (b.base - b.vy) * 0.02 * dt;
        b.x += (b.vx + Math.sin(t * 2 + b.ph) * 0.35) * dt;
        b.y -= b.vy * dt;
        if (b.y < -20 || b.y > h + 60 || b.x < -30 || b.x > w + 30) {
          if (i >= (w < 700 ? 22 : 46)) bubbles.splice(i, 1); // click-burst bubbles just pop
          else bubbles[i] = mkBubble(false);
          continue;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 6.283);
        ctx.fillStyle = "rgba(190,245,255,0.16)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(220,252,255,0.55)";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.22, 0, 6.283);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
      }

      // click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3.2 * dt;
        rp.a -= 0.012 * dt;
        if (rp.a <= 0) { ripples.splice(i, 1); continue; }
        if (rp.r < 0) continue;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, 6.283);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = `rgba(150,245,255,${rp.a})`;
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const scrollDown = () =>
    window.scrollBy({ top: Math.max(window.innerHeight - 100, 500), behavior: "smooth" });

  return (
    <>
      <div className="hero-rays" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <button className="scroll-cue" onClick={scrollDown} aria-label="Scroll down">
        <span className="scroll-cue-dot" />
      </button>
    </>
  );
};

export default HeroFX;
