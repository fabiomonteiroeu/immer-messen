import type { SupportedLocale } from "@/lib/i18n/config";
import type { CmsCase } from "./schemas";

const media = (id: number, url: string, alternativeText: string) => ({
  id,
  url,
  alternativeText,
});

const gallery1 = [
  media(301, "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80", ""),
  media(302, "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=800&q=80", ""),
  media(303, "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", ""),
];

const casesPt: CmsCase[] = [
  {
    id: 101,
    title: "Monitoramento de cabos submarinos",
    slug: "monitoramento-cabos-submarinos",
    locale: "pt-BR",
    summary:
      "Sensoriamento distribuido por fibra optica para monitorar integridade e ameacas em cabos submarinos de longa distancia.",
    coverImage: media(201, "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80", "Cabos submarinos sob monitoramento DAS"),
    heroMedia: media(401, "/assets/img/case-hero-offshore.png", "Hero do case offshore"),
    projectTitle: "Projeto P&D Petrobras",
    projectSubtitle: "Monitoramento de integridade de dutos flexiveis submarinos",
    details: {
      client: "Petrobras",
      startDate: "2017-01-01",
      duration: "3 meses",
      tags: ["offshore", "integridade de dutos", "DAS", "P&D"],
    },
    sections: [
      {
        __component: "case.text-section",
        html: "<p>Em um cenario de operacao cada vez mais exigente, a Immer Messen aplicou sua tecnologia DAS de fase para monitoramento continuo de toda a extensao do ativo. A solucao permitiu identificar eventos com precisao de localizacao inferior a 5 metros, integrando-se ao SCADA do cliente e oferecendo alertas em tempo real a equipe de operacao. Resultado: reducao de tempo de resposta em ate 80% comparado as inspecoes tradicionais.</p>",
      },
      { __component: "case.gallery-section", images: gallery1 },
      {
        __component: "case.text-section",
        html: "<p>A integracao com a infraestrutura existente foi um dos pontos-chave do projeto. A fibra optica usada para monitoramento e a mesma ja instalada na operacao - sem necessidade de duplicacao, escavacao ou substituicao. O interrogador DATS realizou medicoes simultaneas de DAS e DTS, entregando informacao acustica e termica sobre o mesmo cabo.</p>",
      },
      {
        __component: "case.hero-image-section",
        image: media(411, "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1800&q=80", ""),
      },
      {
        __component: "case.text-section",
        html: "<p>Os dados gerados pelo sistema alimentam dashboards operacionais customizados, permitindo analises de tendencia, correlacao com variaveis externas e geracao de evidencias para auditoria. A escalabilidade da arquitetura permite estender o monitoramento para outros trechos com minimo investimento incremental.</p>",
      },
      { __component: "case.gallery-section", images: gallery1 },
    ],
  },
  {
    id: 102,
    title: "Monitoramento de Baleias",
    slug: "monitoramento-baleias",
    locale: "pt-BR",
    summary:
      "Aquisicao acustica distribuida para observacao de cetaceos e mitigacao de impacto em estudos sismicos offshore.",
    coverImage: media(202, "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80", "Baleias em ambiente marinho"),
    heroMedia: media(402, "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1800&q=80", "Hero baleias"),
    projectTitle: "Monitoramento acustico de cetaceos",
    projectSubtitle: "Mitigacao de impacto ambiental em operacoes offshore",
    details: {
      client: "Consorcio offshore",
      startDate: "2021-06-01",
      duration: "12 meses",
      tags: ["bioacustica", "offshore", "DAS"],
    },
    sections: [
      {
        __component: "case.text-section",
        html: "<p>Usando a fibra optica instalada como sensor distribuido, o sistema identifica padroes acusticos caracteristicos de diferentes especies de cetaceos. As deteccoes alimentam um protocolo de mitigacao que aciona pausas operacionais automaticas durante atividades sismicas em areas de presenca confirmada.</p>",
      },
      { __component: "case.gallery-section", images: gallery1 },
    ],
  },
  {
    id: 103,
    title: "Monitoramento de Linhas de Transmissao de Energia",
    slug: "monitoramento-transmissao-energia",
    locale: "pt-BR",
    summary:
      "Deteccao de eventos e variacoes termicas em corredores de transmissao eletrica usando fibra optica padrao.",
    coverImage: media(203, "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80", "Linhas de transmissao de energia"),
    heroMedia: media(403, "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=80", "Hero linhas de transmissao"),
    projectTitle: "Monitoramento de linhas de alta tensao",
    projectSubtitle: "Deteccao de incendios, vandalismo e variacoes termicas",
    details: {
      client: "Operador de transmissao",
      startDate: "2022-03-01",
      duration: "18 meses",
      tags: ["energia", "DTS", "alarmistica"],
    },
    sections: [
      {
        __component: "case.text-section",
        html: "<p>O sistema combina DAS e DTS para monitorar vibracoes anomalas (queda de torres, intrusao) e variacoes termicas (incendios, sobrecarga). Eventos sao classificados por algoritmos treinados em campo brasileiro e enviados ao centro de operacoes em tempo real.</p>",
      },
      { __component: "case.gallery-section", images: gallery1 },
    ],
  },
  {
    id: 104,
    title: "Monitoramento de Gasodutos",
    slug: "monitoramento-gasodutos",
    locale: "pt-BR",
    summary:
      "Deteccao precoce de vazamentos, intrusoes e variacoes operacionais ao longo de gasodutos com DAS e DTS.",
    coverImage: media(204, "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", "Gasodutos industriais"),
    heroMedia: media(404, "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80", "Hero gasodutos"),
    projectTitle: "Vigilancia continua de gasodutos",
    projectSubtitle: "Reducao de risco operacional e perdas",
    details: {
      client: "Operadora de gasodutos",
      startDate: "2020-09-01",
      duration: "24 meses",
      tags: ["dutos", "DAS", "DTS", "vazamentos"],
    },
    sections: [
      {
        __component: "case.text-section",
        html: "<p>O sistema cobre centenas de quilometros do duto com um unico interrogador DATS, classificando eventos de vazamento, escavacao nao autorizada, derivacao clandestina e atividade humana proxima. A latencia de alerta e tipicamente inferior a 30 segundos do evento ao centro de operacoes.</p>",
      },
      { __component: "case.gallery-section", images: gallery1 },
    ],
  },
];

export const mockCasesByLocale: Partial<Record<SupportedLocale, CmsCase[]>> = {
  "pt-BR": casesPt,
};

export function getMockCases(locale: SupportedLocale): CmsCase[] {
  const localized = mockCasesByLocale[locale];
  if (localized && localized.length > 0) return localized;
  const fallback = mockCasesByLocale["pt-BR"] ?? [];
  return fallback.map((entry) => ({ ...entry, locale }));
}

export function getMockCaseBySlug(locale: SupportedLocale, slug: string): CmsCase | null {
  const cases = getMockCases(locale);
  return cases.find((entry) => entry.slug === slug) ?? null;
}
