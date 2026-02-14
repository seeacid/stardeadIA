import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "𖤐 Stardead Clothes — Ropa Urbana Futurista",
    template: "%s | Stardead Clothes",
  },
  description:
    "Ropa urbana con visión futurista. Streetwear de autor desde Buenos Aires. Remeras, buzos, hoodies, pantalones y accesorios con estética dark y futurista.",
  keywords: [
    "Stardead",
    "ropa urbana",
    "streetwear",
    "futurista",
    "cyberpunk",
    "Buenos Aires",
    "Argentina",
    "ropa dark",
    "moda alternativa",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Stardead Clothes",
    title: "𖤐 Stardead Clothes — Ropa Urbana Futurista",
    description:
      "Ropa urbana con visión futurista. Cada prenda es un acto de rebeldía contra lo ordinario.",
  },
  twitter: {
    card: "summary_large_image",
    title: "𖤐 Stardead Clothes",
    description: "Ropa urbana con visión futurista desde Buenos Aires.",
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
    <html lang="es-AR" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-text-primary font-body antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-28 md:pt-36">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: '#111',
                border: '1px solid #333',
                color: '#fff',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
