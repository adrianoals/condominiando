import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Condominiando com Rafael Zanin | O programa que desvenda o universo condominial",
  description:
    "Condominiando é um programa apresentado por Rafael Zanin, dedicado ao universo dos condomínios. Ao vivo toda terça-feira às 20h pela Nova TV Alto Tietê e YouTube.",
  keywords: ["condomínio", "síndico", "Rafael Zanin", "Condominiando", "Nova TV Alto Tietê", "gestão condominial"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Condominiando com Rafael Zanin",
    description: "O programa que desvenda o universo condominial. Ao vivo toda terça-feira às 20h.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/images/logo1.png", width: 800, height: 800, alt: "Condominiando" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
