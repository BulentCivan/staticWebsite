"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Ana Sayfa", icon: HomeIcon },
  { href: "/services", label: "Hizmetlerimiz", icon: GridIcon },
  { href: "/aboutUs", label: "Hakkımızda", icon: InfoIcon },
  { href: "/contact", label: "İletişim", icon: MailIcon },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ESC ile kapat
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Drawer açıkken body scroll kilitle
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
              Leverage
            </Link>

            {/* Desktop nav (seninki gibi) */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              {navItems.map((i) => (
                <Link key={i.href} className="hover:text-slate-900" href={i.href}>
                  {i.label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm"
              aria-label="Menüyü aç"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="block w-5">
                <span className="block h-0.5 bg-slate-900 mb-1.5" />
                <span className="block h-0.5 bg-slate-900 mb-1.5" />
                <span className="block h-0.5 bg-slate-900" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/55 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <aside
        className={`absolute right-0 top-0 h-full w-[82vw] max-w-xs bg-white shadow-2xl
        transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
        }`}
        >

          {/* Header area */}
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900">
              L
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">Leverage</div>
              <div className="truncate text-xs text-slate-500">Yazılım & Dijital Dönüşüm</div>
            </div>

            <button
              className="ml-auto rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700"
              onClick={() => setOpen(false)}
              aria-label="Menüyü kapat"
            >
              X
            </button>
          </div>

          {/* Menu items */}
          <nav className="px-2 py-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        active
                          ? "bg-emerald-50 text-slate-900"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700",
                        ].join(" ")}
                      >
                        <Icon />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Alt bölüm  */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">
            <a
            href="tel:+90 000 000 00 00"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
            Ara
            </a>

          </div>
        </aside>
      </div>
    </>
  );
}

/* --- Minimal inline SVG icons (ek paket gerekmez) --- */
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 7h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}
