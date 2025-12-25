"use client";

import { useEffect, useState } from "react";

type ServiceItem = {
  key: string; // "service1" gibi
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export default function ServicesClient({
  title,
  intro,
  services,
}: {
  title: string;
  intro: string;
  services: ServiceItem[];
}) {
  // her servis için ayrı open state (multi-open)
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // hash ile gelince sadece o kartı aç (multi-open olduğu için diğerlerini kapatmıyoruz)
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.replace("#", "").trim());
      if (!id) return;

      setOpenMap((prev) => ({ ...prev, [id]: true }));

      // DOM hazır olduktan sonra kaydır
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-[-10rem] h-[36rem] w-[36rem] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-24 right-[-12rem] h-[40rem] w-[40rem] rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{intro}</p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 items-start">
        {services.map((s) => {
          const id = s.key; // anchor id
          const isOpen = !!openMap[id];
          const hasDetail = (s.description ?? "").trim().length > 0;

          return (
            <article
              key={s.key} // ❗️index değil, stabil key
              id={id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* dekor katmanlar tıklamayı bozmasın */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300" />
              <div className="pointer-events-none absolute -inset-6 opacity-0 blur-2xl transition group-hover:opacity-100 bg-gradient-to-r from-indigo-200/60 via-sky-200/60 to-emerald-200/60" />

              <div className="relative p-5">
                {s.imageUrl ? (
                  <div className="mb-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <img
                      src={s.imageUrl}
                      alt={s.imageAlt || s.title}
                      className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mb-4 h-52 w-full rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // ❗️komşu karta sıçramayı engeller
                      if (!hasDetail) return;
                      toggle(id);
                      // URL hash güncelle (opsiyonel ama güzel)
                      history.replaceState(null, "", `#${encodeURIComponent(id)}`);
                    }}
                    disabled={!hasDetail}
                    aria-expanded={isOpen}
                    className={[
                      "shrink-0 rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition",
                      hasDetail
                        ? "border border-slate-200 bg-white hover:bg-slate-50"
                        : "cursor-not-allowed border border-slate-100 bg-slate-50 text-slate-400 shadow-none",
                    ].join(" ")}
                  >
                    {isOpen ? "Kapat" : "Detayı gör"}
                  </button>
                </div>

                {/* Detay alanı (sadece tıklanan açılır, multi-open destekli) */}
                <div
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-200",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                      <p className="text-sm leading-relaxed text-slate-700">{s.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
