import type { Metadata } from "next";
import { wpGraphQL } from "@/src/lib/wp";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Leverage ile iletişime geçin. Projeniz için bilgi almak, teklif istemek veya iş birliği görüşmek için bize ulaşın.",
};

type Data = {
  nodeByUri: {
    __typename: "Page";
    title?: string | null;
    content?: string | null;
  } | null;
};

const QUERY = `
query {
  nodeByUri(uri: "/iletisim/") {
    __typename
    ... on Page {
      title
      content
    }
  }
}
`;

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
      {children}
    </span>
  );
}

export default async function ContactPage() {
  const data = await wpGraphQL<Data>(QUERY);
  const page = data.nodeByUri && data.nodeByUri.__typename === "Page" ? data.nodeByUri : null;

  return (
    <main className="relative">
      {/* background decor */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-[-10rem] h-[36rem] w-[36rem] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-24 right-[-12rem] h-[40rem] w-[40rem] rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* header */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {page?.title || "İletişim"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">
            Projenizi konuşalım. Size en uygun çözümü birlikte planlayalım.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* left */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">İletişim Bilgileri</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Aşağıdaki kanallardan bize ulaşabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a
                  href="mailto:info@example.com"
                  className="group rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <p className="text-xs font-medium text-slate-500">E-posta</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-slate-800">
                    info@example.com
                  </p>
                  <p className="mt-1 text-xs text-slate-600">Teklif ve bilgi için</p>
                </a>

                <a
                  href="tel:+900000000000"
                  className="group rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <p className="text-xs font-medium text-slate-500">Telefon</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-slate-800">
                    +90 000 000 00 00
                  </p>
                </a>

                <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm sm:col-span-2">
                  <p className="text-xs font-medium text-slate-500">Adres</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">İzmir / Türkiye</p>
                  <p className="mt-1 text-xs text-slate-600">Ofis / Uzaktan</p>
                </div>
              </div>
            </div>

            {/* wp content (optional) */}
            {page?.content ? (
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
                <div
                  className="prose prose-slate max-w-none prose-a:text-slate-900 prose-a:no-underline hover:prose-a:underline prose-p:text-slate-700"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            ) : null}
          </div>

          {/* right: social */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Sosyal</p>
              <p className="mt-2 text-sm text-slate-600">
                Güncellemeler ve duyurular için takip edin.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#" aria-label="LinkedIn" className="text-slate-800">
                  <SocialIcon>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.38c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.84v5.47H7.52V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.5 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.72 20.45h3.56V9H3.72v11.45z" />
                    </svg>
                  </SocialIcon>
                </a>

                <a href="#" aria-label="Instagram" className="text-slate-800">
                  <SocialIcon>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm6.2-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
                    </svg>
                  </SocialIcon>
                </a>
              </div>

              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
