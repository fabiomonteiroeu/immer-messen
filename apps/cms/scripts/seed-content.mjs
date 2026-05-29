const locales = ["pt-BR", "en", "es"];

const seo = (title, description, canonical) => ({
  title,
  description,
  canonical,
  noindex: false,
  nofollow: false,
});

const heroBlock = (title, subtitle, ctaLabel, ctaHref, alignment = "left") => ({
  __component: "page.hero-block",
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  alignment,
});

const pageHeroBlock = (title, subtitle) => ({
  __component: "page.page-hero-block",
  title,
  subtitle,
});

const textBlock = (heading, body, width = "default", theme = "light") => ({
  __component: "page.text-block",
  heading,
  body,
  width,
  theme,
});

const mediaTextBlock = (heading, body, mediaPosition = "left", options = {}) => {
  const block = {
    __component: "page.media-text-block",
    heading,
    body,
    mediaPosition,
  };
  if (options.eyebrow) block.eyebrow = options.eyebrow;
  if (options.variant) block.variant = options.variant;
  if (options.ctaLabel) block.ctaLabel = options.ctaLabel;
  if (options.ctaHref) block.ctaHref = options.ctaHref;
  if (Array.isArray(options.features)) {
    block.features = options.features.map((feature) => {
      const card = { title: feature.title };
      if (feature.description) card.description = feature.description;
      return card;
    });
  }
  return block;
};

const accordionBlock = (heading, items, body = "") => ({
  __component: "page.accordion-block",
  heading,
  body,
  items: items.map((item) => ({
    title: item.title,
    content: item.content,
  })),
});

const featureGridBlock = (heading, cards) => ({
  __component: "page.feature-grid-block",
  heading,
  cards: cards.map((card) => ({
    title: card.title,
    description: card.description,
  })),
});

const applicationAreasBlock = (heading, areaKeys) => ({
  __component: "page.application-areas-block",
  heading,
  areaKeys,
});

const casesBlock = (heading, displayMode, caseKeys = []) => ({
  __component: "page.cases-block",
  heading,
  displayMode,
  caseKeys,
});

const newsBlock = (heading, displayMode, articleKeys = []) => ({
  __component: "page.news-carousel-block",
  heading,
  displayMode,
  articleKeys,
});

const partnersBlock = (heading, partnerKeys) => ({
  __component: "page.partners-block",
  heading,
  partnerKeys,
});

const aboutContentBlock = (title, rows, highlight) => ({
  __component: "page.about-content-block",
  title,
  rows: rows.map((row) => ({
    heading: row.heading,
    body: row.body,
    mediaPosition: row.mediaPosition ?? "left",
  })),
  highlight: highlight
    ? {
        badgeLabel: highlight.badgeLabel ?? "INCEPTION PROGRAM",
        leftHeading: highlight.leftHeading,
        leftBody: highlight.leftBody,
        rightHeading: highlight.rightHeading,
        rightBody: highlight.rightBody,
      }
    : undefined,
});

const contactFormBlock = (heading, body, submitLabel) => ({
  __component: "page.contact-form-block",
  heading,
  body,
  submitLabel,
});

const lgpdContentBlock = (summaryTitle, sections) => ({
  __component: "page.lgpd-content-block",
  summaryTitle,
  sections: sections.map((section) => ({
    title: section.title,
    content: section.content,
  })),
});

const shell = {
  "pt-BR": {
    global: {
      siteName: "Immer Messen",
      seo: seo(
        "Immer Messen | Sistemas inteligentes por fibra óptica",
        "Site institucional da Immer Messen para tecnologia DFOS, DAS e DTS aplicada a infraestrutura crítica.",
        "https://www.immermessen.com/pt-BR"
      ),
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Curitiba – Paraná, Brasil",
      },
      socialLinks: [
        { platform: "linkedin", url: "https://www.linkedin.com/company/immer-messen" },
        { platform: "youtube", url: "https://www.youtube.com/@immermessen" },
      ],
      allowedScripts: "",
    },
    footer: {
      tagline: "Sensoriando o mundo pela fibra óptica",
      menuColumns: [
        {
          title: "Menu",
          links: [
            { label: "Tecnologia", href: "/pt-BR/tecnologia", openInNewTab: false },
            { label: "Soluções", href: "/pt-BR#solucoes", openInNewTab: false },
            { label: "Quem somos", href: "/pt-BR/quem-somos", openInNewTab: false },
            { label: "Cases", href: "/pt-BR#cases", openInNewTab: false },
            { label: "Notícias", href: "/pt-BR#noticias", openInNewTab: false },
            { label: "Contato", href: "/pt-BR#contato", openInNewTab: false },
          ],
        },
      ],
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Curitiba – Paraná, Brasil",
      },
      copyrightText: "© 2026 Immer Messen. Todos os direitos reservados.",
      privacyLink: {
        label: "Política de Privacidade e LGPD",
        href: "/pt-BR/lgpd",
        openInNewTab: false,
      },
    },
    cookieBanner: {
      text: "Utilizamos cookies para melhorar sua experiência no site. Ao continuar navegando, você concorda com nossa Política de Privacidade.",
      acceptLabel: "Aceitar",
      learnMoreLink: {
        label: "Saiba mais",
        href: "/pt-BR/lgpd",
        openInNewTab: false,
      },
      policyVersion: "2026-05",
    },
  },
  en: {
    global: {
      siteName: "Immer Messen",
      seo: seo(
        "Immer Messen | Intelligent systems over optical fiber",
        "Institutional website for Immer Messen DFOS, DAS and DTS solutions for critical infrastructure.",
        "https://www.immermessen.com/en"
      ),
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Curitiba – Paraná, Brazil",
      },
      socialLinks: [
        { platform: "linkedin", url: "https://www.linkedin.com/company/immer-messen" },
        { platform: "youtube", url: "https://www.youtube.com/@immermessen" },
      ],
      allowedScripts: "",
    },
    footer: {
      tagline: "Sensing the world through optical fiber",
      menuColumns: [
        {
          title: "Menu",
          links: [
            { label: "Technology", href: "/en/technology", openInNewTab: false },
            { label: "Solutions", href: "/en#solucoes", openInNewTab: false },
            { label: "About", href: "/en/about", openInNewTab: false },
            { label: "Cases", href: "/en#cases", openInNewTab: false },
            { label: "News", href: "/en#noticias", openInNewTab: false },
            { label: "Contact", href: "/en#contato", openInNewTab: false },
          ],
        },
      ],
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Curitiba – Paraná, Brazil",
      },
      copyrightText: "© 2026 Immer Messen. All rights reserved.",
      privacyLink: {
        label: "Privacy Policy and LGPD",
        href: "/en/lgpd",
        openInNewTab: false,
      },
    },
    cookieBanner: {
      text: "We use cookies to improve your browsing experience. By continuing, you agree with our Privacy Policy.",
      acceptLabel: "Accept",
      learnMoreLink: {
        label: "Learn more",
        href: "/en/lgpd",
        openInNewTab: false,
      },
      policyVersion: "2026-05",
    },
  },
  es: {
    global: {
      siteName: "Immer Messen",
      seo: seo(
        "Immer Messen | Sistemas inteligentes sobre fibra óptica",
        "Sitio institucional de Immer Messen para soluciones DFOS, DAS y DTS en infraestructura crítica.",
        "https://www.immermessen.com/es"
      ),
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Curitiba – Paraná, Brasil",
      },
      socialLinks: [
        { platform: "linkedin", url: "https://www.linkedin.com/company/immer-messen" },
        { platform: "youtube", url: "https://www.youtube.com/@immermessen" },
      ],
      allowedScripts: "",
    },
    footer: {
      tagline: "Sensando el mundo a través de la fibra óptica",
      menuColumns: [
        {
          title: "Menú",
          links: [
            { label: "Tecnología", href: "/es/tecnologia", openInNewTab: false },
            { label: "Soluciones", href: "/es#solucoes", openInNewTab: false },
            { label: "Quiénes somos", href: "/es/quienes-somos", openInNewTab: false },
            { label: "Casos", href: "/es#cases", openInNewTab: false },
            { label: "Noticias", href: "/es#noticias", openInNewTab: false },
            { label: "Contacto", href: "/es#contato", openInNewTab: false },
          ],
        },
      ],
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Curitiba – Paraná, Brasil",
      },
      copyrightText: "© 2026 Immer Messen. Todos los derechos reservados.",
      privacyLink: {
        label: "Política de Privacidad y LGPD",
        href: "/es/lgpd",
        openInNewTab: false,
      },
    },
    cookieBanner: {
      text: "Utilizamos cookies para mejorar su experiencia en el sitio. Al continuar navegando, usted acepta nuestra Política de Privacidad.",
      acceptLabel: "Aceptar",
      learnMoreLink: {
        label: "Saber más",
        href: "/es/lgpd",
        openInNewTab: false,
      },
      policyVersion: "2026-05",
    },
  },
};

const applicationAreaDefs = [
  {
    key: "integridade-estrutural",
    sortOrder: 10,
    slug: "integridade-estrutural",
    assetKey: "application-integridade-estrutural",
    "pt-BR": {
      title: "Integridade estrutural",
      summary: "Monitoramento contínuo de pontes, túneis, barragens e ativos civis com detecção precoce de anomalias.",
      body: "<p>Aplicação voltada a ativos civis e estruturas críticas que exigem observabilidade contínua e localização precisa de eventos.</p>",
    },
    en: {
      title: "Structural integrity",
      summary: "Continuous monitoring of bridges, tunnels, dams and civil assets with early anomaly detection.",
      body: "<p>Application focused on civil assets and critical structures that demand continuous observability and precise event localization.</p>",
    },
    es: {
      title: "Integridad estructural",
      summary: "Monitoreo continuo de puentes, túneles, presas y activos civiles con detección temprana de anomalías.",
      body: "<p>Aplicación orientada a activos civiles y estructuras críticas que exigen observabilidad continua y localización precisa de eventos.</p>",
    },
  },
  {
    key: "vazamentos",
    sortOrder: 20,
    slug: "vazamentos",
    assetKey: "application-vazamentos",
    "pt-BR": {
      title: "Vazamentos",
      summary: "Detecção de vazamentos em dutos e sistemas lineares com resposta operacional acelerada.",
      body: "<p>Uso de DAS e DTS para localizar anomalias térmicas e acústicas ao longo de oleodutos, gasodutos e redes críticas.</p>",
    },
    en: {
      title: "Leak detection",
      summary: "Detection of leaks in pipelines and linear systems with accelerated operational response.",
      body: "<p>Use of DAS and DTS to locate thermal and acoustic anomalies along oil pipelines, gas pipelines and critical networks.</p>",
    },
    es: {
      title: "Detección de fugas",
      summary: "Detección de fugas en ductos y sistemas lineales con respuesta operativa acelerada.",
      body: "<p>Uso de DAS y DTS para localizar anomalías térmicas y acústicas a lo largo de oleoductos, gasoductos y redes críticas.</p>",
    },
  },
  {
    key: "seguranca-patrimonial",
    sortOrder: 30,
    slug: "seguranca-patrimonial",
    assetKey: "application-seguranca-patrimonial",
    "pt-BR": {
      title: "Segurança patrimonial",
      summary: "Proteção perimetral e detecção de intrusões em infraestruturas industriais e energéticas.",
      body: "<p>Classificação de eventos e correlação espacial para reduzir falso positivo e aumentar a confiança dos operadores.</p>",
    },
    en: {
      title: "Asset security",
      summary: "Perimeter protection and intrusion detection in industrial and energy infrastructures.",
      body: "<p>Event classification and spatial correlation to reduce false positives and increase operator confidence.</p>",
    },
    es: {
      title: "Seguridad patrimonial",
      summary: "Protección perimetral y detección de intrusiones en infraestructuras industriales y energéticas.",
      body: "<p>Clasificación de eventos y correlación espacial para reducir falsos positivos y aumentar la confianza de los operadores.</p>",
    },
  },
  {
    key: "meio-ambiente",
    sortOrder: 40,
    slug: "meio-ambiente",
    assetKey: "application-meio-ambiente",
    "pt-BR": {
      title: "Meio ambiente",
      summary: "Monitoramento acústico e térmico aplicado a fauna marinha, offshore e estudos ambientais.",
      body: "<p>Projetos com foco em mitigação de impacto ambiental e observação distribuída de fenômenos naturais.</p>",
    },
    en: {
      title: "Environment",
      summary: "Acoustic and thermal monitoring applied to marine fauna, offshore and environmental studies.",
      body: "<p>Projects focused on environmental impact mitigation and distributed observation of natural phenomena.</p>",
    },
    es: {
      title: "Medio ambiente",
      summary: "Monitoreo acústico y térmico aplicado a fauna marina, offshore y estudios ambientales.",
      body: "<p>Proyectos enfocados en la mitigación del impacto ambiental y la observación distribuida de fenómenos naturales.</p>",
    },
  },
  {
    key: "sismica",
    sortOrder: 50,
    slug: "sismica",
    assetKey: "application-sismica",
    "pt-BR": {
      title: "Sísmica",
      summary: "Aquisição e análise de sinais distribuídos para campanhas sísmicas e interpretação geofísica.",
      body: "<p>Capacidade de registrar eventos e assinaturas distribuídas com alta sensibilidade ao longo da fibra.</p>",
    },
    en: {
      title: "Seismic",
      summary: "Acquisition and analysis of distributed signals for seismic campaigns and geophysical interpretation.",
      body: "<p>Ability to record events and distributed signatures with high sensitivity along the fiber.</p>",
    },
    es: {
      title: "Sísmica",
      summary: "Adquisición y análisis de señales distribuidas para campañas sísmicas e interpretación geofísica.",
      body: "<p>Capacidad para registrar eventos y firmas distribuidas con alta sensibilidad a lo largo de la fibra.</p>",
    },
  },
  {
    key: "incendios",
    sortOrder: 60,
    slug: "incendios",
    assetKey: "application-incendios",
    "pt-BR": {
      title: "Incêndios",
      summary: "Detecção precoce de variações térmicas para corredores de energia e ativos expostos a incêndio.",
      body: "<p>Monitoramento térmico distribuído para reduzir tempo de resposta em eventos com potencial de escalada rápida.</p>",
    },
    en: {
      title: "Fire detection",
      summary: "Early detection of thermal variations for energy corridors and assets exposed to fire.",
      body: "<p>Distributed thermal monitoring to reduce response time in events with fast escalation potential.</p>",
    },
    es: {
      title: "Incendios",
      summary: "Detección temprana de variaciones térmicas para corredores de energía y activos expuestos a incendios.",
      body: "<p>Monitoreo térmico distribuido para reducir el tiempo de respuesta en eventos con potencial de escalada rápida.</p>",
    },
  },
  {
    key: "escoamento",
    sortOrder: 70,
    slug: "escoamento",
    assetKey: "application-escoamento",
    "pt-BR": {
      title: "Escoamento",
      summary: "Observabilidade operacional para padrões de escoamento em dutos e processos industriais.",
      body: "<p>Uso de sensoriamento distribuído para inferir comportamento dinâmico do fluido e desvios operacionais.</p>",
    },
    en: {
      title: "Flow monitoring",
      summary: "Operational observability for flow patterns in pipelines and industrial processes.",
      body: "<p>Use of distributed sensing to infer dynamic fluid behavior and operational deviations.</p>",
    },
    es: {
      title: "Monitoreo de flujo",
      summary: "Observabilidad operativa para patrones de flujo en ductos y procesos industriales.",
      body: "<p>Uso de sensado distribuido para inferir comportamiento dinámico del fluido y desviaciones operativas.</p>",
    },
  },
  {
    key: "derivacao-clandestina",
    sortOrder: 80,
    slug: "derivacao-clandestina",
    assetKey: "application-derivacao-clandestina",
    "pt-BR": {
      title: "Derivação clandestina",
      summary: "Detecção de interferências indevidas em ativos lineares com localização precisa.",
      body: "<p>Projetos para identificar tentativas de derivação e acionar protocolos de segurança com maior rapidez.</p>",
    },
    en: {
      title: "Illegal tapping",
      summary: "Detection of unauthorized interference in linear assets with precise localization.",
      body: "<p>Projects to identify tapping attempts and trigger security protocols faster.</p>",
    },
    es: {
      title: "Derivación clandestina",
      summary: "Detección de interferencias no autorizadas en activos lineales con localización precisa.",
      body: "<p>Proyectos para identificar intentos de derivación y activar protocolos de seguridad con mayor rapidez.</p>",
    },
  },
];

const applicationAreas = applicationAreaDefs.flatMap((def) =>
  locales.map((locale) => ({
    key: def.key,
    locale,
    data: {
      title: def[locale].title,
      slug: def.slug,
      summary: def[locale].summary,
      body: def[locale].body,
      sortOrder: def.sortOrder,
    },
    assetRefs: [{ assetKey: def.assetKey, usage: "application-area.image" }],
  }))
);

const partners = [
  { key: "petrobras", data: { name: "Petrobras", url: "https://petrobras.com.br", sortOrder: 5, active: true }, assetRefs: [{ assetKey: "partner-petrobras", usage: "partner.logo" }] },
  { key: "sebrae", data: { name: "SEBRAE", url: "https://sebrae.com.br", sortOrder: 10, active: true }, assetRefs: [{ assetKey: "partner-sebrae", usage: "partner.logo" }] },
  { key: "instituto-aqualie", data: { name: "Instituto Aqualie", url: "https://institutoaqualie.org.br", sortOrder: 20, active: true }, assetRefs: [{ assetKey: "partner-instituto-aqualie", usage: "partner.logo" }] },
  { key: "nvidia", data: { name: "NVIDIA", url: "https://www.nvidia.com", sortOrder: 30, active: true }, assetRefs: [{ assetKey: "partner-nvidia", usage: "partner.logo" }] },
  { key: "cnpq", data: { name: "CNPq", url: "https://www.gov.br/cnpq", sortOrder: 40, active: true }, assetRefs: [{ assetKey: "partner-cnpq", usage: "partner.logo" }] },
  { key: "seafom", data: { name: "SEAFOM", url: "https://seafom.com", sortOrder: 50, active: true }, assetRefs: [{ assetKey: "partner-seafom", usage: "partner.logo" }] },
  { key: "ouronova", data: { name: "Ouronova", url: "https://ouronova.com.br", sortOrder: 60, active: true }, assetRefs: [{ assetKey: "partner-ouronova", usage: "partner.logo" }] },
  { key: "utfpr", data: { name: "UTFPR", url: "https://www.utfpr.edu.br", sortOrder: 70, active: true }, assetRefs: [{ assetKey: "partner-utfpr", usage: "partner.logo" }] },
];

const newsArticleDefs = [
  {
    key: "fibra-optica-como-sensor-continuo",
    slug: "fibra-optica-como-sensor-continuo",
    assetKey: "news-placeholder-fibra-sensor",
    publishedDate: "2026-02-28",
    "pt-BR": {
      title: "Como um cabo de fibra óptica se torna um sensor contínuo",
      summary: "Entenda como a fibra óptica permite monitoramento distribuído por dezenas de quilômetros com uma única infraestrutura.",
      body: "<p>A tecnologia DFOS transforma a fibra em um sensor linear contínuo, capaz de registrar variações acústicas e térmicas em toda a extensão monitorada.</p><p>Esse modelo reduz a necessidade de sensores pontuais, amplia a cobertura e acelera a identificação de eventos relevantes para a operação.</p>",
      seoTitle: "Como a fibra óptica vira sensor contínuo",
      seoDescription: "Panorama introdutório sobre sensoriamento distribuído por fibra óptica.",
    },
    en: {
      title: "How an optical fiber cable becomes a continuous sensor",
      summary: "Understand how optical fiber enables distributed monitoring across tens of kilometers with a single infrastructure.",
      body: "<p>DFOS technology turns the fiber into a continuous linear sensor capable of recording acoustic and thermal variations throughout the monitored span.</p><p>This model reduces the need for point sensors, expands coverage and accelerates the identification of events relevant to operations.</p>",
      seoTitle: "How optical fiber becomes a continuous sensor",
      seoDescription: "Introductory overview of distributed sensing over optical fiber.",
    },
    es: {
      title: "Cómo un cable de fibra óptica se convierte en un sensor continuo",
      summary: "Comprenda cómo la fibra óptica permite monitoreo distribuido en decenas de kilómetros con una sola infraestructura.",
      body: "<p>La tecnología DFOS transforma la fibra en un sensor lineal continuo capaz de registrar variaciones acústicas y térmicas en toda la extensión monitoreada.</p><p>Este modelo reduce la necesidad de sensores puntuales, amplía la cobertura y acelera la identificación de eventos relevantes para la operación.</p>",
      seoTitle: "Cómo la fibra óptica se convierte en sensor continuo",
      seoDescription: "Panorama introductorio sobre sensado distribuido por fibra óptica.",
    },
  },
  {
    key: "acustica-submarina-com-das",
    slug: "acustica-submarina-com-das",
    assetKey: "news-placeholder-acustica-submarina",
    publishedDate: "2026-01-22",
    "pt-BR": {
      title: "Resultados de pesquisa em acústica submarina com DAS",
      summary: "A Immer Messen apresentou resultados de pesquisa sobre acústica submarina no Encontro Técnico Sísmica e Acústica.",
      body: "<p>Os resultados reforçam a aplicabilidade do DAS em cenários offshore com foco em observabilidade ambiental e apoio a decisões técnicas.</p><p>O projeto consolida uma trilha de P&D voltada ao contexto operacional brasileiro.</p>",
      seoTitle: "Pesquisa de acústica submarina com DAS",
      seoDescription: "Resultados técnicos de aplicação de DAS em acústica submarina.",
    },
    en: {
      title: "Underwater acoustics research results with DAS",
      summary: "Immer Messen presented underwater acoustics research results at the Seismic and Acoustic Technical Meeting.",
      body: "<p>Results reinforce the applicability of DAS in offshore scenarios focused on environmental observability and technical decision support.</p><p>The project consolidates an R&D track focused on the Brazilian operational context.</p>",
      seoTitle: "Underwater acoustics research with DAS",
      seoDescription: "Technical results of DAS applied to underwater acoustics.",
    },
    es: {
      title: "Resultados de investigación en acústica submarina con DAS",
      summary: "Immer Messen presentó resultados de investigación sobre acústica submarina en el Encuentro Técnico Sísmica y Acústica.",
      body: "<p>Los resultados refuerzan la aplicabilidad del DAS en escenarios offshore con foco en observabilidad ambiental y apoyo a decisiones técnicas.</p><p>El proyecto consolida una línea de I+D enfocada en el contexto operativo brasileño.</p>",
      seoTitle: "Investigación de acústica submarina con DAS",
      seoDescription: "Resultados técnicos de la aplicación de DAS en acústica submarina.",
    },
  },
  {
    key: "das-em-estudos-sismicos",
    slug: "das-em-estudos-sismicos",
    assetKey: "news-placeholder-estudos-sismicos",
    publishedDate: "2026-01-16",
    "pt-BR": {
      title: "Tecnologia DAS aplicada a estudos sísmicos",
      summary: "Apresentação da tecnologia DAS para um grupo internacional de geofísicos focados em exploração e monitoramento.",
      body: "<p>A apresentação mostrou como a plataforma da Immer Messen combina sensoriamento distribuído e análise especializada para estudos sísmicos.</p><p>O destaque ficou na possibilidade de operar sobre infraestrutura existente com alta sensibilidade.</p>",
      seoTitle: "DAS em estudos sísmicos",
      seoDescription: "Aplicação da tecnologia DAS em cenários sísmicos e geofísicos.",
    },
    en: {
      title: "DAS technology applied to seismic studies",
      summary: "Presentation of DAS technology to an international group of geophysicists focused on exploration and monitoring.",
      body: "<p>The presentation showed how Immer Messen's platform combines distributed sensing and specialized analysis for seismic studies.</p><p>The highlight was the ability to operate over existing infrastructure with high sensitivity.</p>",
      seoTitle: "DAS in seismic studies",
      seoDescription: "Application of DAS technology in seismic and geophysical scenarios.",
    },
    es: {
      title: "Tecnología DAS aplicada a estudios sísmicos",
      summary: "Presentación de la tecnología DAS a un grupo internacional de geofísicos enfocados en exploración y monitoreo.",
      body: "<p>La presentación mostró cómo la plataforma de Immer Messen combina sensado distribuido y análisis especializado para estudios sísmicos.</p><p>El énfasis estuvo en la posibilidad de operar sobre infraestructura existente con alta sensibilidad.</p>",
      seoTitle: "DAS en estudios sísmicos",
      seoDescription: "Aplicación de la tecnología DAS en escenarios sísmicos y geofísicos.",
    },
  },
  {
    key: "cooperacao-petrobras-oceomna",
    slug: "cooperacao-petrobras-oceomna",
    assetKey: "news-placeholder-petrobras-pd",
    publishedDate: "2026-01-06",
    "pt-BR": {
      title: "Cooperação com Petrobras e Oceomna para P&D",
      summary: "Projeto de pesquisa aplicada com investimento superior a R$ 8 milhões para acelerar desenvolvimento tecnológico.",
      body: "<p>O acordo reforça a maturidade da plataforma e a aderência das soluções da empresa a cenários críticos de óleo e gás.</p><p>A parceria amplia a capacidade de validação em campo e gera insumos para novas aplicações.</p>",
      seoTitle: "Cooperação de P&D com Petrobras",
      seoDescription: "Projeto cooperado de P&D para aplicações DFOS em energia.",
    },
    en: {
      title: "R&D cooperation with Petrobras and Oceomna",
      summary: "Applied research project with an investment of over R$ 8 million to accelerate technological development.",
      body: "<p>The agreement reinforces the platform's maturity and the company's solutions in critical oil and gas scenarios.</p><p>The partnership expands field validation capacity and generates inputs for new applications.</p>",
      seoTitle: "R&D cooperation with Petrobras",
      seoDescription: "Cooperative R&D project for DFOS energy applications.",
    },
    es: {
      title: "Cooperación con Petrobras y Oceomna para I+D",
      summary: "Proyecto de investigación aplicada con inversión superior a R$ 8 millones para acelerar el desarrollo tecnológico.",
      body: "<p>El acuerdo refuerza la madurez de la plataforma y la adecuación de las soluciones de la empresa a escenarios críticos de petróleo y gas.</p><p>La alianza amplía la capacidad de validación en campo y genera insumos para nuevas aplicaciones.</p>",
      seoTitle: "Cooperación de I+D con Petrobras",
      seoDescription: "Proyecto cooperativo de I+D para aplicaciones DFOS en energía.",
    },
  },
  {
    key: "interrogador-dats-visao-geral",
    slug: "interrogador-dats-visao-geral",
    assetKey: "news-placeholder-dats",
    publishedDate: "2025-12-18",
    "pt-BR": {
      title: "Conheça o interrogador DATS",
      summary: "Visão geral do interrogador óptico proprietário que opera DAS e DTS simultaneamente na mesma fibra.",
      body: "<p>O DATS reúne sensoriamento óptico, eletrônica e edge computing em uma única unidade com foco em aplicações industriais.</p><p>A arquitetura reduz custo de implantação e simplifica a operação em campo.</p>",
      seoTitle: "Interrogador DATS",
      seoDescription: "Visão geral do interrogador DATS proprietário da Immer Messen.",
    },
    en: {
      title: "Meet the DATS interrogator",
      summary: "Overview of the proprietary optical interrogator that operates DAS and DTS simultaneously on the same fiber.",
      body: "<p>DATS combines optical sensing, electronics and edge computing into a single unit focused on industrial applications.</p><p>The architecture reduces deployment cost and simplifies field operations.</p>",
      seoTitle: "DATS interrogator",
      seoDescription: "Overview of Immer Messen's proprietary DATS interrogator.",
    },
    es: {
      title: "Conozca el interrogador DATS",
      summary: "Visión general del interrogador óptico propietario que opera DAS y DTS simultáneamente en la misma fibra.",
      body: "<p>El DATS reúne sensado óptico, electrónica y edge computing en una sola unidad con foco en aplicaciones industriales.</p><p>La arquitectura reduce el costo de implementación y simplifica la operación en campo.</p>",
      seoTitle: "Interrogador DATS",
      seoDescription: "Visión general del interrogador DATS propietario de Immer Messen.",
    },
  },
  {
    key: "linhas-de-transmissao-por-fibra",
    slug: "linhas-de-transmissao-por-fibra",
    assetKey: "news-placeholder-transmissao",
    publishedDate: "2025-11-30",
    "pt-BR": {
      title: "Monitoramento de linhas de transmissão por fibra óptica",
      summary: "Como reduzir falhas e ganhar previsibilidade em redes elétricas de longa distância com sensoriamento distribuído.",
      body: "<p>Aplicações em energia exigem detecção de intrusão, falhas e variações térmicas ao longo de extensões lineares significativas.</p><p>A plataforma combina aquisição contínua e classificação de eventos para suportar a operação.</p>",
      seoTitle: "Linhas de transmissão com fibra óptica",
      seoDescription: "Uso de fibra óptica para reduzir falhas em redes de transmissão.",
    },
    en: {
      title: "Transmission line monitoring with optical fiber",
      summary: "How to reduce failures and gain predictability in long-distance electrical networks with distributed sensing.",
      body: "<p>Energy applications require intrusion, failure and thermal variation detection along significant linear extensions.</p><p>The platform combines continuous acquisition and event classification to support operations.</p>",
      seoTitle: "Transmission lines with optical fiber",
      seoDescription: "Use of optical fiber to reduce failures in transmission networks.",
    },
    es: {
      title: "Monitoreo de líneas de transmisión por fibra óptica",
      summary: "Cómo reducir fallas y ganar predictibilidad en redes eléctricas de larga distancia con sensado distribuido.",
      body: "<p>Las aplicaciones en energía requieren detección de intrusiones, fallas y variaciones térmicas a lo largo de extensiones lineales significativas.</p><p>La plataforma combina adquisición continua y clasificación de eventos para apoyar la operación.</p>",
      seoTitle: "Líneas de transmisión con fibra óptica",
      seoDescription: "Uso de fibra óptica para reducir fallas en redes de transmisión.",
    },
  },
];

const newsArticles = newsArticleDefs.flatMap((def) =>
  locales.map((locale) => ({
    key: def.key,
    locale,
    data: {
      title: def[locale].title,
      slug: def.slug,
      summary: def[locale].summary,
      body: def[locale].body,
      publishedDate: def.publishedDate,
      authorSource: "Immer Messen",
      seo: seo(
        def[locale].seoTitle,
        def[locale].seoDescription,
        `https://www.immermessen.com/${locale}/noticias/${def.slug}`
      ),
    },
    assetRefs: [{ assetKey: def.assetKey, usage: "news-article.coverImage", status: "placeholder-external" }],
  }))
);

const caseStudyDefs = [
  {
    key: "projeto-pd-petrobras",
    documentId: "yi1ofae5swyt61vzdv8zcog5",
    sectorCategory: "offshore",
    applicationAreaKeys: ["integridade-estrutural"],
    coverAssetKey: "case-cover-petrobras",
    client: "Petrobras",
    startDate: "2017-01-01",
    projectLogoKeys: ["petrobras"],
    "pt-BR": {
      slug: "monitoramento-de-gasodutos",
      title: "Monitoramento de gasodutos",
      summary: "Monitoramento de integridade de dutos flexíveis submarinos com sensoriamento distribuído.",
      duration: "3 meses",
      tags: ["offshore", "integridade de dutos", "DAS", "P&D"],
      body: "<p>Em um cenário de operação cada vez mais exigente, a Immer Messen aplicou sua tecnologia DAS de fase para monitoramento contínuo de toda a extensão do ativo. A solução permitiu identificar eventos com precisão de localização inferior a 5 metros, integrando-se ao SCADA do cliente e oferecendo alertas em tempo real à equipe de operação. Resultado: redução de tempo de resposta em até 80% comparado às inspeções tradicionais.</p><p>A integração com a infraestrutura existente foi um dos pontos-chave do projeto. A fibra óptica usada para monitoramento é a mesma já instalada na operação — sem necessidade de duplicação, escavação ou substituição. O interrogador DATS realizou medições simultâneas de DAS e DTS, entregando informação acústica e térmica sobre o mesmo cabo.</p><p>Os dados gerados pelo sistema alimentam dashboards operacionais customizados, permitindo análises de tendência, correlação com variáveis externas e geração de evidências para auditoria. A escalabilidade da arquitetura permite estender o monitoramento para outros trechos com mínimo investimento incremental.</p>",
      seoTitle: "Projeto P&D Petrobras",
      seoDescription: "Case de monitoramento de integridade de dutos flexíveis submarinos.",
    },
    en: {
      slug: "projeto-pd-petrobras",
      title: "Petrobras R&D Project",
      summary: "Integrity monitoring of flexible submarine pipelines with distributed sensing.",
      duration: "3 months",
      tags: ["offshore", "pipeline integrity", "DAS", "R&D"],
      body: "<p>In an increasingly demanding operational scenario, Immer Messen applied its phase-based DAS technology for continuous monitoring along the entire asset. The solution identified events with sub-5-meter localization precision, integrating with the customer's SCADA and delivering real-time alerts to the operations team. Result: up to 80% reduction in response time compared with traditional inspections.</p><p>Integration with the existing infrastructure was a key project point. The optical fiber used for monitoring is the same already installed in the operation — no need for duplication, excavation or replacement. The DATS interrogator performed simultaneous DAS and DTS measurements, delivering acoustic and thermal information on the same cable.</p><p>The data generated by the system feeds customized operational dashboards, enabling trend analysis, correlation with external variables and audit evidence generation. The architecture scales to extend monitoring to other sections with minimal incremental investment.</p>",
      seoTitle: "Petrobras R&D Project",
      seoDescription: "Integrity monitoring case for flexible submarine pipelines.",
    },
    es: {
      slug: "projeto-pd-petrobras",
      title: "Proyecto I+D Petrobras",
      summary: "Monitoreo de integridad de ductos flexibles submarinos con sensado distribuido.",
      duration: "3 meses",
      tags: ["offshore", "integridad de ductos", "DAS", "I+D"],
      body: "<p>En un escenario operativo cada vez más exigente, Immer Messen aplicó su tecnología DAS de fase para el monitoreo continuo de toda la extensión del activo. La solución permitió identificar eventos con precisión de localización inferior a 5 metros, integrándose al SCADA del cliente y ofreciendo alertas en tiempo real al equipo de operación. Resultado: reducción del tiempo de respuesta de hasta 80% frente a inspecciones tradicionales.</p><p>La integración con la infraestructura existente fue uno de los puntos clave del proyecto. La fibra óptica utilizada para el monitoreo es la misma ya instalada en la operación — sin necesidad de duplicación, excavación o reemplazo. El interrogador DATS realizó mediciones simultáneas de DAS y DTS, entregando información acústica y térmica sobre el mismo cable.</p><p>Los datos generados por el sistema alimentan tableros operativos personalizados, permitiendo análisis de tendencias, correlación con variables externas y generación de evidencias para auditoría. La escalabilidad de la arquitectura permite extender el monitoreo a otros tramos con inversión incremental mínima.</p>",
      seoTitle: "Proyecto I+D Petrobras",
      seoDescription: "Caso de monitoreo de integridad de ductos flexibles submarinos.",
    },
  },
  {
    key: "monitoramento-acustico-de-cetaceos",
    documentId: "heyjvuo6793hbue6p3ehulk5",
    sectorCategory: "meio-ambiente",
    applicationAreaKeys: ["meio-ambiente", "sismica"],
    coverAssetKey: "case-cover-baleias",
    client: "Consórcio offshore",
    startDate: "2021-06-01",
    projectLogoKeys: ["instituto-aqualie"],
    "pt-BR": {
      slug: "monitoramento-de-baleias",
      title: "Monitoramento de baleias",
      summary: "Estudo de impacto de atividade sísmica em fauna marinha com observabilidade acústica distribuída.",
      duration: "12 meses",
      tags: ["bioacústica", "offshore", "DAS"],
      body: "<p>Usando a fibra óptica instalada como sensor distribuído, o sistema identifica padrões acústicos característicos de diferentes espécies de cetáceos. As detecções alimentam um protocolo de mitigação que aciona pausas operacionais automáticas durante atividades sísmicas em áreas de presença confirmada.</p><p>O projeto combinou catalogação acústica, classificação por algoritmos próprios e estruturação de alertas para o time técnico — entregando maior cobertura observacional e consolidação de referência técnica para aplicações ambientais offshore.</p>",
      seoTitle: "Monitoramento acústico de cetáceos",
      seoDescription: "Case ambiental com uso de DAS para fauna marinha.",
    },
    en: {
      slug: "monitoramento-acustico-de-cetaceos",
      title: "Acoustic monitoring of cetaceans",
      summary: "Study of seismic activity impact on marine fauna with distributed acoustic observability.",
      duration: "12 months",
      tags: ["bioacoustics", "offshore", "DAS"],
      body: "<p>Using installed optical fiber as a distributed sensor, the system identifies acoustic patterns characteristic of different cetacean species. Detections feed a mitigation protocol that automatically triggers operational pauses during seismic activity in areas of confirmed presence.</p><p>The project combined acoustic cataloging, classification by proprietary algorithms and alert structuring for the technical team — delivering greater observational coverage and a consolidated technical reference for offshore environmental applications.</p>",
      seoTitle: "Acoustic monitoring of cetaceans",
      seoDescription: "Environmental case using DAS for marine fauna.",
    },
    es: {
      slug: "monitoramento-acustico-de-cetaceos",
      title: "Monitoreo acústico de cetáceos",
      summary: "Estudio del impacto de la actividad sísmica en la fauna marina con observabilidad acústica distribuida.",
      duration: "12 meses",
      tags: ["bioacústica", "offshore", "DAS"],
      body: "<p>Usando la fibra óptica instalada como sensor distribuido, el sistema identifica patrones acústicos característicos de diferentes especies de cetáceos. Las detecciones alimentan un protocolo de mitigación que activa pausas operativas automáticas durante actividades sísmicas en áreas de presencia confirmada.</p><p>El proyecto combinó catalogación acústica, clasificación por algoritmos propios y estructuración de alertas para el equipo técnico — entregando mayor cobertura observacional y consolidación de una referencia técnica para aplicaciones ambientales offshore.</p>",
      seoTitle: "Monitoreo acústico de cetáceos",
      seoDescription: "Caso ambiental con uso de DAS para fauna marina.",
    },
  },
  {
    key: "monitoramento-de-linhas-de-transmissao",
    documentId: "j36a33h0neyvqeow5lui5hlg",
    sectorCategory: "energia",
    applicationAreaKeys: ["seguranca-patrimonial", "incendios"],
    coverAssetKey: "case-cover-transmissao",
    client: "Operador de transmissão",
    startDate: "2022-03-01",
    projectLogoKeys: [],
    "pt-BR": {
      slug: "monitoramento-de-linhas-de-transmissao",
      title: "Monitoramento de linhas de transmissão",
      summary: "Detecção precoce de falhas e intrusões em torres e corredores de transmissão.",
      duration: "18 meses",
      tags: ["energia", "DTS", "alarmística"],
      body: "<p>O sistema combina DAS e DTS para monitorar vibrações anômalas (queda de torres, intrusão) e variações térmicas (incêndios, sobrecarga). Eventos são classificados por algoritmos treinados em campo brasileiro e enviados ao centro de operações em tempo real.</p><p>A arquitetura é totalmente compatível com a fibra óptica de comunicação já existente nos corredores de transmissão — sem necessidade de novos cabos ou equipamentos em torre. O resultado é melhor previsibilidade operacional e cobertura permanente sem patrulhamento físico constante.</p>",
      seoTitle: "Monitoramento de linhas de transmissão",
      seoDescription: "Case de energia com foco em falhas e intrusões.",
    },
    en: {
      slug: "monitoramento-de-linhas-de-transmissao",
      title: "Transmission line monitoring",
      summary: "Early detection of failures and intrusions on transmission towers and corridors.",
      duration: "18 months",
      tags: ["energy", "DTS", "alerting"],
      body: "<p>The system combines DAS and DTS to monitor anomalous vibrations (tower failures, intrusion) and thermal variations (fires, overload). Events are classified by algorithms trained on Brazilian field data and sent to the operations center in real time.</p><p>The architecture is fully compatible with the existing communication optical fiber along the transmission corridors — no new cables or tower equipment required. The result is better operational predictability and permanent coverage without constant physical patrols.</p>",
      seoTitle: "Transmission line monitoring",
      seoDescription: "Energy case focused on failures and intrusions.",
    },
    es: {
      slug: "monitoramento-de-linhas-de-transmissao",
      title: "Monitoreo de líneas de transmisión",
      summary: "Detección temprana de fallas e intrusiones en torres y corredores de transmisión.",
      duration: "18 meses",
      tags: ["energía", "DTS", "alertas"],
      body: "<p>El sistema combina DAS y DTS para monitorear vibraciones anómalas (caída de torres, intrusión) y variaciones térmicas (incendios, sobrecarga). Los eventos son clasificados por algoritmos entrenados con datos de campo brasileños y enviados al centro de operaciones en tiempo real.</p><p>La arquitectura es totalmente compatible con la fibra óptica de comunicación ya existente en los corredores de transmisión — sin necesidad de nuevos cables ni equipos en torres. El resultado es una mejor previsibilidad operativa y cobertura permanente sin patrullaje físico constante.</p>",
      seoTitle: "Monitoreo de líneas de transmisión",
      seoDescription: "Caso de energía enfocado en fallas e intrusiones.",
    },
  },
  {
    key: "monitoramento-de-gasodutos-onshore",
    documentId: "c07mowtisq6wm8vuezg2tyzb",
    sectorCategory: "oleo-e-gas",
    applicationAreaKeys: ["vazamentos", "derivacao-clandestina", "escoamento"],
    coverAssetKey: "case-cover-gasodutos",
    client: "Operadora de gasodutos",
    startDate: "2020-09-01",
    projectLogoKeys: [],
    "pt-BR": {
      slug: "monitoramento-de-cabos-submarinos",
      title: "Monitoramento de cabos submarinos",
      summary: "Detecção de vazamentos e derivação clandestina em gasodutos de longa distância.",
      duration: "24 meses",
      tags: ["dutos", "DAS", "DTS", "vazamentos"],
      body: "<p>O sistema cobre centenas de quilômetros do duto com um único interrogador DATS, classificando eventos de vazamento, escavação não autorizada, derivação clandestina e atividade humana próxima. A latência de alerta é tipicamente inferior a 30 segundos do evento ao centro de operações.</p><p>A plataforma DATS combina leitura distribuída, filtragem de ruído e alertas operacionais com localização precisa, entregando mais rapidez na resposta e base técnica para expandir monitoramento a novos trechos com menor investimento incremental.</p>",
      seoTitle: "Monitoramento de gasodutos onshore",
      seoDescription: "Case de vazamentos e derivação clandestina em gasodutos.",
    },
    en: {
      slug: "monitoramento-de-gasodutos-onshore",
      title: "Onshore gas pipeline monitoring",
      summary: "Leak detection and illegal tapping detection on long-distance gas pipelines.",
      duration: "24 months",
      tags: ["pipelines", "DAS", "DTS", "leaks"],
      body: "<p>The system covers hundreds of kilometers of pipeline with a single DATS interrogator, classifying leak events, unauthorized excavation, illegal tapping and nearby human activity. Alert latency is typically under 30 seconds from event to operations center.</p><p>The DATS platform combines distributed reading, noise filtering and operational alerts with precise localization, delivering faster response and a technical foundation to extend monitoring to new sections with lower incremental investment.</p>",
      seoTitle: "Onshore gas pipeline monitoring",
      seoDescription: "Case on leaks and illegal tapping in gas pipelines.",
    },
    es: {
      slug: "monitoramento-de-gasodutos-onshore",
      title: "Monitoreo de gasoductos onshore",
      summary: "Detección de fugas y derivación clandestina en gasoductos de larga distancia.",
      duration: "24 meses",
      tags: ["ductos", "DAS", "DTS", "fugas"],
      body: "<p>El sistema cubre cientos de kilómetros del ducto con un único interrogador DATS, clasificando eventos de fuga, excavación no autorizada, derivación clandestina y actividad humana cercana. La latencia de alerta es típicamente inferior a 30 segundos desde el evento hasta el centro de operaciones.</p><p>La plataforma DATS combina lectura distribuida, filtrado de ruido y alertas operativas con localización precisa, entregando mayor rapidez en la respuesta y una base técnica para extender el monitoreo a nuevos tramos con menor inversión incremental.</p>",
      seoTitle: "Monitoreo de gasoductos onshore",
      seoDescription: "Caso de fugas y derivación clandestina en gasoductos.",
    },
  },
];

const caseStudies = caseStudyDefs.flatMap((def) =>
  locales.map((locale) => ({
    key: def.key,
    documentId: def.documentId,
    locale,
    data: {
      title: def[locale].title,
      slug: def[locale].slug,
      summary: def[locale].summary,
      sectorCategory: def.sectorCategory,
      client: def.client,
      startDate: def.startDate,
      duration: def[locale].duration,
      tags: def[locale].tags,
      body: def[locale].body,
      seo: seo(
        def[locale].seoTitle,
        def[locale].seoDescription,
        `https://www.immermessen.com/${locale}/cases/${def[locale].slug}`
      ),
    },
    relationRefs: {
      applicationAreaKeys: def.applicationAreaKeys,
      projectLogoKeys: def.projectLogoKeys ?? [],
    },
    assetRefs: [
      { assetKey: "case-hero-offshore", usage: "case-study.heroMedia" },
      { assetKey: def.coverAssetKey, usage: "case-study.coverImage", status: "placeholder-external" },
      ...((def.projectLogoKeys ?? []).map((partnerKey) => ({
        assetKey: `partner-${partnerKey}`,
        usage: "case-study.projectLogos",
      }))),
    ],
  }))
);

const slugByPageKey = {
  home: { "pt-BR": "home", en: "home", es: "inicio" },
  technology: { "pt-BR": "tecnologia", en: "technology", es: "tecnologia" },
  about: { "pt-BR": "quem-somos", en: "about", es: "quienes-somos" },
  lgpd: { "pt-BR": "lgpd", en: "lgpd", es: "lgpd" },
};

const contactHrefByLocale = {
  "pt-BR": "/pt-BR#contato",
  en: "/en#contato",
  es: "/es#contato",
};

const allAreaKeys = applicationAreaDefs.map((def) => def.key);
const allPartnerKeys = ["petrobras", "sebrae", "instituto-aqualie", "nvidia", "cnpq", "seafom", "ouronova", "utfpr"];

const pageDefs = [
  {
    pageKey: "home",
    sortOrder: 1,
    assetRefs: [
      { assetKey: "hero-home-poster", usage: "page.hero-block.posterImage" },
      { assetKey: "hero-home-video", usage: "page.hero-block.backgroundVideo" },
      { assetKey: "interrogador-rack", usage: "page.media-text-block.media" },
      { assetKey: "tec-icon-sensors", usage: "page.feature-card.icon" },
      { assetKey: "tec-icon-range", usage: "page.feature-card.icon" },
      { assetKey: "tec-icon-spacing", usage: "page.feature-card.icon" },
      { assetKey: "tec-icon-ai", usage: "page.feature-card.icon" },
      { assetKey: "tec-icon-shield", usage: "page.feature-card.icon" },
      { assetKey: "tec-icon-alarm", usage: "page.feature-card.icon" },
    ],
    "pt-BR": {
      title: "Home",
      summary: "Página inicial institucional da Immer Messen com hero, tecnologia, soluções, áreas, cases, notícias e contato.",
      seoTitle: "Immer Messen",
      seoDescription: "Transformamos fibra óptica em sistemas inteligentes para infraestrutura crítica.",
      blocks: (locale) => [
        heroBlock(
          "Transformamos fibra óptica em sistemas inteligentes",
          "Tecnologia proprietária para monitoramento distribuído, leitura acústica e resposta operacional em infraestrutura crítica.",
          "Fale com nossa equipe",
          contactHrefByLocale[locale]
        ),
        mediaTextBlock(
          "Uma plataforma integrada de sensoriamento inteligente construída para operadores de infraestrutura crítica",
          "<p>A tecnologia DFOS (Distributed Fiber Optic Sensing) transforma qualquer cabo de fibra óptica padrão em um sistema de sensoriamento contínuo com milhares de pontos de medição simultâneos, sem a necessidade de sensores extra ao longo da infraestrutura.</p>",
          "left",
          {
            eyebrow: "TECNOLOGIA",
            variant: "home-tech",
            ctaLabel: "Saiba mais",
            ctaHref: "/pt-BR/tecnologia",
            features: [
              { title: "Milhares de sensores acústicos, de temperatura e deformação com uma única solução." },
              { title: "Monitoramento de mais de 70 quilômetros com um único aparelho" },
              { title: "Um sensor a cada 3 metros do cabo" },
              { title: "Algoritmos de IA e Machine Learning monitorando quilômetros em tempo real" },
              { title: "Alarmes integrados à infraestrutura atual" },
              { title: "Precisão de nano-strain e microkelvin" },
            ],
          }
        ),
        accordionBlock(
          "Soluções",
          [
            {
              title: "Interrogador DATS: DAS e DTS na mesma fibra",
              content: "<p>O DATS é o interrogador óptico proprietário da Immer Messen, desenvolvido para operar simultaneamente nas modalidades DAS e DTS sobre o mesmo cabo de fibra, com um único equipamento. Essa arquitetura co-localizada elimina a necessidade de infraestrutura de fibra dedicada por modalidade, reduzindo custo de implantação e simplificando a operação.</p><p>Com alcance de até 60 km por canal DAS e 30 km por canal DTS, frequência de amostragem de 0,5 a 100 kHz e resolução espacial de 5 a 50 m, o DATS é compatível com fibra monomodo padrão já instalada na infraestrutura do cliente — sem necessidade de substituição ou instalação de novos cabos.</p>",
            },
            {
              title: "Algoritmos de IA e software embarcado",
              content: "<p>Os dados brutos gerados pelo interrogador são processados por algoritmos proprietários de machine learning, desenvolvidos e treinados pela Immer Messen com dados de campo de infraestrutura crítica brasileira. Essa camada de inteligência é responsável por classificar eventos acústicos e térmicos, filtrar ruído ambiental e gerar alertas acionáveis com localização geográfica precisa — reduzindo falsos positivos e entregando ao operador informação, não apenas dados.</p>",
            },
            {
              title: "Soluções customizadas por aplicação",
              content: "<p>Cada infraestrutura tem seu perfil de ameaças, seu contexto regulatório e suas restrições operacionais. A Immer Messen desenvolve soluções sob medida para gasodutos e oleodutos, linhas de transmissão elétrica, cabos submarinos, poços, infraestrutura civil, dentre outros.</p>",
            },
            {
              title: "Serviços de engenharia e implantação",
              content: "<p>Nossa equipe técnica atua desde a fase de concepção do projeto até o comissionamento em campo — incluindo levantamento de infraestrutura de fibra existente, definição de arquitetura do sistema, instalação do interrogador, calibração, integração com sistemas existentes.</p>",
            },
            {
              title: "Monitoramento contínuo",
              content: "<p>Nossa equipe técnica atua desde a fase de concepção do projeto até o comissionamento em campo — incluindo levantamento de infraestrutura de fibra existente, definição de arquitetura do sistema, instalação do interrogador, calibração, integração com sistemas existentes.</p>",
            },
          ],
          "<h3>Da fibra ao diagnóstico temos soluções completas para infraestrutura crítica</h3><p>A Immer Messen não fornece apenas hardware. Entregamos sistemas completos de monitoramento distribuído, do interrogador óptico à plataforma de inteligência operacional, todos adaptados aos requisitos técnicos, regulatórios e operacionais de cada cliente.</p>"
        ),
        applicationAreasBlock("Áreas de aplicação", allAreaKeys),
        casesBlock("Cases", "latest"),
        newsBlock("Notícias", "latest"),
        partnersBlock("Nossos parceiros", allPartnerKeys),
        contactFormBlock(
          "Fale com a nossa equipe",
          "<p>Se você tem interesse em saber mais sobre as nossas soluções, deixe o seu contato.</p>",
          "Enviar"
        ),
      ],
    },
    en: {
      title: "Home",
      summary: "Immer Messen institutional home page with hero, technology, solutions, areas, cases, news and contact.",
      seoTitle: "Immer Messen",
      seoDescription: "We turn optical fiber into intelligent systems for critical infrastructure.",
      blocks: (locale) => [
        heroBlock(
          "We turn optical fiber into intelligent systems",
          "Proprietary technology for distributed monitoring, acoustic sensing and operational response on critical infrastructure.",
          "Talk to our team",
          contactHrefByLocale[locale]
        ),
        mediaTextBlock(
          "An integrated intelligent sensing platform built for critical infrastructure operators",
          "<p>DFOS (Distributed Fiber Optic Sensing) turns any standard optical fiber cable into a continuous sensing system with thousands of simultaneous measurement points, with no extra sensors along the infrastructure.</p>",
          "left",
          {
            eyebrow: "TECHNOLOGY",
            variant: "home-tech",
            ctaLabel: "Learn more",
            ctaHref: "/en/technology",
            features: [
              { title: "Thousands of acoustic, temperature and strain sensors with a single solution." },
              { title: "Over 70 kilometers monitored with a single device" },
              { title: "One sensor every 3 meters of cable" },
              { title: "AI and Machine Learning algorithms monitoring kilometers in real time" },
              { title: "Alarms integrated with existing infrastructure" },
              { title: "Nano-strain and microkelvin precision" },
            ],
          }
        ),
        accordionBlock(
          "Solutions",
          [
            {
              title: "DATS interrogator: DAS and DTS on the same fiber",
              content: "<p>DATS is Immer Messen's proprietary optical interrogator, designed to operate simultaneously in DAS and DTS modes over the same fiber cable with a single device. The co-located architecture removes the need for dedicated fiber per modality, reducing deployment cost and simplifying operations.</p><p>With a reach of up to 60 km per DAS channel and 30 km per DTS channel, sampling frequency from 0.5 to 100 kHz and spatial resolution from 5 to 50 m, DATS is compatible with the standard single-mode fiber already installed in the client's infrastructure — with no need to replace or install new cables.</p>",
            },
            {
              title: "AI algorithms and embedded software",
              content: "<p>Raw data generated by the interrogator is processed by proprietary machine-learning algorithms, developed and trained by Immer Messen on field data from Brazilian critical infrastructure. This intelligence layer classifies acoustic and thermal events, filters environmental noise and generates actionable alerts with precise geolocation — reducing false positives and delivering information to the operator, not just data.</p>",
            },
            {
              title: "Application-tailored solutions",
              content: "<p>Each infrastructure has its own threat profile, regulatory context and operational constraints. Immer Messen builds custom solutions for gas and oil pipelines, electrical transmission lines, submarine cables, wells, civil infrastructure and more.</p>",
            },
            {
              title: "Engineering and deployment services",
              content: "<p>Our technical team works from project conception to field commissioning — including surveying existing fiber infrastructure, defining system architecture, installing the interrogator, calibration and integration with existing systems.</p>",
            },
            {
              title: "Continuous monitoring",
              content: "<p>Our technical team works from project conception to field commissioning — including surveying existing fiber infrastructure, defining system architecture, installing the interrogator, calibration and integration with existing systems.</p>",
            },
          ],
          "<h3>From fiber to diagnostics: complete solutions for critical infrastructure</h3><p>Immer Messen does not provide hardware alone. We deliver complete distributed monitoring systems, from the optical interrogator to the operational intelligence platform, all tailored to each client's technical, regulatory and operational requirements.</p>"
        ),
        applicationAreasBlock("Application areas", allAreaKeys),
        casesBlock("Cases", "latest"),
        newsBlock("News", "latest"),
        partnersBlock("Our partners", allPartnerKeys),
        contactFormBlock(
          "Talk to our team",
          "<p>If you would like to learn more about our solutions, leave your contact information.</p>",
          "Send"
        ),
      ],
    },
    es: {
      title: "Inicio",
      summary: "Página de inicio institucional de Immer Messen con hero, tecnología, soluciones, áreas, casos, noticias y contacto.",
      seoTitle: "Immer Messen",
      seoDescription: "Transformamos la fibra óptica en sistemas inteligentes para infraestructura crítica.",
      blocks: (locale) => [
        heroBlock(
          "Transformamos la fibra óptica en sistemas inteligentes",
          "Tecnología propietaria para monitoreo distribuido, lectura acústica y respuesta operativa en infraestructura crítica.",
          "Hable con nuestro equipo",
          contactHrefByLocale[locale]
        ),
        mediaTextBlock(
          "Una plataforma integrada de sensado inteligente construida para operadores de infraestructura crítica",
          "<p>La tecnología DFOS (Distributed Fiber Optic Sensing) transforma cualquier cable de fibra óptica estándar en un sistema de sensado continuo con miles de puntos de medición simultáneos, sin necesidad de sensores adicionales a lo largo de la infraestructura.</p>",
          "left",
          {
            eyebrow: "TECNOLOGÍA",
            variant: "home-tech",
            ctaLabel: "Saber más",
            ctaHref: "/es/tecnologia",
            features: [
              { title: "Miles de sensores acústicos, de temperatura y deformación con una sola solución." },
              { title: "Más de 70 kilómetros monitoreados con un solo equipo" },
              { title: "Un sensor cada 3 metros de cable" },
              { title: "Algoritmos de IA y Machine Learning monitoreando kilómetros en tiempo real" },
              { title: "Alarmas integradas a la infraestructura actual" },
              { title: "Precisión de nano-strain y microkelvin" },
            ],
          }
        ),
        accordionBlock(
          "Soluciones",
          [
            {
              title: "Interrogador DATS: DAS y DTS en la misma fibra",
              content: "<p>DATS es el interrogador óptico propietario de Immer Messen, desarrollado para operar simultáneamente en modos DAS y DTS sobre el mismo cable de fibra, con un único equipo. La arquitectura colocalizada elimina la necesidad de infraestructura de fibra dedicada por modalidad, reduciendo el costo de despliegue y simplificando la operación.</p><p>Con un alcance de hasta 60 km por canal DAS y 30 km por canal DTS, frecuencia de muestreo de 0,5 a 100 kHz y resolución espacial de 5 a 50 m, DATS es compatible con la fibra monomodo estándar ya instalada en la infraestructura del cliente — sin necesidad de sustituir ni instalar nuevos cables.</p>",
            },
            {
              title: "Algoritmos de IA y software embebido",
              content: "<p>Los datos brutos generados por el interrogador son procesados por algoritmos propietarios de machine learning, desarrollados y entrenados por Immer Messen con datos de campo de infraestructura crítica brasileña. Esta capa de inteligencia clasifica eventos acústicos y térmicos, filtra ruido ambiental y genera alertas accionables con geolocalización precisa — reduciendo falsos positivos y entregando información, no solo datos.</p>",
            },
            {
              title: "Soluciones personalizadas por aplicación",
              content: "<p>Cada infraestructura tiene su perfil de amenazas, su contexto regulatorio y sus restricciones operativas. Immer Messen desarrolla soluciones a medida para gasoductos y oleoductos, líneas de transmisión eléctrica, cables submarinos, pozos, infraestructura civil, entre otros.</p>",
            },
            {
              title: "Servicios de ingeniería e implementación",
              content: "<p>Nuestro equipo técnico actúa desde la concepción del proyecto hasta la puesta en marcha en campo — incluyendo relevamiento de infraestructura de fibra existente, definición de arquitectura del sistema, instalación del interrogador, calibración e integración con sistemas existentes.</p>",
            },
            {
              title: "Monitoreo continuo",
              content: "<p>Nuestro equipo técnico actúa desde la concepción del proyecto hasta la puesta en marcha en campo — incluyendo relevamiento de infraestructura de fibra existente, definición de arquitectura del sistema, instalación del interrogador, calibración e integración con sistemas existentes.</p>",
            },
          ],
          "<h3>De la fibra al diagnóstico: soluciones completas para infraestructura crítica</h3><p>Immer Messen no ofrece solo hardware. Entregamos sistemas completos de monitoreo distribuido, del interrogador óptico a la plataforma de inteligencia operacional, todos adaptados a los requisitos técnicos, regulatorios y operacionales de cada cliente.</p>"
        ),
        applicationAreasBlock("Áreas de aplicación", allAreaKeys),
        casesBlock("Casos", "latest"),
        newsBlock("Noticias", "latest"),
        partnersBlock("Nuestros aliados", allPartnerKeys),
        contactFormBlock(
          "Hable con nuestro equipo",
          "<p>Si desea conocer más sobre nuestras soluciones, déjenos sus datos de contacto.</p>",
          "Enviar"
        ),
      ],
    },
  },
  {
    pageKey: "technology",
    sortOrder: 2,
    assetRefs: [
      { assetKey: "technology-video", usage: "page.page-hero-block.backgroundVideo" },
      { assetKey: "interrogador-front", usage: "page.media-text-block.media" },
      { assetKey: "interface-monitors", usage: "page.media-text-block.media" },
      { assetKey: "kf-01-fase", usage: "page.feature-card.icon" },
      { assetKey: "kf-02-frequencia", usage: "page.feature-card.icon" },
      { assetKey: "kf-03-alcance", usage: "page.feature-card.icon" },
      { assetKey: "kf-04-das-dts", usage: "page.feature-card.icon" },
      { assetKey: "kf-05-sensibilidade", usage: "page.feature-card.icon" },
      { assetKey: "kf-06-infraestrutura", usage: "page.feature-card.icon" },
    ],
    "pt-BR": {
      title: "Tecnologia",
      summary: "Visão geral da tecnologia proprietária DATS, key features e interface operacional.",
      seoTitle: "Tecnologia | Immer Messen",
      seoDescription: "Tecnologia proprietária DATS com DAS e DTS integrados.",
      blocks: () => [
        pageHeroBlock("Tecnologia DAS/DTS Immer Messen", "Plataforma proprietária para aquisição, processamento e inteligência operacional."),
        mediaTextBlock(
          "Design compacto e integrado: sensoriamento óptico, eletrônica e edge computing reunidos em uma única unidade.",
          "<p>Sensoriamento óptico, eletrônica e edge computing reunidos em uma única unidade para operação em infraestrutura crítica.</p>",
          "right",
          {
            variant: "tech-band",
            ctaLabel: "Download Datasheet",
            ctaHref: "#",
          }
        ),
        featureGridBlock("Key features", [
          { title: "Tecnologia DAS baseada em fase", description: "Medições quantitativas de deformação, acústica e temperatura." },
          { title: "Resposta em frequência ampla", description: "Monitoramento desde frequências ultrabaixas até dezenas de kHz." },
          { title: "Alcance de até 120 km", description: "Duas fibras de até 60 km em um único interrogador." },
          { title: "DAS e DTS integrados", description: "Medições simultâneas sobre a mesma fibra óptica." },
          { title: "Alta sensibilidade", description: "Detecção de estímulos axiais em escala pico-strain e miliKelvin." },
          { title: "Infraestrutura eficiente", description: "Compatibilidade com fibra padrão e baixo consumo energético." },
        ]),
        mediaTextBlock(
          "Interface operacional",
          "<ul><li>Interface web embarcada.</li><li>Acesso remoto seguro por intranet ou internet.</li><li>Controle de parâmetros de aquisição.</li><li>Alarmes configuráveis para localização de anomalias.</li></ul>",
          "left",
          { variant: "interface" }
        ),
      ],
    },
    en: {
      title: "Technology",
      summary: "Overview of the proprietary DATS technology, key features and operational interface.",
      seoTitle: "Technology | Immer Messen",
      seoDescription: "Proprietary DATS technology with integrated DAS and DTS.",
      blocks: () => [
        pageHeroBlock("Immer Messen DAS/DTS technology", "Proprietary platform for acquisition, processing and operational intelligence."),
        mediaTextBlock(
          "Compact, integrated design: optical sensing, electronics and edge computing combined in a single unit.",
          "<p>Optical sensing, electronics and edge computing combined in a single unit for operation on critical infrastructure.</p>",
          "right",
          {
            variant: "tech-band",
            ctaLabel: "Download Datasheet",
            ctaHref: "#",
          }
        ),
        featureGridBlock("Key features", [
          { title: "Phase-based DAS technology", description: "Quantitative measurements of strain, acoustics and temperature." },
          { title: "Wide frequency response", description: "Monitoring from ultra-low frequencies up to tens of kHz." },
          { title: "Up to 120 km reach", description: "Two fibers of up to 60 km in a single interrogator." },
          { title: "Integrated DAS and DTS", description: "Simultaneous measurements over the same optical fiber." },
          { title: "High sensitivity", description: "Detection of axial stimuli at pico-strain and milliKelvin scale." },
          { title: "Efficient infrastructure", description: "Compatible with standard fiber and low power consumption." },
        ]),
        mediaTextBlock(
          "Operational interface",
          "<ul><li>Embedded web interface.</li><li>Secure remote access via intranet or internet.</li><li>Control of acquisition parameters.</li><li>Configurable alarms for anomaly localization.</li></ul>",
          "left",
          { variant: "interface" }
        ),
      ],
    },
    es: {
      title: "Tecnología",
      summary: "Visión general de la tecnología propietaria DATS, key features e interfaz operativa.",
      seoTitle: "Tecnología | Immer Messen",
      seoDescription: "Tecnología propietaria DATS con DAS y DTS integrados.",
      blocks: () => [
        pageHeroBlock("Tecnología DAS/DTS Immer Messen", "Plataforma propietaria para adquisición, procesamiento e inteligencia operativa."),
        mediaTextBlock(
          "Diseño compacto e integrado: sensado óptico, electrónica y edge computing reunidos en una sola unidad.",
          "<p>Sensado óptico, electrónica y edge computing reunidos en una sola unidad para operación en infraestructura crítica.</p>",
          "right",
          {
            variant: "tech-band",
            ctaLabel: "Download Datasheet",
            ctaHref: "#",
          }
        ),
        featureGridBlock("Key features", [
          { title: "Tecnología DAS basada en fase", description: "Mediciones cuantitativas de deformación, acústica y temperatura." },
          { title: "Respuesta en frecuencia amplia", description: "Monitoreo desde frecuencias ultrabajas hasta decenas de kHz." },
          { title: "Alcance de hasta 120 km", description: "Dos fibras de hasta 60 km en un solo interrogador." },
          { title: "DAS y DTS integrados", description: "Mediciones simultáneas sobre la misma fibra óptica." },
          { title: "Alta sensibilidad", description: "Detección de estímulos axiales en escala pico-strain y miliKelvin." },
          { title: "Infraestructura eficiente", description: "Compatibilidad con fibra estándar y bajo consumo energético." },
        ]),
        mediaTextBlock(
          "Interfaz operativa",
          "<ul><li>Interfaz web embebida.</li><li>Acceso remoto seguro por intranet o internet.</li><li>Control de parámetros de adquisición.</li><li>Alarmas configurables para localización de anomalías.</li></ul>",
          "left",
          { variant: "interface" }
        ),
      ],
    },
  },
  {
    pageKey: "about",
    sortOrder: 4,
    assetRefs: [
      { assetKey: "about-lab-data-center", usage: "page.about-content-block.row.media" },
      { assetKey: "about-lab-data-center", usage: "page.about-content-block.row.media" },
      { assetKey: "about-interrogador-rack", usage: "page.about-content-block.highlight.media" },
    ],
    "pt-BR": {
      title: "Quem somos",
      summary: "História, posicionamento técnico e ecossistema de parceiros da Immer Messen.",
      seoTitle: "Quem somos | Immer Messen",
      seoDescription: "Origem acadêmica, P&D aplicado e capacidade de entrega da Immer Messen.",
      blocks: () => [
        aboutContentBlock(
          "QUEM SOMOS",
          [
            {
              mediaPosition: "left",
              heading: "Nascemos nos laboratórios. Chegamos ao campo.",
              body: "<p>A Immer Messen tem origem na pesquisa de ponta desenvolvida na Universidade Tecnológica Federal do Paraná (UTFPR), em Curitiba. Foi dentro dos laboratórios da universidade que surgiu o primeiro interrogador DAS de desenvolvimento genuinamente nacional — resultado de anos de pesquisa aplicada em fotônica, metrologia óptica e processamento de sinais.</p><p>Esse DNA acadêmico não ficou no laboratório. Ele se traduziu em tecnologia proprietária, arquitetura de hardware independente de fornecedores externos e capacidade de desenvolvimento de algoritmos específicos para as condições operacionais da infraestrutura crítica brasileira.</p>",
            },
            {
              mediaPosition: "right",
              heading: "Da pesquisa ao mercado, com validação de classe mundial",
              body: "<p>O reconhecimento do potencial tecnológico da Immer Messen veio antes mesmo do lançamento comercial. A Petrobras, maior operadora de infraestrutura de energia do país, selecionou a empresa como parceira em projeto de P&amp;D que validou a maturidade técnica do sistema e acelerou o desenvolvimento de aplicações para o segmento de óleo e gás.</p><p>Essa parceria resultou em projetos de pesquisa aplicada voltados ao monitoramento de reservatórios, com foco em armazenamento, tratamento e distribuição de dados DFOS para aplicações de sensoriamento em poços e infraestrutura subsuperficial — posicionando a Immer Messen como referência técnica nacional no segmento.</p>",
            },
          ],
          {
            badgeLabel: "INCEPTION PROGRAM",
            leftHeading: "Membro do NVIDIA Inception Program",
            leftBody: "<p>A Immer Messen integra o NVIDIA Inception Program, iniciativa global de suporte a startups de deep-tech e inteligência artificial — reconhecimento do papel estratégico que os algoritmos de IA desempenham na plataforma da empresa e do alinhamento com a fronteira tecnológica em aceleração de modelos de machine learning aplicados a dados de sensoriamento distribuído.</p>",
            rightHeading: "Pioneirismo Brasileiro",
            rightBody: "<p>Somos o único desenvolvedor brasileiro de tecnologia DFOS com hardware proprietário, algoritmos de IA treinados com dados de campo nacionais e capacidade de entrega de solução completa — do interrogador óptico à plataforma de monitoramento contínuo. Nossa estrutura local permite suporte ágil, precificação competitiva e integração nativa aos requisitos regulatórios do mercado brasileiro.</p>",
          }
        ),
        partnersBlock("Nossos parceiros:", allPartnerKeys),
        contactFormBlock(
          "Fale com a nossa equipe",
          "<p>Se você tem interesse em saber mais sobre as nossas soluções, deixe o seu contato.</p>",
          "Enviar"
        ),
      ],
    },
    en: {
      title: "About",
      summary: "History, technical positioning and partner ecosystem of Immer Messen.",
      seoTitle: "About | Immer Messen",
      seoDescription: "Academic origin, applied R&D and delivery capacity of Immer Messen.",
      blocks: () => [
        aboutContentBlock(
          "ABOUT US",
          [
            {
              mediaPosition: "left",
              heading: "Born in the labs. Proven in the field.",
              body: "<p>Immer Messen originates from cutting-edge research developed at the Federal University of Technology - Paraná (UTFPR) in Curitiba. The first genuinely Brazilian DAS interrogator was built inside the university's labs — the result of years of applied research in photonics, optical metrology and signal processing.</p><p>That academic DNA didn't stay in the lab. It evolved into proprietary technology, a hardware architecture independent of external vendors, and the capability to develop algorithms specific to the operating conditions of Brazilian critical infrastructure.</p>",
            },
            {
              mediaPosition: "right",
              heading: "From research to market, with world-class validation",
              body: "<p>Recognition of Immer Messen's technological potential arrived even before its commercial launch. Petrobras, the country's largest energy infrastructure operator, selected the company as a partner in an R&amp;D project that validated the system's technical maturity and accelerated the development of applications for the oil and gas segment.</p><p>This partnership produced applied research projects focused on reservoir monitoring — with emphasis on storage, processing and distribution of DFOS data for downhole and subsurface sensing — positioning Immer Messen as the national technical reference in the segment.</p>",
            },
          ],
          {
            badgeLabel: "INCEPTION PROGRAM",
            leftHeading: "Member of the NVIDIA Inception Program",
            leftBody: "<p>Immer Messen is part of the NVIDIA Inception Program, a global initiative supporting deep-tech and AI startups — recognition of the strategic role that AI algorithms play in the company's platform and of its alignment with the technological frontier in accelerating machine learning models applied to distributed sensing data.</p>",
            rightHeading: "Brazilian Pioneering",
            rightBody: "<p>We are the only Brazilian developer of DFOS technology with proprietary hardware, AI algorithms trained on national field data, and the capability to deliver a full solution — from optical interrogator to continuous monitoring platform. Our local structure enables agile support, competitive pricing and native compliance with Brazilian regulatory requirements.</p>",
          }
        ),
        partnersBlock("Our partners:", allPartnerKeys),
        contactFormBlock(
          "Talk to our team",
          "<p>If you would like to learn more about our solutions, leave your contact information.</p>",
          "Send"
        ),
      ],
    },
    es: {
      title: "Quiénes somos",
      summary: "Historia, posicionamiento técnico y ecosistema de aliados de Immer Messen.",
      seoTitle: "Quiénes somos | Immer Messen",
      seoDescription: "Origen académico, I+D aplicada y capacidad de entrega de Immer Messen.",
      blocks: () => [
        aboutContentBlock(
          "QUIÉNES SOMOS",
          [
            {
              mediaPosition: "left",
              heading: "Nacimos en los laboratorios. Llegamos al campo.",
              body: "<p>Immer Messen tiene origen en la investigación de punta desarrollada en la Universidad Tecnológica Federal de Paraná (UTFPR), en Curitiba. Fue dentro de los laboratorios de la universidad donde surgió el primer interrogador DAS de desarrollo genuinamente brasileño — resultado de años de investigación aplicada en fotónica, metrología óptica y procesamiento de señales.</p><p>Ese ADN académico no se quedó en el laboratorio. Se tradujo en tecnología propietaria, arquitectura de hardware independiente de proveedores externos y capacidad para desarrollar algoritmos específicos para las condiciones operativas de la infraestructura crítica brasileña.</p>",
            },
            {
              mediaPosition: "right",
              heading: "De la investigación al mercado, con validación de clase mundial",
              body: "<p>El reconocimiento del potencial tecnológico de Immer Messen llegó incluso antes del lanzamiento comercial. Petrobras, el mayor operador de infraestructura de energía del país, seleccionó a la empresa como aliada en un proyecto de I+D que validó la madurez técnica del sistema y aceleró el desarrollo de aplicaciones para el segmento de petróleo y gas.</p><p>Esta alianza resultó en proyectos de investigación aplicada orientados al monitoreo de reservorios, con enfoque en almacenamiento, tratamiento y distribución de datos DFOS para aplicaciones de sensado en pozos e infraestructura subsuperficial — posicionando a Immer Messen como referencia técnica nacional en el segmento.</p>",
            },
          ],
          {
            badgeLabel: "INCEPTION PROGRAM",
            leftHeading: "Miembro del NVIDIA Inception Program",
            leftBody: "<p>Immer Messen integra el NVIDIA Inception Program, iniciativa global de apoyo a startups de deep-tech e inteligencia artificial — reconocimiento del papel estratégico que los algoritmos de IA desempeñan en la plataforma de la empresa y del alineamiento con la frontera tecnológica en aceleración de modelos de machine learning aplicados a datos de sensado distribuido.</p>",
            rightHeading: "Pionerismo Brasileño",
            rightBody: "<p>Somos el único desarrollador brasileño de tecnología DFOS con hardware propietario, algoritmos de IA entrenados con datos de campo nacionales y capacidad de entrega de solución completa — del interrogador óptico a la plataforma de monitoreo continuo. Nuestra estructura local permite soporte ágil, precificación competitiva e integración nativa a los requisitos regulatorios del mercado brasileño.</p>",
          }
        ),
        partnersBlock("Nuestros aliados:", allPartnerKeys),
        contactFormBlock(
          "Hable con nuestro equipo",
          "<p>Si desea conocer más sobre nuestras soluciones, déjenos sus datos de contacto.</p>",
          "Enviar"
        ),
      ],
    },
  },
  {
    pageKey: "lgpd",
    sortOrder: 6,
    assetRefs: [],
    "pt-BR": {
      title: "LGPD",
      summary: "Política institucional de privacidade e tratamento de dados da Immer Messen.",
      seoTitle: "LGPD | Immer Messen",
      seoDescription: "Política de privacidade, cookies e tratamento de dados pessoais.",
      blocks: () => [
        lgpdContentBlock("Sumário", [
          { title: "1. Introdução", content: "<p>A Immer Messen valoriza a privacidade e a proteção dos dados pessoais dos seus usuários, clientes e parceiros.</p>" },
          { title: "2. Dados coletados", content: "<p>Coletamos dados fornecidos diretamente por você, como nome, e-mail, empresa, cargo e mensagem, além de dados de navegação obtidos por cookies e tecnologias similares.</p>" },
          { title: "3. Finalidade do tratamento", content: "<p>Os dados são tratados para responder solicitações, fornecer informações sobre soluções, melhorar a experiência de navegação e atender obrigações legais.</p>" },
          { title: "4. Base legal", content: "<p>O tratamento se apoia nas bases legais previstas no artigo 7º da LGPD, incluindo consentimento, obrigação legal, execução contratual e legítimo interesse.</p>" },
          { title: "5. Compartilhamento de dados", content: "<p>Não comercializamos dados pessoais. Compartilhamentos ocorrem apenas com operadores necessários e autoridades quando houver obrigação legal.</p>" },
          { title: "6. Direitos do titular", content: "<p>O titular pode solicitar acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamento e revogação de consentimento.</p>" },
          { title: "7. Uso de cookies", content: "<p>Utilizamos cookies para funcionamento adequado, preferências e estatísticas de uso, com possibilidade de gestão pelo navegador.</p>" },
          { title: "8. Segurança da informação", content: "<p>Aplicamos medidas técnicas e organizacionais para proteger dados contra acesso não autorizado, perda, alteração e divulgação indevida.</p>" },
          { title: "9. Contato do Encarregado (DPO)", content: "<p>Solicitações sobre direitos e tratamento de dados podem ser enviadas para dpo@immermessen.com.</p>" },
        ]),
      ],
    },
    en: {
      title: "Privacy",
      summary: "Immer Messen institutional privacy and data protection policy.",
      seoTitle: "Privacy | Immer Messen",
      seoDescription: "Privacy policy, cookies and personal data processing.",
      blocks: () => [
        lgpdContentBlock("Summary", [
          { title: "1. Introduction", content: "<p>Immer Messen values the privacy and protection of personal data of its users, clients and partners.</p>" },
          { title: "2. Data collected", content: "<p>We collect data provided directly by you, such as name, email, company, role and message, in addition to browsing data obtained through cookies and similar technologies.</p>" },
          { title: "3. Purpose of processing", content: "<p>Data is processed to respond to requests, provide information about solutions, improve browsing experience and comply with legal obligations.</p>" },
          { title: "4. Legal basis", content: "<p>Processing is supported by the legal bases set out in article 7 of LGPD, including consent, legal obligation, contractual execution and legitimate interest.</p>" },
          { title: "5. Data sharing", content: "<p>We do not sell personal data. Sharing occurs only with necessary operators and authorities when there is a legal obligation.</p>" },
          { title: "6. Data subject rights", content: "<p>The data subject may request access, correction, anonymization, portability, deletion, information about sharing and revocation of consent.</p>" },
          { title: "7. Use of cookies", content: "<p>We use cookies for proper functioning, preferences and usage statistics, with the possibility of management through the browser.</p>" },
          { title: "8. Information security", content: "<p>We apply technical and organizational measures to protect data against unauthorized access, loss, alteration and improper disclosure.</p>" },
          { title: "9. DPO contact", content: "<p>Requests about rights and data processing can be sent to dpo@immermessen.com.</p>" },
        ]),
      ],
    },
    es: {
      title: "Privacidad",
      summary: "Política institucional de privacidad y tratamiento de datos de Immer Messen.",
      seoTitle: "Privacidad | Immer Messen",
      seoDescription: "Política de privacidad, cookies y tratamiento de datos personales.",
      blocks: () => [
        lgpdContentBlock("Sumario", [
          { title: "1. Introducción", content: "<p>Immer Messen valora la privacidad y la protección de los datos personales de sus usuarios, clientes y aliados.</p>" },
          { title: "2. Datos recopilados", content: "<p>Recopilamos datos proporcionados directamente por usted, como nombre, correo electrónico, empresa, cargo y mensaje, además de datos de navegación obtenidos mediante cookies y tecnologías similares.</p>" },
          { title: "3. Finalidad del tratamiento", content: "<p>Los datos se tratan para responder solicitudes, brindar información sobre soluciones, mejorar la experiencia de navegación y cumplir obligaciones legales.</p>" },
          { title: "4. Base legal", content: "<p>El tratamiento se apoya en las bases legales previstas en el artículo 7 de la LGPD, incluyendo consentimiento, obligación legal, ejecución contractual e interés legítimo.</p>" },
          { title: "5. Compartición de datos", content: "<p>No comercializamos datos personales. La compartición ocurre solamente con operadores necesarios y autoridades cuando exista obligación legal.</p>" },
          { title: "6. Derechos del titular", content: "<p>El titular puede solicitar acceso, corrección, anonimización, portabilidad, eliminación, información sobre compartición y revocación del consentimiento.</p>" },
          { title: "7. Uso de cookies", content: "<p>Utilizamos cookies para el funcionamiento adecuado, preferencias y estadísticas de uso, con posibilidad de gestión por el navegador.</p>" },
          { title: "8. Seguridad de la información", content: "<p>Aplicamos medidas técnicas y organizativas para proteger los datos contra acceso no autorizado, pérdida, alteración y divulgación indebida.</p>" },
          { title: "9. Contacto del Encargado (DPO)", content: "<p>Las solicitudes sobre derechos y tratamiento de datos pueden enviarse a dpo@immermessen.com.</p>" },
        ]),
      ],
    },
  },
];

const pageEntries = pageDefs.flatMap((def) =>
  locales.map((locale) => ({
    locale,
    data: {
      title: def[locale].title,
      slug: slugByPageKey[def.pageKey][locale],
      pageKey: def.pageKey,
      summary: def[locale].summary,
      seo: seo(
        def[locale].seoTitle,
        def[locale].seoDescription,
        `https://www.immermessen.com/${locale}/${slugByPageKey[def.pageKey][locale]}`
      ),
      blocks: def[locale].blocks(locale),
    },
    assetRefs: def.assetRefs,
  }))
);

export const seedContent = {
  metadata: {
    generatedAt: "2026-05-25",
    sourceFiles: [
      "layout-aprovado/index.html",
      "layout-aprovado/tecnologia.html",
      "layout-aprovado/solucoes.html",
      "layout-aprovado/quem-somos.html",
      "layout-aprovado/contato.html",
      "layout-aprovado/lgpd.html",
      "layout-aprovado/noticias.html",
      "layout-aprovado/cases.html",
      "layout-aprovado/cases/*.html",
    ],
    supportedLocales: locales,
    editorialLocalesSeeded: locales,
    shellLocalesSeeded: locales,
    notes: [
      "Seed explícito e versionado, sem bootstrap automático.",
      "Conteúdo editorial completo nos três idiomas: pt-BR, en e es.",
      "Acentuação pt-BR aplicada; en e es são traduções em rascunho prontas para revisão editorial.",
    ],
  },
  singleTypes: Object.entries(shell).flatMap(([locale, values]) => [
    { type: "global-setting", locale, data: values.global, assetRefs: [{ assetKey: "logo-immer", usage: "global-setting.primaryLogo" }, { assetKey: "logo-immer", usage: "global-setting.alternativeLogo" }, { assetKey: "logo-immer", usage: "global-setting.favicon" }] },
    { type: "footer", locale, data: values.footer, assetRefs: [{ assetKey: "logo-immer", usage: "footer.logo" }] },
    { type: "cookie-banner", locale, data: values.cookieBanner, assetRefs: [] },
  ]),
  applicationAreas,
  partners,
  newsArticles,
  caseStudies,
  pages: pageEntries,
};

export const assetManifest = {
  readyAssets: [
    { assetKey: "logo-immer", sourcePath: "layout-aprovado/assets/img/logo-immer.png", kind: "image" },
    { assetKey: "case-cover-baleias", sourcePath: "resources/cases-01.png", kind: "image" },
    { assetKey: "case-cover-transmissao", sourcePath: "resources/cases-01_1.png", kind: "image" },
    { assetKey: "case-cover-gasodutos", sourcePath: "resources/cases-03.png", kind: "image" },
    { assetKey: "case-cover-petrobras", sourcePath: "resources/cases-04.png", kind: "image" },
    { assetKey: "hero-home-poster", sourcePath: "layout-aprovado/assets/img/hero-home.png", kind: "image" },
    { assetKey: "hero-home-video", sourcePath: "layout-aprovado/assets/video/HOME.mp4", kind: "video" },
    { assetKey: "technology-video", sourcePath: "layout-aprovado/assets/video/Interrogador.webm", kind: "video" },
    { assetKey: "interrogador-rack", sourcePath: "layout-aprovado/assets/img/interrogador.png", kind: "image" },
    { assetKey: "interrogador-front", sourcePath: "layout-aprovado/assets/img/interrogador-front.png", kind: "image" },
    { assetKey: "interface-monitors", sourcePath: "layout-aprovado/assets/img/interface-monitors.png", kind: "image" },
    { assetKey: "case-hero-offshore", sourcePath: "layout-aprovado/assets/img/case-hero-offshore.png", kind: "image" },
    { assetKey: "application-integridade-estrutural", sourcePath: "layout-aprovado/assets/img/areas/integridade-estrutural.png", kind: "image" },
    { assetKey: "application-vazamentos", sourcePath: "layout-aprovado/assets/img/areas/vazamentos.png", kind: "image" },
    { assetKey: "application-seguranca-patrimonial", sourcePath: "layout-aprovado/assets/img/areas/seguranca-patrimonial.png", kind: "image" },
    { assetKey: "application-meio-ambiente", sourcePath: "layout-aprovado/assets/img/areas/meio-ambiente.png", kind: "image" },
    { assetKey: "application-sismica", sourcePath: "layout-aprovado/assets/img/areas/sismica.png", kind: "image" },
    { assetKey: "application-incendios", sourcePath: "layout-aprovado/assets/img/areas/incendios.png", kind: "image" },
    { assetKey: "application-escoamento", sourcePath: "layout-aprovado/assets/img/areas/escoamento.png", kind: "image" },
    { assetKey: "application-derivacao-clandestina", sourcePath: "layout-aprovado/assets/img/areas/derivacao-clandestina.png", kind: "image" },
    { assetKey: "partner-petrobras", sourcePath: "layout-aprovado/assets/img/partners/petrobras.png", kind: "image" },
    { assetKey: "partner-sebrae", sourcePath: "layout-aprovado/assets/img/partners/sebrae.png", kind: "image" },
    { assetKey: "partner-instituto-aqualie", sourcePath: "layout-aprovado/assets/img/partners/instituto-aqualie.png", kind: "image" },
    { assetKey: "partner-nvidia", sourcePath: "layout-aprovado/assets/img/partners/nvidia.png", kind: "image" },
    { assetKey: "partner-cnpq", sourcePath: "layout-aprovado/assets/img/partners/cnpq.png", kind: "image" },
    { assetKey: "partner-seafom", sourcePath: "layout-aprovado/assets/img/partners/seafom.png", kind: "image" },
    { assetKey: "partner-ouronova", sourcePath: "layout-aprovado/assets/img/partners/ouronova.png", kind: "image" },
    { assetKey: "partner-utfpr", sourcePath: "layout-aprovado/assets/img/partners/utfpr.png", kind: "image" },
    { assetKey: "kf-01-fase", sourcePath: "layout-aprovado/assets/img/kf/01-fase.png", kind: "image" },
    { assetKey: "kf-02-frequencia", sourcePath: "layout-aprovado/assets/img/kf/02-frequencia.png", kind: "image" },
    { assetKey: "kf-03-alcance", sourcePath: "layout-aprovado/assets/img/kf/03-alcance.png", kind: "image" },
    { assetKey: "kf-04-das-dts", sourcePath: "layout-aprovado/assets/img/kf/04-das-dts.png", kind: "image" },
    { assetKey: "kf-05-sensibilidade", sourcePath: "layout-aprovado/assets/img/kf/05-sensibilidade.png", kind: "image" },
    { assetKey: "kf-06-infraestrutura", sourcePath: "layout-aprovado/assets/img/kf/06-infraestrutura.png", kind: "image" },
    { assetKey: "tec-icon-sensors", sourcePath: "layout-aprovado/assets/img/tec-icons/tec-icon-01.png", kind: "image" },
    { assetKey: "tec-icon-range", sourcePath: "layout-aprovado/assets/img/tec-icons/tec-icon-02.png", kind: "image" },
    { assetKey: "tec-icon-spacing", sourcePath: "layout-aprovado/assets/img/tec-icons/tec-icon-03.png", kind: "image" },
    { assetKey: "tec-icon-ai", sourcePath: "layout-aprovado/assets/img/tec-icons/tec-icon-04.png", kind: "image" },
    { assetKey: "tec-icon-shield", sourcePath: "layout-aprovado/assets/img/tec-icons/tec-icon-05.png", kind: "image" },
    { assetKey: "tec-icon-alarm", sourcePath: "layout-aprovado/assets/img/tec-icons/tec-icon-06.png", kind: "image" },
    { assetKey: "about-lab-data-center", sourcePath: "resources/quem-somos.png", kind: "image" },
    { assetKey: "about-interrogador-rack", sourcePath: "resources/quem-somos-02.png", kind: "image" },
  ],
  placeholderAssetsToReplace: [
    { assetKey: "contact-placeholder-hero", location: "layout-aprovado/contato.html", purpose: "page hero", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-cabos-submarinos", location: "layout-aprovado/cases/monitoramento-cabos-submarinos.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-baleias", location: "layout-aprovado/cases/monitoramento-baleias.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-transmissao", location: "layout-aprovado/cases/monitoramento-transmissao-energia.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-gasodutos", location: "layout-aprovado/cases/monitoramento-gasodutos.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "news-placeholder-fibra-sensor", location: "layout-aprovado/noticias.html", purpose: "news cover", currentSource: "external-unsplash" },
    { assetKey: "news-placeholder-acustica-submarina", location: "layout-aprovado/noticias.html", purpose: "news cover", currentSource: "external-unsplash" },
    { assetKey: "news-placeholder-estudos-sismicos", location: "layout-aprovado/noticias.html", purpose: "news cover", currentSource: "external-unsplash" },
    { assetKey: "news-placeholder-petrobras-pd", location: "layout-aprovado/noticias.html", purpose: "news cover", currentSource: "external-unsplash" },
    { assetKey: "news-placeholder-dats", location: "layout-aprovado/noticias.html", purpose: "news cover", currentSource: "external-unsplash" },
    { assetKey: "news-placeholder-transmissao", location: "layout-aprovado/noticias.html", purpose: "news cover", currentSource: "external-unsplash" },
  ],
  deferredCoverage: [
    "Galerias de cases e imagens inline das paginas ainda nao possuem modelagem dedicada no CMS.",
    "Os blocos de pagina agora aceitam midia principal, mas substituicao de placeholders adicionais depende de blocos visuais mais ricos nas fases 5 a 7.",
  ],
  uploadPriority: [
    "logo-immer",
    "hero-home-poster",
    "hero-home-video",
    "technology-video",
    "interrogador-rack",
    "interrogador-front",
    "interface-monitors",
    "application-*",
    "partner-*",
    "kf-*",
    "case-hero-offshore",
  ],
};

const validateSeed = () => {
  const errors = [];
  const pageKeys = new Set(["home", "technology", "about", "lgpd"]);
  const seenPageLocales = new Map();

  for (const locale of locales) {
    const localizedPages = seedContent.pages.filter((page) => page.locale === locale);
    for (const key of pageKeys) {
      if (!localizedPages.some((page) => page.data.pageKey === key)) {
        errors.push(`Missing pageKey ${key} for locale ${locale}`);
      }
    }
  }

  for (const page of seedContent.pages) {
    const compoundKey = `${page.locale}:${page.data.pageKey}`;
    if (seenPageLocales.has(compoundKey)) {
      errors.push(`Duplicate localized page ${compoundKey}`);
    }
    seenPageLocales.set(compoundKey, true);
  }

  const expectedAreas = 8 * locales.length;
  if (seedContent.applicationAreas.length !== expectedAreas) {
    errors.push(`Expected ${expectedAreas} localized application areas, found ${seedContent.applicationAreas.length}`);
  }

  if (seedContent.partners.length < 6) {
    errors.push(`Expected at least 6 partners, found ${seedContent.partners.length}`);
  }

  if (seedContent.newsArticles.length < 4 * locales.length) {
    errors.push(`Expected at least ${4 * locales.length} localized news articles, found ${seedContent.newsArticles.length}`);
  }

  if (seedContent.caseStudies.length < 4 * locales.length) {
    errors.push(`Expected at least ${4 * locales.length} localized case studies, found ${seedContent.caseStudies.length}`);
  }

  return errors;
};

const printSummary = () => {
  const errors = validateSeed();

  const summary = {
    locales: seedContent.metadata.supportedLocales,
    singleTypes: seedContent.singleTypes.length,
    pages: seedContent.pages.length,
    applicationAreas: seedContent.applicationAreas.length,
    partners: seedContent.partners.length,
    newsArticles: seedContent.newsArticles.length,
    caseStudies: seedContent.caseStudies.length,
    readyAssets: assetManifest.readyAssets.length,
    placeholders: assetManifest.placeholderAssetsToReplace.length,
    errors,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (errors.length > 0) {
    process.exitCode = 1;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  printSummary();
}
