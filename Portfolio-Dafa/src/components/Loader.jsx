import { useEffect, useState } from "react";

export function Loader({ onDone }) {
  const [phase, setPhase] = useState("draw");   // draw | fill | text | hold | exit
  const [visibleChars, setVisibleChars] = useState(0);
  const NAME = "DAFA";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fill"), 900);
    const t2 = setTimeout(() => setPhase("text"), 1400);
    const t3 = setTimeout(() => setPhase("hold"), 1800);
    const t4 = setTimeout(() => setPhase("exit"), 2200);
    const t5 = setTimeout(() => onDone?.(), 2700);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onDone]);

  // Écriture lettre par lettre pendant la phase "text"
  useEffect(() => {
    if (phase !== "text") return;
    setVisibleChars(0);
    const interval = setInterval(() => {
      setVisibleChars((n) => {
        if (n >= NAME.length) { clearInterval(interval); return n; }
        return n + 1;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [phase]);

  
  const ARC_LEN = 282;   
  const ARC2_LEN = 188; 

  const drawing  = phase === "draw";
  const filled   = ["fill", "text", "hold", "exit"].includes(phase);
  const showText = ["text", "hold", "exit"].includes(phase);
  const exiting  = phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080c14",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.06)" : "scale(1)",
        transition: exiting
          ? "opacity 0.48s cubic-bezier(0.4,0,0.2,1), transform 0.48s cubic-bezier(0.4,0,0.2,1)"
          : "none",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* ── Grille de fond subtile ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,211,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(99,211,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* ── Halo de fond derrière le logo ── */}
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,211,255,0.08) 0%, rgba(167,139,250,0.05) 50%, transparent 70%)",
          opacity: filled ? 1 : 0,
          transition: "opacity 0.6s ease",
          filter: "blur(20px)",
        }}
      />

      {/* ── Logo SVG animé ── */}
      <svg
        viewBox="0 0 120 120"
        width="130"
        height="130"
        style={{ position: "relative", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#63d3ff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>


        {/* Arc extérieur */}
        <path
          d="M 28 15 L 52 15 C 82 15 95 32 95 60 C 95 88 82 105 52 105 L 28 105 Z"
          fill={filled ? "url(#logoGrad)" : "none"}
          fillOpacity={filled ? 0.12 : 0}
          stroke="url(#logoGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={filled ? "url(#glow)" : undefined}
          style={{
            strokeDasharray: ARC_LEN,
            strokeDashoffset: drawing ? ARC_LEN : 0,
            transition: drawing
              ? "none"
              : "stroke-dashoffset 0.85s cubic-bezier(0.4,0,0.2,1), fill-opacity 0.5s ease",
          }}
        />

        {/* Montant vertical gauche */}
        <line
          x1="28" y1="15" x2="28" y2="105"
          stroke="url(#logoGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter={filled ? "url(#glow)" : undefined}
          style={{
            strokeDasharray: 90,
            strokeDashoffset: drawing ? 90 : 0,
            transition: drawing
              ? "none"
              : "stroke-dashoffset 0.85s cubic-bezier(0.4,0,0.2,1) 0.05s",
          }}
        />

        {/* Arc intérieur (découpe du D) */}
        <path
          d="M 44 32 L 52 32 C 70 32 76 42 76 60 C 76 78 70 88 52 88 L 44 88 Z"
          fill="#080c14"
          fillOpacity={filled ? 1 : 0}
          stroke="url(#logoGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: ARC2_LEN,
            strokeDashoffset: drawing ? ARC2_LEN : 0,
            transition: drawing
              ? "none"
              : "stroke-dashoffset 0.75s cubic-bezier(0.4,0,0.2,1) 0.1s, fill-opacity 0.4s ease 0.15s",
          }}
        />

        {/* Point décoratif en bas à droite */}
        <circle
          cx="88" cy="96"
          r="4"
          fill="url(#logoGrad)"
          filter="url(#glowStrong)"
          opacity={filled ? 1 : 0}
          style={{ transition: "opacity 0.4s ease 0.3s" }}
        />

        {/* Anneau tournant autour du logo */}
        <circle
          cx="60" cy="60" r="56"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="0.8"
          strokeOpacity={filled ? 0.25 : 0}
          strokeDasharray="12 8"
          style={{
            transition: "stroke-opacity 0.5s ease",
            transformOrigin: "60px 60px",
            animation: "loaderSpin 8s linear infinite",
          }}
        />
        {/* Anneau intérieur (sens inverse) */}
        <circle
          cx="60" cy="60" r="48"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.5"
          strokeOpacity={filled ? 0.15 : 0}
          strokeDasharray="6 14"
          style={{
            transition: "stroke-opacity 0.5s ease",
            transformOrigin: "60px 60px",
            animation: "loaderSpinReverse 6s linear infinite",
          }}
        />
      </svg>

      {/* ── Nom "DAFA" qui s'écrit ── */}
      <div
        style={{
          marginTop: 22,
          height: 28,
          display: "flex",
          alignItems: "center",
          gap: 3,
          opacity: showText ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {NAME.split("").map((char, i) => (
          <span
            key={i}
            style={{
              fontSize: 20,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              letterSpacing: "0.25em",
              background: "linear-gradient(135deg, #63d3ff, #a78bfa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              opacity: i < visibleChars ? 1 : 0,
              transform: i < visibleChars ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
              filter: "drop-shadow(0 0 8px rgba(99,211,255,0.5))",
            }}
          >
            {char}
          </span>
        ))}
        {/* Curseur clignotant */}
        {showText && visibleChars < NAME.length && (
          <span
            style={{
              width: 2,
              height: 18,
              background: "#63d3ff",
              borderRadius: 1,
              animation: "loaderBlink 0.7s steps(1) infinite",
              marginLeft: 2,
            }}
          />
        )}
      </div>
      {/* ── Barre de progression ── */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 1,
          background: "rgba(99,211,255,0.1)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg, #63d3ff, #a78bfa)",
            width: exiting ? "100%" : phase === "hold" ? "90%" : phase === "text" ? "65%" : phase === "fill" ? "35%" : "5%",
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 8px rgba(99,211,255,0.6)",
          }}
        />
      </div>

      {/* ── Keyframes injectées ── */}
      <style>{`
        @keyframes loaderSpin        { to { transform: rotate(360deg); } }
        @keyframes loaderSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes loaderBlink       { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}