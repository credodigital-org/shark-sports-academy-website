import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp, X } from "lucide-react";

const HERO_SEL = ".hero,.about-hero,.classes-hero,.gallery-hero,.branches-hero";
const TILT_SEL = "[data-tilt]";
const MAGNET_SEL =
  ".primary-btn,.about-admission-btn,.classes-admission-btn,.gallery-admission-btn,.branches-admission-btn,.small-btn,.gallery-load-more button";
const LIGHTBOX_SEL = ".gallery-image-card,.gallery-image";

/* Site-wide interactive layer: loader, scroll progress, hero scroll-parallax,
   cursor ring, card 3D tilt, magnetic buttons, gallery lightbox, back-to-top. */
const SiteFX = () => {
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const [loading, setLoading] = useState(() => {
    try { return !sessionStorage.getItem("shark-loaded"); } catch { return true; }
  });
  const [showTop, setShowTop] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      setLoading(false);
      try { sessionStorage.setItem("shark-loaded", "1"); } catch { /* ignore */ }
    }, 1500);
    return () => clearTimeout(t);
  }, [loading]);

  // scroll progress + hero parallax + back to top
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      document.querySelectorAll(HERO_SEL).forEach((el) => el.style.setProperty("--sy", Math.min(y, 900)));
      setShowTop(y > 600);
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // cursor ring, tilt, magnetic
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const ring = ringRef.current;
    let tx = -100, ty = -100, cx = -100, cy = -100, raf;
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (ring) ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    let tiltEl = null, tiltBase = null, magEl = null, magBase = null;
    const reset = (el, vars) => {
      if (!el) return;
      vars.forEach((v) => el.style.removeProperty(v));
    };
    const baseRect = (el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left + window.scrollX, t: r.top + window.scrollY, w: r.width, h: r.height };
    };
    const PAD = 10; // hysteresis so the card never flickers at its edge

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (ring) {
        ring.classList.add("on");
        const hot = e.target.closest("a,button,[data-tilt],.gallery-image,.gallery-image-card");
        ring.classList.toggle("hot", !!hot);
      }

      // --- 3D tilt: measured against the card's rest position, not its tilted one ---
      let card = e.target.closest(TILT_SEL);
      if (tiltEl && tiltBase) {
        const inside =
          e.pageX >= tiltBase.l - PAD && e.pageX <= tiltBase.l + tiltBase.w + PAD &&
          e.pageY >= tiltBase.t - PAD && e.pageY <= tiltBase.t + tiltBase.h + PAD;
        if (inside) card = tiltEl;
      }
      if (card !== tiltEl) {
        if (tiltEl) { tiltEl.classList.remove("is-tilting"); reset(tiltEl, ["--rx", "--ry"]); }
        tiltEl = card;
        tiltBase = card ? baseRect(card) : null;
        if (card) card.classList.add("is-tilting");
      }
      if (card && tiltBase) {
        const px = Math.min(Math.max((e.pageX - tiltBase.l) / tiltBase.w, 0), 1) - 0.5;
        const py = Math.min(Math.max((e.pageY - tiltBase.t) / tiltBase.h, 0), 1) - 0.5;
        card.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
        card.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        card.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      }

      // --- magnetic buttons ---
      const btn = e.target.closest(MAGNET_SEL);
      if (btn !== magEl) {
        reset(magEl, ["--bx", "--by"]);
        magEl = btn;
        magBase = btn ? baseRect(btn) : null;
      }
      if (btn && magBase) {
        const cx = magBase.l + magBase.w / 2, cy = magBase.t + magBase.h / 2;
        btn.style.setProperty("--bx", `${((e.pageX - cx) * 0.2).toFixed(1)}px`);
        btn.style.setProperty("--by", `${((e.pageY - cy) * 0.3).toFixed(1)}px`);
      }
    };
    const onLeaveDoc = () => ring && ring.classList.remove("on");
    const onDown = () => ring && ring.classList.add("down");
    const onUp = () => ring && ring.classList.remove("down");

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
    };
  }, []);

  // gallery lightbox
  useEffect(() => {
    const onClick = (e) => {
      const card = e.target.closest(LIGHTBOX_SEL);
      if (!card) return;
      const img = card.tagName === "IMG" ? card : card.querySelector("img");
      if (img) setLightbox({ src: img.currentSrc || img.src, alt: img.alt });
    };
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={barRef} />
      <div className="cursor-ring" ref={ringRef} />

      <button
        className={`back-to-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label="Close"><X size={26} /></button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className={`site-loader ${loading ? "" : "done"}`} aria-hidden={!loading}>
        <div className="loader-inner">
          <img src="/images/logo.png" alt="" />
          <div className="loader-water"><span /></div>
        </div>
      </div>
    </>
  );
};

export default SiteFX;
