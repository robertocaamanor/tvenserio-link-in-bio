import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // This import is for side effects (CSS)

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TVenserio - Link in Bio | Entretenimiento y Series",
  description: "Descubre los últimos artículos, reseñas y análisis del mundo del entretenimiento. Tu portal de series, películas y contenido audiovisual.",
  keywords: "TVenserio, series, entretenimiento, reseñas, análisis, películas, streaming",
  authors: [{ name: "TVenserio" }],
  creator: "TVenserio",
  publisher: "TVenserio",
  openGraph: {
    title: "TVenserio - Tu portal de entretenimiento",
    description: "Análisis, reseñas y noticias del mundo del entretenimiento",
    url: "https://www.tvenserio.com",
    siteName: "TVenserio",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
