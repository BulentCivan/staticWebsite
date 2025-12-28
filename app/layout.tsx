import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: {
    default: "Leverage | Yazılım ve Dijital Dönüşüm",
    template: "%s | Leverage",
  },
  description:
    "Leverage; yazılım geliştirme, danışmanlık ve dijital dönüşüm süreçlerinde uçtan uca çözümler sunar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <Header />

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
