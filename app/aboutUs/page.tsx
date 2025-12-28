import type { Metadata } from "next";
import Link from "next/link";
import { wpGraphQL } from "@/src/lib/wp";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Leverage hakkında: ekibimiz, yaklaşımımız ve yazılım geliştirme ile dijital dönüşüm alanındaki uzmanlığımızı keşfedin.",
};

type Data = {
  page: {
    title?: string | null;
    content?: string | null;
  } | null;
};

const ABOUT_PAGE_ID = 14;

const QUERY = `
query AboutPage($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    title
    content
  }
}
`;

const values = [
  {
    title: "Misyon",
    desc: "Müşterilerimizin hedeflerine uygun, güvenli ve sürdürülebilir yazılım çözümleri üretmek.",
  },
  {
    title: "Vizyon",
    desc: "Dijital dönüşümde güvenilir bir teknoloji ortağı olarak uzun vadeli değer yaratmak.",
  },
  {
    title: "Değerler",
    desc: "Şeffaf iletişim, kalite odaklılık, sürekli öğrenme ve ölçülebilir sonuçlar.",
  },
] as const;

export default async function AboutUsPage() {
  const data = await wpGraphQL<Data>(QUERY, { id: ABOUT_PAGE_ID });
  const page = data.page;

  return (
    <main className="relative">
      {/* background decor */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-[-10rem] h-[36rem] w-[36rem] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-24 right-[-12rem] h-[40rem] w-[40rem] rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-10 shadow-sm backdrop-blur">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_20%_0%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60rem_60rem_at_80%_30%,rgba(14,165,233,0.10),transparent_55%)]" />

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                {page?.title || "Hakkımızda"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
                İhtiyaçları doğru anlayıp, ölçülebilir çıktılar üreten çözümler geliştiriyoruz.
              </p>
            </div>
          </div>

          {/* values cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <article
                key={v.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-7 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500/60 via-sky-500/60 to-emerald-500/40" />
                <div className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.14),transparent_50%)]" />

                <h3 className="text-base font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WP content */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur">
          {page?.content ? (
            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-slate-900 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p className="text-sm text-slate-700">
              WordPress’te “Hakkımızda” sayfasına içerik ekleyince burada görünecek.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
