// Main app — renders all 5 palette cards stacked vertically.
// Each card is its own theming scope (CSS vars set on the card root).

const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "light",
  "focus": "all"
}/*EDITMODE-END*/;

function PaletteCard({ palette, mode, onCopy, isFocused, onFocus }) {
  const tokens = mode === "dark" ? palette.dark : palette.light;
  const cssVars = paletteToVars(tokens);

  return (
    <article
      data-screen-label={palette.name}
      data-theme-surface
      style={{
        ...cssVars,
        background: "rgb(var(--c-bg))",
        color: "rgb(var(--c-ink))",
        border: "1px solid rgb(var(--c-line))",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow:
          mode === "dark"
            ? "0 1px 0 rgba(255,255,255,0.04), 0 30px 60px -30px rgba(0,0,0,0.6)"
            : "0 1px 0 rgba(255,255,255,0.6), 0 30px 60px -30px rgba(60,40,10,0.18)",
      }}
    >
      {/* Card header */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "22px 28px 18px",
          borderBottom: "1px solid rgb(var(--c-line))",
          background: "rgb(var(--c-surface))",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgb(var(--c-accent))",
              fontWeight: 600,
              fontFamily: '"Inter", system-ui, sans-serif',
            }}
          >
            Palette · {String(PALETTES.indexOf(palette) + 1).padStart(2, "0")}
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: '"Fraunces", "Times New Roman", serif',
              fontSize: 38,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              color: "rgb(var(--c-ink))",
            }}
          >
            {palette.name}
          </h2>
          <p
            style={{
              margin: "4px 0 0",
              maxWidth: 480,
              color: "rgb(var(--c-muted))",
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {palette.blurb}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={onFocus}
            style={{
              background: "transparent",
              color: "rgb(var(--c-muted))",
              border: "1px solid rgb(var(--c-line-strong))",
              padding: "7px 12px",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: '"Inter", system-ui, sans-serif',
            }}
          >
            {isFocused ? "← Show all" : "Focus"}
          </button>
        </div>
      </header>

      {/* Card body — three columns: swatches | tokens | mock UI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) minmax(420px, 1.4fr)",
          gap: 24,
          padding: 28,
        }}
      >
        <div>
          <SwatchStack tokens={tokens} onCopy={onCopy} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgb(var(--c-soft))",
              fontWeight: 600,
              fontFamily: '"Inter", system-ui, sans-serif',
            }}
          >
            In context
          </span>
          <MockUI tokens={tokens} />
        </div>
      </div>
    </article>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { mode, focus } = tweaks;
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const onCopy = (hex) => {
    try {
      navigator.clipboard.writeText(hex);
    } catch (e) {
      // ignore — best effort
    }
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(hex);
    toastTimer.current = setTimeout(() => setToast(null), 1400);
  };

  const visiblePalettes = useMemo(() => {
    if (focus === "all") return PALETTES;
    const found = PALETTES.find((p) => p.id === focus);
    return found ? [found] : PALETTES;
  }, [focus]);

  // Page chrome uses neutral, palette-agnostic surface so individual
  // palette cards read as discrete artifacts rather than bleeding together.
  const pageBg = mode === "dark" ? "#0e0d0c" : "#efece5";
  const pageInk = mode === "dark" ? "#e9e3d4" : "#1a1611";
  const pageMuted = mode === "dark" ? "#8a8276" : "#766c5d";
  const pageLine = mode === "dark" ? "#2a2620" : "#d8d2c2";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: pageBg,
        color: pageInk,
        fontFamily: '"Inter", system-ui, sans-serif',
        transition: "background 280ms ease, color 280ms ease",
      }}
    >
      <header
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "56px 32px 24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: pageMuted,
              fontWeight: 600,
            }}
          >
            Palette Studies · 2026
          </span>
          <h1
            style={{
              margin: "10px 0 0",
              fontFamily: '"Fraunces", "Times New Roman", serif',
              fontSize: 56,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              color: pageInk,
            }}
          >
            Palette
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              maxWidth: 560,
              color: pageMuted,
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            Bunch of palettes, click to copy, darkmode toggle
          </p>
        </div>

        <button
          type="button"
          onClick={() => setTweak("mode", mode === "dark" ? "light" : "dark")}
          style={{
            background: "transparent",
            color: pageInk,
            border: `1px solid ${pageLine}`,
            padding: "10px 16px",
            borderRadius: 999,
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {mode === "dark" ? "☼ Light" : "☾ Dark"}
        </button>
      </header>

      <main
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "8px 32px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {visiblePalettes.map((p) => (
          <PaletteCard
            key={p.id}
            palette={p}
            mode={mode}
            onCopy={onCopy}
            isFocused={focus === p.id}
            onFocus={() =>
              setTweak("focus", focus === p.id ? "all" : p.id)
            }
          />
        ))}
      </main>

      <footer
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 32px 56px",
          display: "flex",
          justifyContent: "space-between",
          color: pageMuted,
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          borderTop: `1px solid ${pageLine}`,
          paddingTop: 24,
        }}
      >
        <span>© Palette Studies</span>
        <span>{PALETTES.length} systems · 12 tokens each</span>
      </footer>

      {/* Floating dark mode toggle */}
      <button
        type="button"
        onClick={() => setTweak("mode", mode === "dark" ? "light" : "dark")}
        title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 50,
          background: mode === "dark" ? "#2a2620" : "#ffffff",
          color: pageInk,
          border: `1px solid ${pageLine}`,
          width: 44,
          height: 44,
          borderRadius: "50%",
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: mode === "dark"
            ? "0 4px 16px rgba(0,0,0,0.5)"
            : "0 4px 16px rgba(60,40,10,0.14)",
          transition: "background 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
        }}
      >
        {mode === "dark" ? "☼" : "☾"}
      </button>

      {/* Copy toast */}
      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            background: mode === "dark" ? "#f7f0e2" : "#16120c",
            color: mode === "dark" ? "#16120c" : "#fbf6ec",
            padding: "10px 18px",
            borderRadius: 999,
            fontSize: 12,
            fontFamily:
              '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
            letterSpacing: "0.04em",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.35)",
            zIndex: 60,
            pointerEvents: "none",
          }}
        >
          Copied {toast}
        </div>
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={mode}
            onChange={(v) => setTweak("mode", v)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Cycle">
          <TweakSelect
            label="Show"
            value={focus}
            onChange={(v) => setTweak("focus", v)}
            options={[
              { value: "all", label: "All five palettes" },
              ...PALETTES.map((p) => ({ value: p.id, label: p.name })),
            ]}
          />
          <div
            style={{
              display: "flex",
              gap: 6,
              marginTop: 8,
            }}
          >
            <TweakButton
              onClick={() => {
                const ids = ["all", ...PALETTES.map((p) => p.id)];
                const i = ids.indexOf(focus);
                const prev = ids[(i - 1 + ids.length) % ids.length];
                setTweak("focus", prev);
              }}
            >
              ← Prev
            </TweakButton>
            <TweakButton
              onClick={() => {
                const ids = ["all", ...PALETTES.map((p) => p.id)];
                const i = ids.indexOf(focus);
                const next = ids[(i + 1) % ids.length];
                setTweak("focus", next);
              }}
            >
              Next →
            </TweakButton>
          </div>
        </TweakSection>

        <TweakSection title="Copy">
          <p
            style={{
              margin: 0,
              fontSize: 11,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Click any swatch or hex value in a palette to copy its hex to
            your clipboard.
          </p>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
