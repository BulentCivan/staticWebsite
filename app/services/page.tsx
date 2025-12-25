import type { Metadata } from "next";
import { wpGraphQL } from "@/src/lib/wp";
import ServicesClient from "./servicesClient";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Leverage’in sunduğu yazılım geliştirme, iş süreç yönetimi, IoT ve güvenlik çözümlerini inceleyin.",
};

type ServiceItem = {
  title?: string | null;
  description?: string | null;
  image?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
};

type ServicesData = {
  nodeByUri?: {
    title?: string | null;
    content?: string | null;
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

const QUERY = /* GraphQL */ `
  query ServicesPage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        title
        content
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
  }
`;

function stripHtml(html?: string | null) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function ServicesPage() {
  const data = await wpGraphQL<ServicesData>(QUERY, { uri: "/hizmetlerimiz/" });

  const page = data?.nodeByUri;
  const title = page?.title ?? "Hizmetlerimiz";

  const introFromWp = stripHtml(page?.content);
  const intro =
    introFromWp ||
    "İşinize değer katan yazılım çözümleri: güvenlikten IoT’ye, performanslı uygulamalardan süreç yönetimine.";

  const s = page?.services ?? {};
  const servicesRaw: Array<ServiceItem & { key: string }> = [
    { key: "service1", ...(s.service1 ?? {}) },
    { key: "service2", ...(s.service2 ?? {}) },
    { key: "service3", ...(s.service3 ?? {}) },
    { key: "service4", ...(s.service4 ?? {}) },
    { key: "service5", ...(s.service5 ?? {}) },
    { key: "service6", ...(s.service6 ?? {}) },
  ].filter((x) => (x.title ?? "").trim().length > 0);

  const services = servicesRaw.map((it) => ({
    key: it.key,
    title: (it.title ?? "").trim(),
    description: (it.description ?? "").trim(),
    imageUrl: it.image?.node?.sourceUrl ?? undefined,
    imageAlt: it.image?.node?.altText ?? it.title ?? "Hizmet görseli",
  }));

  return <ServicesClient title={title} intro={intro} services={services} />;
}
