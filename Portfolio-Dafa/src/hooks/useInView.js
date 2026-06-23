import { useState, useEffect } from "react";

// ─── HOOK: useInView ──────────────────────────────────────────────
export function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
      ...options,
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}