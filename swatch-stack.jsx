// Swatch column + token list (with click-to-copy hex).

function SwatchStack({ tokens, onCopy }) {
  // 4 hero swatches + a strip of all 12 — gives the "feel" plus the spec.
  const heroOrder = ["bg", "surface", "ink", "accent"];

  const heroLabels = {
    bg: "Page",
    surface: "Surface",
    ink: "Ink",
    accent: "Accent",
  };

  const heroLayout = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  };

  const heroCard = (key) => {
    const t = tokens[key];
    const dark = isLight(t) ? false : true; // determines text color
    return (
      <button
        key={key}
        type="button"
        onClick={() => onCopy(hexOf(t))}
        title={`Copy ${hexOf(t)}`}
        style={{
          background: rgbStr(t),
          border: `1px solid rgb(var(--c-line))`,
          borderRadius: 10,
          padding: "14px 12px",
          textAlign: "left",
          cursor: "pointer",
          minHeight: 78,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: dark ? "rgb(245 240 230)" : "rgb(20 16 10)",
          fontFamily: '"Inter", system-ui, sans-serif',
          transition: "transform 120ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          {heroLabels[key]}
        </span>
        <span
          style={{
            fontFamily:
              '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 13,
            letterSpacing: "0.02em",
          }}
        >
          {hexOf(t)}
        </span>
      </button>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={heroLayout}>{heroOrder.map(heroCard)}</div>
      <TokenTable tokens={tokens} onCopy={onCopy} />
    </div>
  );
}

function TokenTable({ tokens, onCopy }) {
  return (
    <div
      style={{
        border: "1px solid rgb(var(--c-line))",
        borderRadius: 10,
        overflow: "hidden",
        background: "rgb(var(--c-surface))",
      }}
    >
      {TOKEN_KEYS.map(([key, label], idx) => {
        const t = tokens[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onCopy(hexOf(t))}
            title={`Copy ${hexOf(t)}`}
            style={{
              display: "grid",
              gridTemplateColumns: "20px 1fr auto",
              gap: 12,
              alignItems: "center",
              width: "100%",
              padding: "8px 12px",
              background: "transparent",
              border: "none",
              borderBottom:
                idx === TOKEN_KEYS.length - 1
                  ? "none"
                  : "1px solid rgb(var(--c-line))",
              cursor: "pointer",
              textAlign: "left",
              color: "rgb(var(--c-ink))",
              fontFamily: '"Inter", system-ui, sans-serif',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgb(var(--c-raised))")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: rgbStr(t),
                border: "1px solid rgb(var(--c-line))",
                display: "inline-block",
              }}
            />
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.15,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgb(var(--c-ink))",
                }}
              >
                --c-{key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "rgb(var(--c-soft))",
                }}
              >
                {label}
              </span>
            </span>
            <span
              style={{
                fontFamily:
                  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                color: "rgb(var(--c-muted))",
                letterSpacing: "0.02em",
              }}
            >
              {hexOf(t)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// crude perceived-lightness check used only to flip text color on hero swatches
function isLight(rgb) {
  const [r, g, b] = rgb;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.6;
}

Object.assign(window, { SwatchStack, TokenTable });
