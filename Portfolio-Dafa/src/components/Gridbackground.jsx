import { TOKENS } from "../data/tokens";

/*
 * ─── GRID BACKGROUND ─────────────────────────────────────────────
 *
 * Grille subtile identique à celle du Loader, adaptée au thème.
 * À placer une seule fois dans Portfolio.jsx, en `position:fixed`
 * derrière tout le contenu.
 *
 * Props
 *   dark : boolean
 */
export function GridBackground({ dark }) {
  const color = dark
    ? "rgba(99,211,255,0.035)"   // accent cyan très atténué en dark
    : "rgba(37,99,235,0.045)";   // accent bleu très atténué en light

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",

        /* Deux dégradés linéaires croisés = grille */
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",

        /*
         * Masque en dégradé radial : la grille est bien visible au centre
         * et s'efface progressivement sur les bords, évitant l'effet "cage".
         */
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 100%)",

        transition: "background-image 0.35s ease",
      }}
    />
  );
}