// MockUI — a tiny, self-contained UI fragment that exercises every token
// in the palette so you can see colors in working context.
// Pure inline styles — no external CSS — so palette swaps are atomic.

function MockUI({ tokens }) {
  const c = {
    bg: rgbStr(tokens.bg),
    surface: rgbStr(tokens.surface),
    raised: rgbStr(tokens.raised),
    sunken: rgbStr(tokens.sunken),
    line: rgbStr(tokens.line),
    lineStrong: rgbStr(tokens.lineStrong),
    ink: rgbStr(tokens.ink),
    muted: rgbStr(tokens.muted),
    soft: rgbStr(tokens.soft),
    accent: rgbStr(tokens.accent),
    accentStrong: rgbStr(tokens.accentStrong),
    accentInk: rgbStr(tokens.accentInk),
  };

  const s = {
    root: {
      background: c.bg,
      color: c.ink,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      overflow: "hidden",
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSize: 13,
      lineHeight: 1.45,
      display: "flex",
      flexDirection: "column",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px",
      background: c.surface,
      borderBottom: `1px solid ${c.line}`,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: '"Fraunces", "Times New Roman", serif',
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    brandDot: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: c.accent,
      boxShadow: `0 0 0 3px ${c.surface}, 0 0 0 4px ${c.line}`,
    },
    navLinks: {
      display: "flex",
      gap: 14,
      color: c.muted,
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    body: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 12,
      padding: 14,
    },
    hero: {
      background: c.raised,
      border: `1px solid ${c.line}`,
      borderRadius: 10,
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    eyebrow: {
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: c.accent,
      fontWeight: 600,
    },
    h1: {
      fontFamily: '"Fraunces", "Times New Roman", serif',
      fontSize: 22,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      fontWeight: 500,
      margin: 0,
      color: c.ink,
    },
    p: {
      margin: 0,
      color: c.muted,
      fontSize: 12,
    },
    btnRow: {
      display: "flex",
      gap: 8,
      marginTop: 4,
      alignItems: "center",
    },
    btnPrimary: {
      background: c.accent,
      color: c.accentInk,
      border: "none",
      padding: "8px 14px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.02em",
      cursor: "pointer",
    },
    btnGhost: {
      background: "transparent",
      color: c.ink,
      border: `1px solid ${c.lineStrong}`,
      padding: "7px 12px",
      borderRadius: 999,
      fontSize: 12,
      cursor: "pointer",
    },
    sideCol: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    listCard: {
      background: c.surface,
      border: `1px solid ${c.line}`,
      borderRadius: 10,
      overflow: "hidden",
    },
    listHeader: {
      padding: "8px 12px",
      borderBottom: `1px solid ${c.line}`,
      fontSize: 10,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: c.soft,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    listItem: (active, last) => ({
      padding: "9px 12px",
      borderBottom: last ? "none" : `1px solid ${c.line}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: active ? c.raised : "transparent",
      color: c.ink,
    }),
    pill: {
      fontSize: 10,
      padding: "2px 8px",
      borderRadius: 999,
      background: c.accent,
      color: c.accentInk,
      fontWeight: 600,
      letterSpacing: "0.04em",
    },
    softMeta: {
      fontSize: 11,
      color: c.soft,
      fontVariantNumeric: "tabular-nums",
    },
    quote: {
      background: c.sunken,
      borderLeft: `3px solid ${c.accentStrong}`,
      padding: "10px 12px",
      borderRadius: 6,
      color: c.muted,
      fontStyle: "italic",
      fontSize: 12,
    },
    footer: {
      background: c.sunken,
      borderTop: `1px solid ${c.line}`,
      padding: "8px 14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: c.soft,
      fontSize: 10,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
  };

  return (
    <div style={s.root}>
      <div style={s.nav}>
        <div style={s.brand}>
          <span style={s.brandDot} />
          <span>Apothecary</span>
        </div>
        <div style={s.navLinks}>
          <span>Index</span>
          <span>Notes</span>
          <span style={{ color: c.ink }}>Stockists</span>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.hero}>
          <span style={s.eyebrow}>Issue 04 · Spring</span>
          <h1 style={s.h1}>Quiet objects, loud rooms.</h1>
          <p style={s.p}>
            A small study of how palette decisions echo through the
            interfaces we touch every day.
          </p>
          <div style={s.btnRow}>
            <button style={s.btnPrimary}>Read the issue</button>
            <button style={s.btnGhost}>Subscribe</button>
          </div>
        </div>

        <div style={s.sideCol}>
          <div style={s.listCard}>
            <div style={s.listHeader}>
              <span>This week</span>
              <span>3 / 12</span>
            </div>
            <div style={s.listItem(false, false)}>
              <span>Field notes, vol. ii</span>
              <span style={s.softMeta}>04:12</span>
            </div>
            <div style={s.listItem(true, false)}>
              <span>On warm whites</span>
              <span style={s.pill}>NEW</span>
            </div>
            <div style={s.listItem(false, true)}>
              <span>A short detour</span>
              <span style={s.softMeta}>09:48</span>
            </div>
          </div>

          <div style={s.quote}>
            "Color is not what you see, it's what you tolerate."
          </div>
        </div>
      </div>

      <div style={s.footer}>
        <span>© Apothecary Press</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}

window.MockUI = MockUI;
