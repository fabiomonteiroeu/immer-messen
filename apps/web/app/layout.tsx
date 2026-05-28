import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_DESCRIPTION =
  "Sensoriamento distribuído por fibra óptica (DAS/DTS) — tecnologia DFOS proprietária para monitoramento contínuo de infraestrutura crítica.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Immer Messen",
    template: "%s | Immer Messen",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Immer Messen",
    title: "Immer Messen",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Immer Messen — Sensoriamento por fibra óptica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immer Messen",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={poppins.variable} data-scroll-behavior="smooth" lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
