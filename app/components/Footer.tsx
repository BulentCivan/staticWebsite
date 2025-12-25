import Link from "next/link";

type Social = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
      {children}
    </span>
  );
}

const socials: Social[] = [
  {
    name: "LinkedIn",
    href: "#", // TODO: linkini koy
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.38c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.84v5.47H7.52V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.5 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.72 20.45h3.56V9H3.72v11.45z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#", // TODO
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm6.2-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white/60 backdrop-blur">
      {/* background decor */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50rem_50rem_at_15%_0%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(50rem_50rem_at_85%_30%,rgba(14,165,233,0.08),transparent_55%)]" />
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <p className="text-base font-semibold text-slate-900">Leverage</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-700">
                Yazılım geliştirme, danışmanlık ve dijital dönüşüm süreçlerinde uçtan uca çözümler.
              </p>

              <div className="mt-5 flex items-center gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} aria-label={s.name} className="text-slate-800">
                    <Icon>{s.icon}</Icon>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-sm font-semibold text-slate-900">Hızlı Bağlantılar</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-slate-700 hover:text-slate-900">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-slate-700 hover:text-slate-900">
                    Hizmetlerimiz
                  </Link>
                </li>
                <li>
                  <Link href="/aboutUs" className="text-slate-700 hover:text-slate-900">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-700 hover:text-slate-900">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-semibold text-slate-900">İletişim</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-medium text-slate-900">E-posta:</span>{" "}
                  <a className="hover:text-slate-900" href="mailto:info@leverage.com.tr">
                    info@leverage.com.tr
                  </a>
                </p>
                <p>
                  <span className="font-medium text-slate-900">Telefon:</span>{" "}
                  <a className="hover:text-slate-900" href="tel:+900000000000">
                    +90 000 000 00 00
                  </a>
                </p>
                <p>
                  <span className="font-medium text-slate-900">Adres:</span>{" "}
                  İzmir / Türkiye
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Leverage. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
