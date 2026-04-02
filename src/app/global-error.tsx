"use client";

/**
 * Erreur au niveau racine (layout). Doit inclure html/body.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0A0A0F",
          color: "#F5F5F7",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            UltraBoost
          </p>
          <h1 style={{ marginTop: "1rem", fontSize: "1.25rem" }}>Erreur critique</h1>
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#9999A9" }}>
            {error.message || "Impossible de charger l'application."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid rgba(201,168,76,0.35)",
              background: "rgba(201,168,76,0.12)",
              color: "#E4C972",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
