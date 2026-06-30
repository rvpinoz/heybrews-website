import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import { Preloader } from "@/components/Preloader";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "heybrews — komunitas para brewer",
  description:
    "heybrews adalah creator collective untuk siapa saja yang cinta kopi dan home brewing. Kolaborasi konten, produk, dan event bareng komunitas.",
  metadataBase: new URL("https://heybrews.example.com"),
  openGraph: {
    title: "heybrews — komunitas para brewer",
    description:
      "Creator collective untuk siapa saja yang cinta kopi dan home brewing.",
    images: ["/hero/hero-poster.jpg"],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "heybrews — komunitas para brewer",
    description:
      "Creator collective untuk siapa saja yang cinta kopi dan home brewing.",
    images: ["/hero/hero-poster.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="light" className={cn(inter.variable, "font-sans", geist.variable)}>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <LangProvider>
            <Preloader />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
