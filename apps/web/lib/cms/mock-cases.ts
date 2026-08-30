import { z } from "zod";

import type { SupportedLocale } from "@/lib/i18n/config";
import { cmsCaseSchema } from "./schemas";
import type { CmsCase } from "./schemas";

const media = (id: number, url: string, alternativeText: string) => ({
  id,
  url,
  alternativeText,
});

/**
 * As entradas abaixo sao escritas no formato de **entrada** do contrato zod: todo conteudo
 * visivel vive em `sections`, e os campos legados do content type (heroMedia, client, startDate,
 * duration, tags, projectLogos, heroTitle, challenge, leadTitle, leadSubtitle, body) nao sao mais
 * declarados aqui. Eles continuam existindo no schema ate o plano 10-06; o `parse` no fim do
 * arquivo preenche os defaults e prova, em tempo de execucao, que o fallback local satisfaz
 * exatamente o mesmo contrato que a resposta do Strapi precisa satisfazer.
 */
type MockCaseInput = z.input<typeof cmsCaseSchema>;

const rawCasesPt: MockCaseInput[] = [
  {
    id: 101,
    title: "Monitoramento de cabos submarinos",
    slug: "monitoramento-cabos-submarinos",
    locale: "pt-BR",
    summary:
      "Monitoramento de integridade de dutos flexiveis submarinos com sensoriamento distribuido por fibra optica.",
    sectorCategory: "offshore",
    coverImage: media(
      201,
      "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80",
      "Cabos submarinos sob monitoramento DAS",
    ),
    sections: [
      {
        __component: "case.hero-section",
        title: "Monitoramento de cabos submarinos",
        subtitle:
          "Integridade de dutos flexiveis monitorada de ponta a ponta com a fibra optica que ja estava instalada na operacao.",
        media: media(401, "/assets/img/case-hero-offshore.png", "Operacao offshore ao amanhecer"),
      },
      {
        __component: "case.info-card",
        icon: "clipboard",
        title: "Detalhes do projeto",
        rows: [
          { label: "Cliente", value: "Petrobras" },
          { label: "Data de inicio", value: "01/01/2017" },
          { label: "Duracao", value: "3 meses" },
          { label: "Tags", value: "offshore, integridade de dutos, DAS, P&D" },
        ],
        partnerLogos: [
          {
            logo: media(
              901,
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Petrobras_logo.svg/200px-Petrobras_logo.svg.png",
              "Petrobras",
            ),
            url: "https://petrobras.com.br",
            alt: "Petrobras",
          },
        ],
        logosCaption: "Projeto conduzido em parceria com a Petrobras.",
      },
      {
        __component: "case.info-card",
        icon: "target",
        title: "O desafio",
        body: `<p>Inspecoes tradicionais de dutos flexiveis submarinos sao pontuais, caras e dependem de janela operacional: cada campanha cobre um trecho, num instante, e deixa o restante do ativo sem observacao ate a proxima. O desafio era obter cobertura continua de toda a extensao sem escavar, duplicar ou substituir a infraestrutura ja instalada.</p>`,
      },
      {
        __component: "case.lead-section",
        title: `<p>Transformar a fibra optica ja instalada em um <strong>sensor acustico continuo</strong> ao longo de todo o ativo.</p>`,
        subtitle:
          "Como o sensoriamento distribuido substitui a inspecao pontual por observacao permanente.",
      },
      {
        __component: "case.text-section",
        body: `<p>Em um cenario de operacao cada vez mais exigente, a Immer Messen aplicou sua tecnologia DAS de fase para monitoramento continuo de toda a extensao do ativo. A solucao permitiu identificar eventos com precisao de localizacao inferior a 5 metros, integrando-se ao SCADA do cliente e oferecendo alertas em tempo real a equipe de operacao. Resultado: reducao de tempo de resposta em ate 80% comparado as inspecoes tradicionais.</p>`,
      },
      {
        __component: "case.highlight-section",
        variant: "opening",
        eyebrow: "A solucao",
        heading: "A mesma fibra, dois sentidos de medicao",
        body: `<p><b>O interrogador DATS realiza medicoes simultaneas de DAS e DTS sobre o mesmo cabo</b>, entregando informacao acustica e termica sem qualquer intervencao fisica na infraestrutura submarina existente.</p>`,
      },
      {
        __component: "case.figure-section",
        image: media(
          501,
          "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1800&q=80",
          "Cabo de fibra optica em bobina antes do lancamento",
        ),
        alt: "Bobina de cabo de fibra optica em conves de embarcacao, pronta para lancamento ao mar.",
        caption: "O mesmo cabo de telecomunicacoes passa a operar como sensor distribuido.",
      },
      {
        __component: "case.section-title",
        title: "Integracao com a operacao",
      },
      {
        __component: "case.two-column-section",
        leftBody: `<p>A integracao com a infraestrutura existente foi um dos pontos-chave do projeto. A fibra optica usada para monitoramento e a mesma ja instalada na operacao — sem necessidade de duplicacao, escavacao ou substituicao. O trabalho de campo se resumiu a instalar o interrogador em terra e caracterizar o cabo.</p>`,
        pullQuote: "sem escavacao, sem parada, sem cabo novo",
        rightBody: `<p>Os dados gerados pelo sistema alimentam dashboards operacionais customizados, permitindo analises de tendencia, correlacao com variaveis externas e geracao de evidencias para auditoria.</p><p>A escalabilidade da arquitetura permite estender o monitoramento para outros trechos com minimo investimento incremental, reaproveitando o mesmo interrogador.</p>`,
      },
      {
        __component: "case.panel-section",
        icon: "bar_chart",
        title: "Resultados",
        defaultOpen: false,
        body: `<p>Localizacao de eventos com precisao inferior a 5 metros, alerta em tempo real integrado ao SCADA e reducao de ate 80% no tempo de resposta frente a inspecao tradicional.</p><p>Detalhes tecnicos da plataforma em <a href="https://immermessen.com" target="_blank" rel="noopener noreferrer">immermessen.com</a>.</p>`,
      },
      {
        __component: "case.highlight-section",
        variant: "closing",
        heading: "Da inspecao pontual a observacao permanente do ativo",
        body: `<p>A mesma base tecnologica se estende a seguranca de ativos submarinos, deteccao de intrusao em dutos e monitoramento estrutural de infraestrutura critica.</p>`,
      },
    ],
  },
  {
    id: 102,
    title: "Monitoramento de Baleias",
    slug: "monitoramento-baleias",
    locale: "pt-BR",
    summary:
      "Aquisicao acustica distribuida para observacao de cetaceos e mitigacao de impacto em estudos sismicos offshore.",
    sectorCategory: "meio-ambiente",
    coverImage: media(
      202,
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80",
      "Baleias em ambiente marinho",
    ),
    sections: [
      {
        __component: "case.hero-section",
        title: "Ouvindo o oceano",
        subtitle: "Bioacustica marinha em escala continua, sem tocar na infraestrutura submarina.",
        media: media(
          402,
          "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1800&q=80",
          "Baleia emergindo em mar aberto",
        ),
      },
      {
        __component: "case.info-card",
        icon: "waves",
        title: "Detalhes do projeto",
        rows: [
          { label: "Cliente", value: "Consorcio offshore" },
          { label: "Data de inicio", value: "01/06/2021" },
          { label: "Duracao", value: "12 meses" },
          { label: "Tags", value: "bioacustica, offshore, DAS" },
        ],
      },
      {
        __component: "case.text-section",
        body: `<p>Usando a fibra optica instalada como sensor distribuido, o sistema identifica padroes acusticos caracteristicos de diferentes especies de cetaceos. As deteccoes alimentam um protocolo de mitigacao que aciona pausas operacionais automaticas durante atividades sismicas em areas de presenca confirmada.</p>`,
      },
    ],
  },
  {
    id: 103,
    title: "Monitoramento de Linhas de Transmissao de Energia",
    slug: "monitoramento-transmissao-energia",
    locale: "pt-BR",
    summary:
      "Deteccao de eventos e variacoes termicas em corredores de transmissao eletrica usando fibra optica padrao.",
    sectorCategory: "energia",
    coverImage: media(
      203,
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      "Linhas de transmissao de energia",
    ),
    sections: [
      {
        __component: "case.hero-section",
        title: "Monitoramento de linhas de transmissao",
        subtitle: "Vibracao e temperatura ao longo de todo o corredor, no mesmo cabo optico.",
        media: media(
          403,
          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=80",
          "Torres de transmissao ao entardecer",
        ),
      },
      {
        __component: "case.info-card",
        icon: "cpu",
        title: "Detalhes do projeto",
        rows: [
          { label: "Cliente", value: "Operador de transmissao" },
          { label: "Data de inicio", value: "01/03/2022" },
          { label: "Duracao", value: "18 meses" },
          { label: "Tags", value: "energia, DTS, alarmistica" },
        ],
      },
      {
        __component: "case.text-section",
        body: `<p>O sistema combina DAS e DTS para monitorar vibracoes anomalas (queda de torres, intrusao) e variacoes termicas (incendios, sobrecarga). Eventos sao classificados por algoritmos treinados em campo brasileiro e enviados ao centro de operacoes em tempo real.</p>`,
      },
    ],
  },
  {
    id: 104,
    title: "Monitoramento de Gasodutos",
    slug: "monitoramento-gasodutos",
    locale: "pt-BR",
    summary:
      "Deteccao precoce de vazamentos, intrusoes e variacoes operacionais ao longo de gasodutos com DAS e DTS.",
    sectorCategory: "offshore",
    coverImage: media(
      204,
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      "Gasodutos industriais",
    ),
    sections: [
      {
        __component: "case.hero-section",
        title: "Monitoramento de gasodutos",
        subtitle: "Centenas de quilometros cobertos por um unico interrogador.",
        media: media(
          404,
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80",
          "Tubulacao industrial em area aberta",
        ),
      },
      {
        __component: "case.info-card",
        icon: "map_pin",
        title: "Detalhes do projeto",
        rows: [
          { label: "Cliente", value: "Operadora de gasodutos" },
          { label: "Data de inicio", value: "01/09/2020" },
          { label: "Duracao", value: "24 meses" },
          { label: "Tags", value: "dutos, DAS, DTS, vazamentos" },
        ],
      },
      {
        __component: "case.text-section",
        body: `<p>O sistema cobre centenas de quilometros do duto com um unico interrogador DATS, classificando eventos de vazamento, escavacao nao autorizada, derivacao clandestina e atividade humana proxima. A latencia de alerta e tipicamente inferior a 30 segundos do evento ao centro de operacoes.</p>`,
      },
    ],
  },
];

const casesPt: CmsCase[] = rawCasesPt.map((entry) => cmsCaseSchema.parse(entry));

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
