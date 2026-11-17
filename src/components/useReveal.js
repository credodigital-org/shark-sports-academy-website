import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL = [
  ".section-heading", ".classes-section-heading", ".gallery-heading", ".branches-heading",
  ".testimonial-heading", ".mission-card-heading", ".about-section-title",
  ".home-activity-card", ".gallery-image", ".trainer-card", ".home-branch-card",
  ".activity-card", ".service-card", ".branch-card", ".about-stat-item",
  ".mission-card", ".story-content", ".story-image", ".about-testimonial-card",
  ".events-content", ".event-item", ".classes-benefits", ".gallery-image-card",
  ".gallery-filters", ".gallery-controls", ".gallery-load-more", ".branch-map",
  ".footer-about", ".footer-links", ".footer-contact", ".footer-bottom",
].join(",");

const TILT = [
  ".home-activity-card", ".gallery-image", ".trainer-card", ".home-branch-card",
  ".activity-card", ".service-card", ".branch-card", ".mission-card",
  ".about-testimonial-card", ".about-stat-item", ".gallery-image-card",
].join(",");

const DIRECTION = [
  [".story-image", "left"], [".story-content", "right"],
  [".about-testimonial-card", "zoom"], [".about-stat-item", "zoom"],
  [".events-content", "right"], [".classes-benefits", "left"],
  [".footer-bottom", "fade"],
];

const ease = (t) => 1 - Math.pow(1 - t, 3);

function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = "1";
  const raw = el.textContent.trim();
  const m = raw.match(/^(\d[\d,]*)(.*)$/);
  if (!m) return;
  const target = parseInt(m[1].replace(/,/g, ""), 10);
  const suffix = m[2];
  const start = performance.now();
  const dur = 1700;
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * ease(p)).toLocaleString("en-US") + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = raw;
  };
  requestAnimationFrame(tick);
}

/* Scroll-reveal (directional + staggered), tilt flags and stat counters on every page */
export default function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seen = new Map(); // parent -> number of revealed siblings (for stagger)
    const observed = new WeakSet(); // per-run, so React StrictMode re-runs re-observe everything
    const supportsIO = "IntersectionObserver" in window;

    const io = supportsIO ? new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.classList.add("reveal-in");
          io.unobserve(el);
          el.querySelectorAll(".about-stat-text h3").forEach(countUp);
          if (el.matches(".about-stat-text h3")) countUp(el);
          // after the entrance finishes, make hover/tilt snappy
          setTimeout(() => el.style.setProperty("--reveal-delay", "0ms"), 1400);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    ) : null;

    const show = (el) => {
      el.classList.add("reveal-in");
      el.querySelectorAll(".about-stat-text h3").forEach(countUp);
      el.style.setProperty("--reveal-delay", "0ms");
    };

    const prep = (el) => {
      if (observed.has(el)) return;
      observed.add(el);
      if (el.classList.contains("reveal-in")) return;
      el.classList.add("reveal");
      const idx = seen.get(el.parentElement) || 0;
      seen.set(el.parentElement, idx + 1);
      el.style.setProperty("--reveal-delay", `${Math.min(idx, 7) * 90}ms`);
      const dir = DIRECTION.find(([sel]) => el.matches(sel));
      if (dir) el.dataset.reveal = dir[1];
      if (el.matches(TILT)) el.dataset.tilt = "";
      if (io) io.observe(el);
      else show(el);
    };

    document.querySelectorAll(REVEAL).forEach(prep);

    let moQueued = false;
    const mo = new MutationObserver(() => {
      if (moQueued) return;
      moQueued = true;
      requestAnimationFrame(() => {
        moQueued = false;
        document.querySelectorAll(REVEAL).forEach(prep);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // safety net: anything on screen that is still hidden after 1.2s is shown
    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.reveal-in)").forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight && b.bottom > 0) show(el);
      });
    }, 1200);
    const onScroll = () => {
      document.querySelectorAll(".reveal:not(.reveal-in)").forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight * 0.95 && b.bottom > 0) show(el);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      if (io) io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}
