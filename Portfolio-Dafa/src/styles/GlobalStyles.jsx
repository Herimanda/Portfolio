// ─── GLOBAL STYLES ────────────────────────────────────────────────
// Injecté une seule fois dans Portfolio.jsx via une balise <style>
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: auto; }
  ::selection { background: rgba(99,211,255,0.22); }

  @keyframes fadeIn    { from{opacity:0}                           to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeSlideIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(99,211,255,0.18); border-radius: 99px; }

  .nav-link { position: relative; }
  .nav-link::after {
    content:''; position:absolute; bottom:-2px; left:50%; right:50%;
    height:1.5px; background:var(--nav-accent); border-radius:99px;
    transition:left 0.25s ease, right 0.25s ease, opacity 0.25s ease; opacity:0;
  }
  .nav-link:hover::after  { left:14px; right:14px; opacity:1; }
  .nav-link.active::after { left:14px; right:14px; opacity:1; }

  .theme-switch {
    position:relative; width:52px; height:28px; border-radius:99px;
    cursor:pointer; border:none; transition:background 0.3s; flex-shrink:0;
  }
  .theme-switch-thumb {
    position:absolute; top:3px; width:22px; height:22px; border-radius:50%;
    background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.3);
    transition:left 0.3s cubic-bezier(0.34,1.56,0.64,1);
    display:flex; align-items:center; justify-content:center;
    font-size:12px; line-height:1;
  }

  .pdp-img {
    -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 45%, black 55%, transparent 100%);
    mask-image: radial-gradient(ellipse 85% 85% at 50% 45%, black 55%, transparent 100%);
  }
`;