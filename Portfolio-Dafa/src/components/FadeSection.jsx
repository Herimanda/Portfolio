import { useRef } from "react";
import { useInView } from "../hooks/useInView";

// ─── FADE SECTION (animation au scroll) ──────────────────────────
export function FadeSection({ children, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}