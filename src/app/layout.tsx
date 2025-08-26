import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/tk-design-system.css";
import Script from "next/script";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "TK-HOST - Plataforma de Gestión de Servidores Premium",
  description: "Admin-TK: Ecosistema unificado para gestión de servidores, bots, apps y comercio digital con rendimiento premium.",
  keywords: ["TK-HOST", "Admin-TK", "gestión servidores", "panel control", "hosting premium"],
  authors: [{ name: "Admin-TK Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00bcd4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            {children}
          </main>
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
