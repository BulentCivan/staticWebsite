import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "./components/Footer";

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
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
              Leverage
            </Link>

            <nav className="flex items-center gap-6 text-sm text-slate-700">
              <Link className="hover:text-slate-900" href="/">Ana Sayfa</Link>
              <Link className="hover:text-slate-900" href="/services">Hizmetlerimiz</Link>
              <Link className="hover:text-slate-900" href="/aboutUs">Hakkımızda</Link>
              <Link className="hover:text-slate-900" href="/contact">İletişim</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
