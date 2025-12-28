import type { Metadata } from "next";
import Link from "next/link";
import { wpGraphQL } from "@/src/lib/wp";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description:
    "Leverage; yazılım geliştirme, danışmanlık ve dijital dönüşüm süreçlerinde uçtan uca çözümler sunar.",
};

type IconEdge = { node?: { sourceUrl?: string | null; altText?: string | null } | null };

const references = [
  { name: "Şirket A", src: "/logos/company-a.png" },
  { name: "Şirket B", src: "/logos/company-b.png" },
  { name: "Şirket C", src: "/logos/company-c.png" },
  { name: "Şirket D", src: "/logos/company-d.png" },
  { name: "Şirket E", src: "/logos/company-e.png" },
  { name: "Şirket F", src: "/logos/company-f.png" },
  { name: "Şirket G", src: "/logos/company-g.png" },
  { name: "Şirket H", src: "/logos/company-h.png" },
];

type ServiceItem = {
  title?: string | null;
  description?: string | null;
  image?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
};

type HomeFeatureBlock = {
  title?: string | null;
  description?: string | null;
  feature1Icon?: IconEdge | null;
};

type Data = {
  page: {
    title: string;
    home: {
      ozellikler?: {
        feature1Title?: string | null;
        feture1Description?: string | null;
        feature1Icon?: IconEdge | null;
      } | null;
      feature2?: HomeFeatureBlock | null;
      feature3?: HomeFeatureBlock | null;
    } | null;
  } | null;

  servicesPage: {
    title: string;
    services?: {
      service1?: ServiceItem | null;
      service2?: ServiceItem | null;
      service3?: ServiceItem | null;
      service4?: ServiceItem | null;
      service5?: ServiceItem | null;
      service6?: ServiceItem | null;
    } | null;
  } | null;
};

const QUERY = `
query {
  page(id: 83, idType: DATABASE_ID) {
    title
    home {
      ozellikler {
        feature1Title
        feture1Description
        feature1Icon { node { sourceUrl altText } }
      }
      feature2 {
        title
        description
        feature1Icon { node { sourceUrl altText } }
      }
      feature3 {
        title
        description
        feature1Icon { node { sourceUrl altText } }
      }
    }
  }

  servicesPage: page(id: 9, idType: DATABASE_ID) {
    title
    services {
      service1 { title description image { node { sourceUrl altText } } }
      service2 { title description image { node { sourceUrl altText } } }
      service3 { title description image { node { sourceUrl altText } } }
      service4 { title description image { node { sourceUrl altText } } }
      service5 { title description image { node { sourceUrl altText } } }
      service6 { title description image { node { sourceUrl altText } } }
    }
  }
}
`;

export default async function Home() {
  const data = await wpGraphQL<Data>(QUERY);

  const p = data.page;
  const h = p?.home;
  if (!p || !h) return <main>Sayfa bulunamadı.</main>;

  const features = [
    h.ozellikler
      ? {
          title: h.ozellikler.feature1Title ?? "",
          description: h.ozellikler.feture1Description ?? "",
          iconUrl: h.ozellikler.feature1Icon?.node?.sourceUrl ?? "",
          iconAlt:
            h.ozellikler.feature1Icon?.node?.altText ??
            h.ozellikler.feature1Title ??
            "",
        }
      : null,

    h.feature2
      ? {
          title: h.feature2.title ?? "",
          description: h.feature2.description ?? "",
          iconUrl: h.feature2.feature1Icon?.node?.sourceUrl ?? "",
          iconAlt: h.feature2.feature1Icon?.node?.altText ?? h.feature2.title ?? "",
        }
      : null,

    h.feature3
      ? {
          title: h.feature3.title ?? "",
          description: h.feature3.description ?? "",
          iconUrl: h.feature3.feature1Icon?.node?.sourceUrl ?? "",
          iconAlt: h.feature3.feature1Icon?.node?.altText ?? h.feature3.title ?? "",
        }
      : null,
  ].filter(
    (x): x is { title: string; description: string; iconUrl: string; iconAlt: string } =>
      !!x && x.title.trim().length > 0
  );

  const sp = data.servicesPage;
  const s = sp?.services ?? {};
  const services = [
    { key: "service1", ...((s.service1 ?? {}) as ServiceItem) },
    { key: "service2", ...((s.service2 ?? {}) as ServiceItem) },
    { key: "service3", ...((s.service3 ?? {}) as ServiceItem) },
    { key: "service4", ...((s.service4 ?? {}) as ServiceItem) },
    { key: "service5", ...((s.service5 ?? {}) as ServiceItem) },
    { key: "service6", ...((s.service6 ?? {}) as ServiceItem) },
  ].filter((x) => (x.title ?? "").trim().length > 0) as Array<ServiceItem & { key: string }>;

  return (
    <main>
      {/* Page-wide background decor (fills left/right empty feeling) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-[-10rem] h-[36rem] w-[36rem] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-24 right-[-12rem] h-[40rem] w-[40rem] rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-10 shadow-sm backdrop-blur">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_20%_0%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60rem_60rem_at_80%_30%,rgba(14,165,233,0.10),transparent_55%)]" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{p.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
              Yazılım geliştirme, danışmanlık ve dijital dönüşüm süreçlerinde uçtan uca çözümler sunuyoruz.
            </p>
          </div>
        </div>

        {/* PREMIUM FEATURE CARDS (floating icon) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative overflow-visible rounded-2xl border border-slate-200 bg-white/70 p-7 pt-12 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* accent line */}
              <div className="pointer-events-none absolute left-6 right-6 top-0 h-[6px] rounded-b-full bg-gradient-to-r from-indigo-500/60 via-sky-500/60 to-emerald-500/40" />

              {/* hover glow */}
              <div className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.14),transparent_50%)]" />

              {/* floating icon */}
              <div className="absolute -top-8 left-6">
                <div className="relative h-16 w-16 transition group-hover:scale-105">
                  <div className="absolute inset-0 -z-10 rounded-full bg-sky-400/15 blur-xl" />
                  {f.iconUrl ? (
                    <img src={f.iconUrl} alt={f.iconAlt} className="h-16 w-16 rounded-full object-cover" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-slate-100" />
                  )}
                </div>
              </div>

              <h3 className="mt-1 text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW (title + image only) */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Hizmetler</h2>
            <p className="mt-2 text-sm text-slate-600">Öne çıkan hizmet alanlarımız.</p>
          </div>

          <Link href="/services" className="text-sm font-medium text-slate-900 hover:text-slate-700">
            Tümünü gör →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => {
            const img = item.image?.node?.sourceUrl ?? "";
            const alt = item.image?.node?.altText ?? item.title ?? "Hizmet görseli";

            return (
              <Link
                key={item.key}
                href={`/services#${item.key}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500/60 via-sky-500/60 to-emerald-500/40" />

                <div className="p-4">
                  {img ? (
                    <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      <img
                        src={img}
                        alt={alt}
                        className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="h-44 w-full rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100" />
                  )}

                  <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* REFERENCES / LOGO MARQUEE */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Referanslarımız</h2>
            <p className="mt-2 text-sm text-slate-600">Birlikte çalıştığımız markalardan bazıları.</p>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/90 to-transparent" />

          <div
            className="marquee-track flex w-[200%] items-center gap-10 py-6"
            style={{ animation: "marquee-left 28s linear infinite" }}
          >
            <div className="flex w-1/2 items-center gap-10">
              {references.map((logo) => (
                <div
                  key={`a-${logo.name}`}
                  className="flex h-14 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 shadow-sm"
                  title={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="flex w-1/2 items-center gap-10">
              {references.map((logo) => (
                <div
                  key={`b-${logo.name}`}
                  className="flex h-14 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 shadow-sm"
                  title={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
