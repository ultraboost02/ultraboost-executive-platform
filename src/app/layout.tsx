import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UltraBoost Executive",
  description:
    "UltraBoost Executive — excellence, discrétion et standards irréprochables. Réservé aux professionnels éligibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className="font-sans"
        style={{
          backgroundColor: "#0A0A0F",
          color: "#F5F5F7",
          minHeight: "100%",
        }}
      >
        <noscript>
          <div
            style={{
              padding: "2rem",
              maxWidth: "32rem",
              margin: "0 auto",
              fontFamily: "system-ui, sans-serif",
              lineHeight: 1.5,
            }}
          >
            <p style={{ fontWeight: 700, color: "#C9A84C" }}>UltraBoost Executive</p>
            <p style={{ marginTop: "0.75rem" }}>
              Ce site nécessite JavaScript activé pour s&apos;afficher correctement.
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
