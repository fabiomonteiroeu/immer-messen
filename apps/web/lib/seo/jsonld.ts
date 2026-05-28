import { getSiteUrl } from "@/lib/seo/site-url";

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Immer Messen",
    url,
    logo: `${url}/assets/img/logo-immer.png`,
    sameAs: ["https://www.linkedin.com/company/immer-messen/"],
    description:
      "Tecnologia DAS/DTS de sensoriamento distribuido por fibra optica para monitoramento em tempo real de infraestruturas criticas.",
  };
}

export function articleJsonLd({
  headline,
  description,
  image,
  url,
  datePublished,
  dateModified,
}: {
  headline: string;
  description?: string;
  image?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(description ? { description } : {}),
    ...(image ? { image: [image] } : {}),
    url,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    publisher: {
      "@type": "Organization",
      name: "Immer Messen",
    },
  };
}

export function jsonLdScript(payload: object): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
