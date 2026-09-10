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

const pageHeroBlock = (title, subtitle, options = {}) => ({
  __component: "page.page-hero-block",
  title,
  subtitle,
  ...(Array.isArray(options.badges) && options.badges.length
    ? { badges: options.badges.map((label) => ({ label })) }
    : {}),
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

const accordionBlock = (heading, items, body = "", extra = {}) => ({
  __component: "page.accordion-block",
  heading,
  body,
  items: items.map((item) => ({
    title: item.title,
    content: item.content,
  })),
  ...extra,
});

const specStripBlock = (eyebrow, items) => ({
  __component: "page.spec-strip-block",
  eyebrow,
  items,
});

const featureGridBlock = (heading, cards, variant, options = {}) => ({
  __component: "page.feature-grid-block",
  heading,
  ...(options.subheading ? { subheading: options.subheading } : {}),
  ...(variant ? { variant } : {}),
  cards: cards.map((card) => ({
    title: card.title,
    description: card.description,
  })),
});

const equipmentCalloutsBlock = (heading, callouts, options = {}) => ({
  __component: "page.equipment-callouts-block",
  ...(heading ? { heading } : {}),
  callouts: callouts.map((c) => ({
    title: c.title,
    description: c.description,
    position: c.position,
  })),
  ...(options.ctaLabel ? { ctaLabel: options.ctaLabel } : {}),
  ...(options.ctaHref ? { ctaHref: options.ctaHref } : {}),
});

const applicationAreasBlock = (heading, areaKeys) => ({
  __component: "page.application-areas-block",
  heading,
  areaKeys,
});

const casesBlock = (heading, displayMode, caseKeys = [], extra = {}) => ({
  __component: "page.cases-block",
  heading,
  displayMode,
  caseKeys,
  ...extra,
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

const homeAboutBlock = (eyebrow, title, intro, cards) => ({
  __component: "page.about-content-block",
  variant: "home-about",
  eyebrow,
  title,
  intro,
  cards,
  rows: [],
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
        address: "Rua Desembargador Westphalen, 868 - Sala 504\nRebouças - Curitiba - PR\nCEP: 80.230-100",
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
            { label: "Quem somos", href: "/pt-BR#quem-somos", openInNewTab: false },
            { label: "Cases", href: "/pt-BR#cases", openInNewTab: false },
            { label: "Notícias", href: "/pt-BR#noticias", openInNewTab: false },
            { label: "Contato", href: "/pt-BR#contato", openInNewTab: false },
          ],
        },
      ],
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Rua Desembargador Westphalen, 868 - Sala 504\nRebouças - Curitiba - PR\nCEP: 80.230-100",
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
        address: "Rua Desembargador Westphalen, 868 - Sala 504\nRebouças - Curitiba - PR\nCEP: 80.230-100",
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
            { label: "About", href: "/en#quem-somos", openInNewTab: false },
            { label: "Cases", href: "/en#cases", openInNewTab: false },
            { label: "News", href: "/en#noticias", openInNewTab: false },
            { label: "Contact", href: "/en#contato", openInNewTab: false },
          ],
        },
      ],
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Rua Desembargador Westphalen, 868 - Sala 504\nRebouças - Curitiba - PR\nCEP: 80.230-100",
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
        address: "Rua Desembargador Westphalen, 868 - Sala 504\nRebouças - Curitiba - PR\nCEP: 80.230-100",
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
            { label: "Quiénes somos", href: "/es#quem-somos", openInNewTab: false },
            { label: "Casos", href: "/es#cases", openInNewTab: false },
            { label: "Noticias", href: "/es#noticias", openInNewTab: false },
            { label: "Contacto", href: "/es#contato", openInNewTab: false },
          ],
        },
      ],
      contactDetails: {
        email: "contato@immermessen.com",
        phone: "+55 41 00000-0000",
        address: "Rua Desembargador Westphalen, 868 - Sala 504\nRebouças - Curitiba - PR\nCEP: 80.230-100",
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
    key: "cabos-submarinos",
    sortOrder: 10,
    slug: "cabos-submarinos",
    assetKey: "application-cabos-submarinos",
    tileSpan: "wide",
    "pt-BR": {
      title: "Integridade de cabos submarinos",
      summary: "Detecção de intrusão, âncoras e danos em cabos submarinos ao longo de centenas de quilômetros.",
      body: "<p>Monitoramento contínuo de cabos submarinos de telecomunicações e energia, com localização precisa de eventos ao longo de toda a rota.</p>",
    },
    en: {
      title: "Submarine cable integrity",
      summary: "Detection of intrusion, anchoring and damage on submarine cables across hundreds of kilometres.",
      body: "<p>Continuous monitoring of submarine telecom and power cables, with precise event localisation along the whole route.</p>",
    },
    es: {
      title: "Integridad de cables submarinos",
      summary: "Detección de intrusión, anclas y daños en cables submarinos a lo largo de cientos de kilómetros.",
      body: "<p>Monitoreo continuo de cables submarinos de telecomunicaciones y energía, con localización precisa de eventos en toda la ruta.</p>",
    },
  },
  {
    key: "linhas-transmissao",
    sortOrder: 20,
    slug: "linhas-transmissao",
    assetKey: "application-linhas-transmissao",
    tileSpan: "small",
    "pt-BR": {
      title: "Linhas de transmissão",
      summary: "Monitoramento de linhas de transmissão pelo cabo OPGW já instalado, sem sensores adicionais.",
      body: "<p>Uso da fibra óptica embarcada no cabo para-raios para detectar falhas, vibração e interferências ao longo da linha.</p>",
    },
    en: {
      title: "Transmission lines",
      summary: "Monitoring of transmission lines through the existing OPGW cable, with no extra sensors.",
      body: "<p>Uses the fiber embedded in the earth wire to detect faults, vibration and interference along the line.</p>",
    },
    es: {
      title: "Líneas de transmisión",
      summary: "Monitoreo de líneas de transmisión por el cable OPGW ya instalado, sin sensores adicionales.",
      body: "<p>Uso de la fibra óptica embarcada en el cable de guarda para detectar fallas, vibración e interferencias a lo largo de la línea.</p>",
    },
  },
  {
    key: "derivacao-clandestina",
    sortOrder: 30,
    slug: "derivacao-clandestina",
    assetKey: "application-derivacao-clandestina",
    tileSpan: "small",
    "pt-BR": {
      title: "Derivação clandestina",
      summary: "Detecção de interferências indevidas em ativos lineares com localização precisa.",
      body: "<p>Identificação de escavação, perfuração e derivação não autorizada em dutos e cabos, com alerta em tempo real.</p>",
    },
    en: {
      title: "Illegal tapping",
      summary: "Detection of unauthorised interference on linear assets with precise localisation.",
      body: "<p>Identifies digging, drilling and unauthorised tapping on pipelines and cables, with real-time alerts.</p>",
    },
    es: {
      title: "Derivación clandestina",
      summary: "Detección de interferencias indebidas en activos lineales con localización precisa.",
      body: "<p>Identificación de excavación, perforación y derivación no autorizada en ductos y cables, con alerta en tiempo real.</p>",
    },
  },
  {
    key: "geofisica",
    sortOrder: 40,
    slug: "geofisica",
    assetKey: "application-geofisica",
    tileSpan: "small",
    "pt-BR": {
      title: "Geofísica",
      summary: "Aquisição sísmica distribuída com milhares de canais sobre a fibra já instalada.",
      body: "<p>Levantamentos geofísicos e monitoramento de reservatório usando a fibra como arranjo sísmico contínuo.</p>",
    },
    en: {
      title: "Geophysics",
      summary: "Distributed seismic acquisition with thousands of channels over the installed fiber.",
      body: "<p>Geophysical surveys and reservoir monitoring using the fiber as a continuous seismic array.</p>",
    },
    es: {
      title: "Geofísica",
      summary: "Adquisición sísmica distribuida con miles de canales sobre la fibra ya instalada.",
      body: "<p>Levantamientos geofísicos y monitoreo de reservorio usando la fibra como arreglo sísmico continuo.</p>",
    },
  },
  {
    key: "embarcacoes",
    sortOrder: 50,
    slug: "embarcacoes",
    assetKey: "application-embarcacoes",
    tileSpan: "small",
    "pt-BR": {
      title: "Embarcações",
      summary: "Identificação e rastreamento acústico de embarcações próximas a ativos submarinos.",
      body: "<p>Detecção da assinatura acústica de motores para estimar trajetória e distância de embarcações sobre a rota do cabo.</p>",
    },
    en: {
      title: "Vessels",
      summary: "Acoustic identification and tracking of vessels near submarine assets.",
      body: "<p>Detects engine acoustic signatures to estimate the trajectory and distance of vessels over the cable route.</p>",
    },
    es: {
      title: "Embarcaciones",
      summary: "Identificación y rastreo acústico de embarcaciones cercanas a activos submarinos.",
      body: "<p>Detección de la firma acústica de motores para estimar trayectoria y distancia de embarcaciones sobre la ruta del cable.</p>",
    },
  },
  {
    key: "meio-ambiente",
    sortOrder: 60,
    slug: "meio-ambiente",
    assetKey: "application-meio-ambiente",
    tileSpan: "large",
    "pt-BR": {
      title: "Meio ambiente",
      summary: "Bioacústica marinha e monitoramento ambiental contínuo sem embarcações em campo.",
      body: "<p>Detecção e localização de vocalizações de cetáceos a partir de cabos submarinos, com acompanhamento remoto.</p>",
    },
    en: {
      title: "Environment",
      summary: "Marine bioacoustics and continuous environmental monitoring with no vessels in the field.",
      body: "<p>Detection and localisation of cetacean vocalisations from submarine cables, monitored remotely.</p>",
    },
    es: {
      title: "Medio ambiente",
      summary: "Bioacústica marina y monitoreo ambiental continuo sin embarcaciones en campo.",
      body: "<p>Detección y localización de vocalizaciones de cetáceos a partir de cables submarinos, con seguimiento remoto.</p>",
    },
  },
  {
    key: "seguranca-patrimonial",
    sortOrder: 70,
    slug: "seguranca-patrimonial",
    assetKey: "application-seguranca-patrimonial",
    tileSpan: "small",
    "pt-BR": {
      title: "Segurança patrimonial",
      summary: "Perímetros e faixas de servidão monitorados de forma contínua por fibra óptica.",
      body: "<p>Detecção de invasão, escavação e circulação indevida em perímetros de plantas e faixas de dutos.</p>",
    },
    en: {
      title: "Site security",
      summary: "Perimeters and rights of way continuously monitored by optical fiber.",
      body: "<p>Detection of intrusion, digging and unauthorised movement on plant perimeters and pipeline corridors.</p>",
    },
    es: {
      title: "Seguridad patrimonial",
      summary: "Perímetros y franjas de servidumbre monitoreados de forma continua por fibra óptica.",
      body: "<p>Detección de invasión, excavación y circulación indebida en perímetros de plantas y franjas de ductos.</p>",
    },
  },
  {
    key: "pocos-submarinos",
    sortOrder: 80,
    slug: "pocos-submarinos",
    assetKey: "application-pocos-submarinos",
    tileSpan: "small",
    "pt-BR": {
      title: "Poços submarinos",
      summary: "Sensoriamento distribuído em poços e linhas submarinas de produção.",
      body: "<p>Perfis contínuos de temperatura e acústica ao longo do poço, para acompanhamento de produção e integridade.</p>",
    },
    en: {
      title: "Subsea wells",
      summary: "Distributed sensing in subsea wells and production flowlines.",
      body: "<p>Continuous temperature and acoustic profiles along the well, for production and integrity monitoring.</p>",
    },
    es: {
      title: "Pozos submarinos",
      summary: "Sensado distribuido en pozos y líneas submarinas de producción.",
      body: "<p>Perfiles continuos de temperatura y acústica a lo largo del pozo, para seguimiento de producción e integridad.</p>",
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
      tileSpan: def.tileSpan,
    },
    assetRefs: [{ assetKey: def.assetKey, usage: "application-area.image" }],
  }))
);

const partners = [
  { key: "immer-messen", data: { name: "Immer Messen", url: "https://www.immermessen.com", sortOrder: 1, active: false }, assetRefs: [{ assetKey: "partner-immer-messen", usage: "partner.logo" }] },
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
    assetKey: "case-bg-fibra",
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
    assetKey: "case-fig-espectrograma",
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
    assetKey: "application-sismica",
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
    assetKey: "case-cover-petrobras",
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
    assetKey: "interrogador-front",
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
    assetKey: "case-cover-transmissao",
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
    assetRefs: [{ assetKey: def.assetKey, usage: "news-article.coverImage" }],
  }))
);

// ---- cases: montagem da dynamic zone ----
//
// Depois do plano 10-06 os campos de corpo (heroTitle, client, startDate,
// duration, tags, projectLogos, challenge, leadTitle, leadSubtitle, body)
// nao existem mais no content type (D-03). As defs abaixo continuam
// declarando esses valores, mas `buildCaseSections` os converte em blocos
// `case.*` antes de gravar — o que vai para `data` sao so os metadados (D-04)
// mais `sections`.

// Rotulos das linhas do card "Detalhes do projeto", por locale.
// ESPELHAM `LABELS` de scripts/migrate-case-blocks.mjs: os dois precisam
// gravar exatamente o mesmo texto, senao um re-seed troca o rotulo do
// conteudo ja migrado. Rotulo SEM dois-pontos — a marcacao do frontend
// adiciona o ":" (D-09).
const caseBlockLabels = {
  "pt-BR": {
    detailsTitle: "Informações gerais",
    challengeTitle: "O desafio",
    client: "Cliente",
    startDate: "Data",
    duration: "Duração",
    tags: "Tags",
  },
  en: {
    detailsTitle: "General information",
    challengeTitle: "The challenge",
    client: "Client",
    startDate: "Date",
    duration: "Duration",
    tags: "Tags",
  },
  es: {
    detailsTitle: "Información general",
    challengeTitle: "El desafío",
    client: "Cliente",
    startDate: "Fecha",
    duration: "Duración",
    tags: "Tags",
  },
};

const partnerNameByKey = new Map(partners.map((partner) => [partner.key, partner.data.name]));

// Mesma formatacao do `formatDate` que a pagina usava antes do 10-04, com
// timeZone UTC para nao deslocar o dia em fuso negativo.
// `precision: "month"` rende mes por extenso + ano ("Maio de 2024") para os
// cases em que so a competencia e conhecida — pedido na revisao do case
// Baleias (RevisaoWeber_CaseBaleias.docx).
const formatCaseDate = (iso, locale, precision = "day") => {
  if (!iso) return "";
  try {
    const options =
      precision === "month"
        ? { month: "long", year: "numeric", timeZone: "UTC" }
        : { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" };
    const formatted = new Date(iso).toLocaleDateString(locale, options);
    // pt-BR/es devolvem o mes em minuscula ("maio de 2024"); o rotulo da ficha
    // e uma frase curta e comeca em maiuscula.
    return precision === "month"
      ? formatted.charAt(0).toUpperCase() + formatted.slice(1)
      : formatted;
  } catch {
    return String(iso);
  }
};

const joinTags = (raw) =>
  String(raw ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .join(", ");

// Uma figura declarada em `def.figures` vira um `case.figure-section` com alt e
// legenda do locale. `figureAssetKey` e consumido e removido por seed-import.
const figureBlock = (figure, locale) => ({
  __component: "case.figure-section",
  figureAssetKey: figure.assetKey,
  alt: figure[locale]?.alt ?? figure["pt-BR"]?.alt ?? "",
  caption: figure[locale]?.caption ?? figure["pt-BR"]?.caption ?? null,
});

const buildCaseSections = (def, locale) => {
  const localized = def[locale] ?? {};
  const labels = caseBlockLabels[locale] ?? caseBlockLabels["pt-BR"];
  const figures = def.figures ?? [];
  const blocks = [];

  const heroTitle = localized.heroTitle ?? localized.title;
  if (heroTitle) {
    blocks.push({
      __component: "case.hero-section",
      title: heroTitle,
      subtitle: localized.summary ?? null,
    });
  }

  const rows = [];
  // `client` pode ser sobrescrito por locale: nomes proprios (Instituto Aqualie)
  // ficam no nivel do def, mas descricoes de setor precisam ser traduzidas.
  const client = localized.client ?? def.client;
  if (client) rows.push({ label: labels.client, value: client });
  const startDate = formatCaseDate(def.startDate, locale, def.datePrecision);
  if (startDate) rows.push({ label: labels.startDate, value: startDate });
  if (localized.duration) rows.push({ label: labels.duration, value: localized.duration });
  const tags = joinTags(localized.tags);
  if (tags) rows.push({ label: labels.tags, value: tags });

  // O `logo` de cada slot e preenchido por seed-import a partir dos assetRefs;
  // o alt e o nome do parceiro (logo sem alt nao e renderizado no frontend).
  const partnerLogos = (def.projectLogoKeys ?? []).map((partnerKey) => ({
    alt: partnerNameByKey.get(partnerKey) ?? partnerKey,
    url: null,
  }));

  if (rows.length > 0 || partnerLogos.length > 0) {
    blocks.push({
      __component: "case.info-card",
      icon: "clipboard",
      title: labels.detailsTitle,
      rows,
      partnerLogos,
    });
  }

  if (localized.challenge) {
    blocks.push({
      __component: "case.info-card",
      icon: "target",
      title: labels.challengeTitle,
      body: localized.challenge,
      rows: [],
      partnerLogos: [],
    });
  }

  if (localized.leadTitle) {
    blocks.push({
      __component: "case.lead-section",
      title: `<p>${localized.leadTitle}</p>`,
      subtitle: localized.leadSubtitle ?? null,
    });
  }

  // Locale sem `sections` proprias herda a estrutura do pt-BR como placeholder, ate
  // o cliente enviar a traducao — antes o fallback era so um paragrafo corrido mais
  // as figuras soltas, o que deixava en/es visivelmente mais pobres que o pt-BR.
  // O corpo fica em portugues, mas tudo que JA existe traduzido continua vindo do
  // locale: hero, desafio, lead, alt e legenda das figuras, slug e SEO.
  const sectionSource = Array.isArray(localized.sections)
    ? localized.sections
    : def["pt-BR"]?.sections;

  if (Array.isArray(sectionSource)) {
    for (const block of sectionSource) {
      if (block.figureKey) {
        const figure = figures.find((item) => item.key === block.figureKey);
        if (figure) blocks.push(figureBlock(figure, locale));
        continue;
      }
      // Sub-blocos do painel: `figureKey` resolve alt/legenda do locale, igual ao
      // figure-section, para a figura poder ficar dentro do painel colapsavel.
      if (block.__component === "case.panel-section" && Array.isArray(block.blocks)) {
        blocks.push({
          ...block,
          blocks: block.blocks.map((sub) => {
            if (!sub.figureKey) return sub;
            const figure = figures.find((item) => item.key === sub.figureKey);
            const { figureKey, ...rest } = sub;
            if (!figure) return rest;
            return {
              ...rest,
              figureAssetKey: figure.assetKey,
              alt: figure[locale]?.alt ?? figure["pt-BR"]?.alt ?? "",
              caption: sub.caption ?? figure[locale]?.caption ?? figure["pt-BR"]?.caption ?? null,
            };
          }),
        });
        continue;
      }
      blocks.push(block);
    }
    return blocks;
  }

  // Ultimo recurso: case sem `sections` em nenhum locale (nenhum hoje).
  if (localized.body) blocks.push({ __component: "case.text-section", body: localized.body });
  for (const figure of figures) blocks.push(figureBlock(figure, locale));

  return blocks;
};

const caseStudyDefs = [
  {
    key: "monitoramento-acustico-de-cetaceos",
    documentId: "heyjvuo6793hbue6p3ehulk5",
    sectorCategory: "meio-ambiente",
    applicationAreaKeys: ["meio-ambiente", "cabos-submarinos"],
    coverAssetKey: "case-cover-baleias",
    heroAssetKey: "case-hero-oceano",
    // Cliente e data corrigidos na revisao (RevisaoWeber_CaseBaleias.docx): o
    // contrato e com o Instituto Aqualie, e a competencia e maio/2024.
    client: "Petrobras",
    startDate: "2024-05-01",
    datePrecision: "month",
    projectLogoKeys: ["petrobras", "immer-messen", "instituto-aqualie"],
    // Figuras de resources/Cases_Imagens (10-ASSETS-DECISION.md).
    // O alt descreve o que a figura MOSTRA — nao repete a legenda; mapa e
    // espectrograma sao figuras tecnicas e precisam do conteudo descrito.
    figures: [
      {
        key: "baleia",
        assetKey: "case-fig-baleia",
        "pt-BR": {
          alt: "Baleia-jubarte adulta nadando sob a superfície do mar, vista de lado, com as longas nadadeiras peitorais claras estendidas.",
          caption: "Baleias-jubarte se comunicam por vocalizações de baixa frequência ao longo de toda a costa brasileira.",
        },
        en: {
          alt: "An adult humpback whale swimming below the sea surface, seen from the side, with its long pale pectoral fins extended.",
          caption: "Humpback whales communicate through low-frequency vocalisations along the entire Brazilian coast.",
        },
        es: {
          alt: "Ballena jorobada adulta nadando bajo la superficie del mar, vista de lado, con las largas aletas pectorales claras extendidas.",
          caption: "Las ballenas jorobadas se comunican mediante vocalizaciones de baja frecuencia a lo largo de toda la costa brasileña.",
        },
      },
      {
        key: "mapa-campos",
        assetKey: "case-fig-mapa-campos",
        "pt-BR": {
          alt: "Mapa da Bacia de Campos, no litoral do Rio de Janeiro, marcando o traçado do cabo monitorado por DAS a partir de Barra do Furado e, mais ao norte, a área dos sensores sísmicos PRM no Campo de Jubarte.",
          caption: "Fonte: Andriolo et al. (2026).",
        },
        en: {
          alt: "Map of the Campos Basin off the coast of Rio de Janeiro, marking the route of the DAS-monitored cable running from Barra do Furado and, further north, the area of the PRM seismic sensors at the Jubarte Field.",
          caption: "Source: Andriolo et al. (2026).",
        },
        es: {
          alt: "Mapa de la Cuenca de Campos, en el litoral de Río de Janeiro, que marca el trazado del cable monitoreado por DAS desde Barra do Furado y, más al norte, el área de los sensores sísmicos PRM en el Campo de Jubarte.",
          caption: "Fuente: Andriolo et al. (2026).",
        },
      },
      {
        key: "espectrograma",
        assetKey: "case-fig-espectrograma",
        "pt-BR": {
          alt: "Espectrograma em cascata do sinal DAS: distância ao longo do cabo no eixo horizontal, tempo no vertical e energia acústica em escala de cor, com padrões em forma de V concentrados nas frequências baixas.",
          caption: "Fonte: Andriolo et al. (2026).",
        },
        en: {
          alt: "Waterfall spectrogram of the DAS signal: distance along the cable on the horizontal axis, time on the vertical axis and acoustic energy on a colour scale, with V-shaped patterns concentrated in the low frequencies.",
          caption: "Source: Andriolo et al. (2026).",
        },
        es: {
          alt: "Espectrograma en cascada de la señal DAS: distancia a lo largo del cable en el eje horizontal, tiempo en el vertical y energía acústica en escala de color, con patrones en forma de V concentrados en las frecuencias bajas.",
          caption: "Fuente: Andriolo et al. (2026).",
        },
      },
      {
        key: "embarcacoes",
        assetKey: "case-fig-embarcacoes",
        "pt-BR": {
          alt: "Registro DAS do trecho de 30 a 37 km do cabo: distância no eixo vertical, tempo no horizontal e intensidade em escala de cor, com uma sequência de padrões hiperbólicos brilhantes concentrada em torno de 33,5 km.",
          caption: "Padrões hiperbólicos característicos de ruído de embarcação; a intensidade cresce com a aproximação sobre o cabo. Fonte: Andriolo et al. (2026).",
        },
        en: {
          alt: "DAS record of the 30 to 37 km section of the cable: distance on the vertical axis, time on the horizontal axis and intensity on a colour scale, with a sequence of bright hyperbolic patterns concentrated around 33.5 km.",
          caption: "Hyperbolic patterns characteristic of vessel noise; intensity rises as the vessel approaches the cable. Source: Andriolo et al. (2026).",
        },
        es: {
          alt: "Registro DAS del tramo de 30 a 37 km del cable: distancia en el eje vertical, tiempo en el horizontal e intensidad en escala de color, con una secuencia de patrones hiperbólicos brillantes concentrada en torno a 33,5 km.",
          caption: "Patrones hiperbólicos característicos de ruido de embarcación; la intensidad crece con la aproximación sobre el cable. Fuente: Andriolo et al. (2026).",
        },
      },
      {
        key: "processos-oceanicos",
        assetKey: "case-fig-processos-oceanicos",
        "pt-BR": {
          alt: "Registro DAS da seção costeira do cabo com faixas diagonais periódicas propagando-se do mar para a costa, um detalhe ampliado da transição espacial e, ao lado, uma foto da arrebentação na praia.",
          caption: "Padrões de ondas de superfície propagando-se para a costa; o detalhe evidencia a dinâmica de arrebentação. Fonte: Andriolo et al. (2026).",
        },
        en: {
          alt: "DAS record of the coastal section of the cable showing periodic diagonal bands travelling from the sea towards the shore, a zoomed detail of the spatial transition and, beside it, a photograph of waves breaking on the beach.",
          caption: "Surface wave patterns travelling shoreward; the inset highlights the surf zone dynamics. Source: Andriolo et al. (2026).",
        },
        es: {
          alt: "Registro DAS de la sección costera del cable con franjas diagonales periódicas propagándose del mar hacia la costa, un detalle ampliado de la transición espacial y, al lado, una foto de la rompiente en la playa.",
          caption: "Patrones de ondas de superficie propagándose hacia la costa; el detalle evidencia la dinámica de rompiente. Fuente: Andriolo et al. (2026).",
        },
      },
    ],
    "pt-BR": {
      heroTitle: "Ouvindo o oceano",
      challenge: "<p>O monitoramento acústico tradicional enfrenta limitações conhecidas em ambientes offshore: hidrofones e redes de sensores fixos têm custo elevado de instalação e manutenção, cobertura espacial restrita e logística complexa em águas profundas. Ampliar a escala e a continuidade da coleta de dados sem multiplicar essa infraestrutura é um dos principais gargalos da bioacústica marinha atual — especialmente em um litoral tão extenso e biodiverso quanto o brasileiro, onde nove das quinze espécies de baleias catalogadas mundialmente já foram registradas.</p>",
      leadTitle: "Ouvir o oceano em tempo real sem alterar a infraestrutura submarina.",
      leadSubtitle: "Como a tecnologia DAS e inteligência artificial revolucionam a bioacústica marinha.",
      sections: [
        { __component: "case.text-section", body: "<p>A Petrobras realiza monitoramento contínuo de populações de espécies marinhas ao longo de suas áreas de operação, buscando compreender e mitigar eventuais impactos ambientais de suas atividades. Como parte desse compromisso, a empresa é uma das maiores patrocinadoras de programas de proteção da biodiversidade marinha no Brasil. Um dos principais focos desse esforço é o ambiente acústico submarino: cetáceos — baleias e golfinhos — dependem do som para se comunicar, navegar e se reproduzir, o que os torna particularmente sensíveis a ruídos de origem antrópica, como os gerados por campanhas de prospecção sísmica.</p><p>Para acompanhar esse impacto, a Petrobras conta com o Instituto Aqualie, uma das principais autoridades mundiais em bioacústica marinha, responsável por um dos mais longevos programas de monitoramento acústico passivo do Atlântico Sul. O Instituto combina diferentes tecnologias — hidrofones, tags acústicas, avistamentos visuais e acompanhamento populacional — para mapear a presença, o comportamento e a distribuição sazonal de cetáceos ao longo da costa brasileira.</p>" },
        { __component: "case.highlight-section", variant: "opening", eyebrow: "A solução", heading: "Fibra óptica como sensor acústico", body: "<p><b>Desde 2024, o Instituto Aqualie contratou a Immer Messen para desenvolver uma abordagem inédita no Brasil:</b> transformar cabos de telecomunicações submarinos já instalados pela Petrobras em sensores acústicos contínuos, por meio da tecnologia de Sensoriamento Distribuído a Fibra Óptica (DFOS), especificamente na modalidade DAS (Distributed Acoustic Sensing).</p>" },
        { __component: "case.text-section", body: "<p>O princípio é direto: fibras ópticas ociosas dentro de um cabo de telecomunicações — que não carregam tráfego de dados — podem ser interrogadas por um equipamento instalado em terra, capaz de detectar nanodeformações ao longo de toda a extensão do cabo. Cada metro de fibra se torna, na prática, um ponto de escuta. Não é necessário qualquer intervenção física na infraestrutura submarina existente.</p>" },
        { figureKey: "mapa-campos" },
        { __component: "case.text-section", body: "<p>O projeto também se apoia, de forma complementar, em dados históricos de Permanent Reservoir Monitoring (PRM) — sensores sísmicos originalmente instalados pela Petrobras no Campo de Jubarte para monitoramento de reservatório — reaproveitados pelo Instituto Aqualie para confirmar a ocorrência sazonal de baleias-jubarte, baleias-fin e baleias-sei na Bacia de Campos.</p><p>Após uma fase de testes laboratoriais em 2024 — que validou a sensibilidade do sistema a sons de baixa frequência e calibrou parâmetros como tensão do cabo e comprimento de gauge —, a Immer Messen instalou seu sistema de interrogação em uma estação de telecomunicações em Barra do Furado (RJ), monitorando um cabo submarino de mais de <b>110 km de extensão</b> na Bacia de Campos.</p>" },
        { __component: "case.section-title", title: "Inteligência artificial na detecção de anomalias" },
        { __component: "case.two-column-section", leftBody: "<p>O volume de dados gerado por um sistema DAS operando continuamente sobre uma centena de quilômetros de cabo é da ordem de dezenas de terabytes por campanha — inviável para inspeção manual. Para lidar com essa escala, a Immer Messen desenvolve, desde 2020, um algoritmo próprio de detecção automática de anomalias, baseado na análise da densidade espectral de potência (PSD) do sinal em cada ponto do cabo, ao longo de janelas temporais definidas. O algoritmo varre o conjunto de dados no espaço e no tempo, identificando variações abruptas de energia em faixas de frequência específicas e gerando um catálogo de eventos — cada um associado a posição, horário e assinatura espectral — posteriormente validado por especialistas do Instituto Aqualie.</p>", pullQuote: "hoje, o monitoramento funciona em tempo real", rightBody: "<p>Essa camada de inteligência artificial é o que torna o sistema operacionalmente viável: permitindo que biólogos do Instituto Aqualie, a partir de sua sede em Juiz de Fora, Minas Gerais, acompanhem remotamente a presença de baleias ao redor dos cabos de telecomunicações da Petrobras — sem necessidade de embarcações, equipes em campo ou deslocamento até o litoral.</p>" },
        { figureKey: "espectrograma" },
        { __component: "case.panel-section", icon: "bar_chart", defaultOpen: true, title: "Resultados", body: "<p>As campanhas de campo confirmaram a viabilidade da tecnologia para bioacústica em escala real. Em uma medição realizada a cerca de <b>21 km da costa</b>, o sistema identificou 17 vocalizações distintas em uma janela de apenas 90 segundos, com padrões espectrais na faixa de <b>40 a 120 Hz</b> — consistentes com vocalizações de baleias-fin. Os sinais aparecem nos dados como padrões característicos em forma de &quot;V&quot;, resultado da propagação da onda acústica ao longo do cabo, o que permite não apenas detectar, mas também localizar a origem do som com precisão de poucos metros.</p>", blocks: [
          { heading: "Embarcações", body: "<p>A mesma infraestrutura e o mesmo pipeline de detecção demonstraram sensibilidade a outras classes de sinais relevantes para operações offshore. No trecho de 30 a 37 km (a cerca de 33,5 km da costa), o sistema registrou padrões hiperbólicos sequenciais característicos de ruído de embarcação. A atenuação observada junto ao ápice de cada padrão relaciona-se à geometria entre o movimento da embarcação e o cabo: a intensidade aumenta à medida que a embarcação se aproxima da fibra e diminui quando se afasta. A evolução temporal dessas chegadas permite inferir a direção de movimento e, integrada a dados de AIS, estimar a trajetória da embarcação.</p>", figureKey: "embarcacoes" },
          { heading: "Processos oceânicos e zona de arrebentação", body: "<p>Na seção costeira, onde o cabo entra no mar, o mesmo conjunto de dados capturou com clareza processos oceânicos de grande escala. Com filtragem passa-alta em 0,01 Hz, evidenciaram-se padrões lentos e periódicos propagando-se do mar em direção à costa, atribuídos à modulação da pressão hidrostática por ondas de gravidade de superfície sobre a fibra enterrada. Ajustando o corte para 5 Hz, esses padrões terminam abruptamente em uma transição espacial específica, a partir da qual emergem oscilações mecânicas de mais alta frequência associadas à dinâmica de arrebentação na interface areia–mar. Essa resposta espectral e espacialmente ampla — de processos oceânicos de baixa frequência a emissões acústicas de mais alta frequência — evidencia a versatilidade do DAS como sensor ambiental.</p>", figureKey: "processos-oceanicos" },
          { body: "<p>Essa característica é central para o valor da solução — a especificidade da detecção está no software, não no hardware, o que permite calibrar o mesmo sistema físico para diferentes finalidades de monitoramento.</p>" },
        ] },
        { __component: "case.section-title", title: "Impacto e próximos passos" },
        { __component: "case.text-section", body: "<p>Os resultados devem contribuir diretamente para o entendimento científico dos padrões migratórios de cetáceos no litoral brasileiro. Espécies como a baleia-jubarte utilizam o corredor entre o Atlântico Sul e o litoral nordestino durante a temporada reprodutiva, e dados contínuos como os gerados pelo sistema DAS vão ajudar o Instituto Aqualie a refinar estimativas populacionais e identificar quais espécies transitam por diferentes trechos da costa ao longo do ano — informação essencial para orientar o planejamento de campanhas sísmicas com menor impacto ambiental.</p><p>A parceria entre Immer Messen, Instituto Aqualie e Petrobras segue em desenvolvimento, com o objetivo de expandir a cobertura geográfica do monitoramento e aprimorar os modelos de classificação automática por espécie ao longo dos próximos anos.</p>" },
        { __component: "case.highlight-section", variant: "closing", heading: "O projeto é reconhecido como o primeiro monitoramento de baleias por DAS realizado no Atlântico Sul", body: "<p>Isso consolida a Immer Messen como <b>referência em soluções de monitoramento acústico</b> distribuído para ambientes offshore — uma capacidade que se estende, com a mesma base tecnológica, a aplicações como segurança de ativos submarinos, detecção de intrusão em dutos e cabos, e monitoramento estrutural de infraestrutura crítica.</p>" },
        { __component: "case.text-section", body: "<p>Os resultados descritos neste case estão documentados em capítulo de livro revisado por pares, de acesso aberto:</p><p>ANDRIOLO, A.; MARCON, E. H.; DE CASTRO, F. R.; RODRIGUES, G. M.; MIRANDA, G. A.; VIANA, Y.; GOLODNE, P. M.; POEYS, R. A. C.; SILVA, A. A. C.; AMORIM, T. O. S.; DJOKIC, D.; PIZZORNO, J. L. A. Permanent Reservoir Monitoring (PRM) and Distributed Acoustic Sensing (DAS) as Advanced Technologies for Maximizing the Acquisition of Acoustic Environmental Information. In: POPPER, A. N. et al. (eds.). <i>The Effects of Noise on Aquatic Life IV</i>. Cham: Springer, 2026. DOI: <a href=\"https://doi.org/10.1007/978-3-031-94229-7_225-1\" rel=\"noopener\" target=\"_blank\">10.1007/978-3-031-94229-7_225-1</a>.</p>" },
      ],
      slug: "monitoramento-de-baleias",
      title: "Monitoramento de baleias",
      summary: "Monitoramento de Cetáceos com Sensoriamento Distribuído a Fibra Óptica",
      duration: "3 meses",
      tags: "offshore, integridade de dutos, DAS, P&D",
      body: "<p>Usando a fibra óptica instalada como sensor distribuído, o sistema identifica padrões acústicos característicos de diferentes espécies de cetáceos. As detecções alimentam um protocolo de mitigação que aciona pausas operacionais automáticas durante atividades sísmicas em áreas de presença confirmada.</p><p>O projeto combinou catalogação acústica, classificação por algoritmos próprios e estruturação de alertas para o time técnico — entregando maior cobertura observacional e consolidação de referência técnica para aplicações ambientais offshore.</p>",
      seoTitle: "Monitoramento acústico de cetáceos",
      seoDescription: "Case ambiental com uso de DAS para fauna marinha.",
    },
    en: {
      heroTitle: "Listening to the ocean",
      challenge: "<p>Traditional acoustic monitoring faces well-known limits offshore: hydrophones and fixed sensor arrays are costly to install and maintain, cover a restricted area and demand complex logistics in deep water. Scaling up data collection without multiplying that infrastructure is one of the main bottlenecks in marine bioacoustics today — especially along a coastline as long and biodiverse as Brazil's, where nine of the fifteen whale species catalogued worldwide have already been recorded.</p>",
      leadTitle: "Listening to the ocean in real time without touching the subsea infrastructure.",
      leadSubtitle: "How DAS technology and artificial intelligence are reshaping marine bioacoustics.",
      slug: "monitoramento-acustico-de-cetaceos",
      title: "Acoustic monitoring of cetaceans",
      summary: "Cetacean Monitoring with Distributed Fibre Optic Sensing",
      duration: "3 months",
      tags: "offshore, pipeline integrity, DAS, R&D",
      body: "<p>Using installed optical fiber as a distributed sensor, the system identifies acoustic patterns characteristic of different cetacean species. Detections feed a mitigation protocol that automatically triggers operational pauses during seismic activity in areas of confirmed presence.</p><p>The project combined acoustic cataloging, classification by proprietary algorithms and alert structuring for the technical team — delivering greater observational coverage and a consolidated technical reference for offshore environmental applications.</p>",
      seoTitle: "Acoustic monitoring of cetaceans",
      seoDescription: "Environmental case using DAS for marine fauna.",
    },
    es: {
      heroTitle: "Escuchando el océano",
      challenge: "<p>El monitoreo acústico tradicional enfrenta límites conocidos en ambientes offshore: hidrófonos y redes de sensores fijos tienen alto costo de instalación y mantenimiento, cobertura espacial restringida y logística compleja en aguas profundas. Ampliar la escala de la recolección de datos sin multiplicar esa infraestructura es uno de los principales cuellos de botella de la bioacústica marina actual — especialmente en un litoral tan extenso y biodiverso como el brasileño, donde nueve de las quince especies de ballenas catalogadas en el mundo ya fueron registradas.</p>",
      leadTitle: "Escuchar el océano en tiempo real sin alterar la infraestructura submarina.",
      leadSubtitle: "Cómo la tecnología DAS y la inteligencia artificial revolucionan la bioacústica marina.",
      slug: "monitoramento-acustico-de-cetaceos",
      title: "Monitoreo acústico de cetáceos",
      summary: "Monitoreo de Cetáceos con Sensado Distribuido por Fibra Óptica",
      duration: "3 meses",
      tags: "offshore, integridad de ductos, DAS, I+D",
      body: "<p>Usando la fibra óptica instalada como sensor distribuido, el sistema identifica patrones acústicos característicos de diferentes especies de cetáceos. Las detecciones alimentan un protocolo de mitigación que activa pausas operativas automáticas durante actividades sísmicas en áreas de presencia confirmada.</p><p>El proyecto combinó catalogación acústica, clasificación por algoritmos propios y estructuración de alertas para el equipo técnico — entregando mayor cobertura observacional y consolidación de una referencia técnica para aplicaciones ambientales offshore.</p>",
      seoTitle: "Monitoreo acústico de cetáceos",
      seoDescription: "Caso ambiental con uso de DAS para fauna marina.",
    },
  },
  {
    key: "monitoramento-de-gasodutos-onshore",
    documentId: "c07mowtisq6wm8vuezg2tyzb",
    sectorCategory: "oleo-e-gas",
    applicationAreaKeys: ["derivacao-clandestina", "seguranca-patrimonial"],
    coverAssetKey: "case-cover-gasodutos-onshore",
    heroAssetKey: "case-cover-gasodutos-onshore",
    client: "Transporte de Gás Natural / Brasil",
    startDate: "2024-06-01",
    datePrecision: "month",
    projectLogoKeys: ["immer-messen"],
    figures: [
      {
        key: "dutos-sinais",
        assetKey: "case-fig-dutos-sinais",
        "pt-BR": {
          alt: "Três registros DAS empilhados e rotulados I, II e III, cada um com a janela de detecção destacada e a classe atribuída pelo algoritmo: pessoa, veículo leve e escavadeira.",
          caption: "Fonte: Imagem I.: Identificação automática de passos humanos em torno do ativo monitorado; Imagem II.: Identificação automática de veículo leve trafegando próximo ao ativo monitorado; Imagem III. Identificação automática de escavadeira operando próximo ao ativo monitorado",
        },
        en: {
          alt: "Three stacked DAS records labelled I, II and III, each with the detection window highlighted and the class assigned by the algorithm: person, light vehicle and excavator.",
          caption: "Source: Image I: automatic identification of human footsteps around the monitored asset; Image II: automatic identification of a light vehicle travelling near the monitored asset; Image III: automatic identification of an excavator operating near the monitored asset",
        },
        es: {
          alt: "Tres registros DAS apilados y rotulados I, II y III, cada uno con la ventana de detección destacada y la clase asignada por el algoritmo: persona, vehículo ligero y excavadora.",
          caption: "Fuente: Imagen I: identificación automática de pasos humanos en torno al activo monitoreado; Imagen II: identificación automática de vehículo ligero circulando cerca del activo monitoreado; Imagen III: identificación automática de excavadora operando cerca del activo monitoreado",
        },
      },
      {
        key: "dutos-dashboard",
        assetKey: "case-fig-dutos-dashboard",
        "pt-BR": {
          alt: "Painel de eventos do sistema sobre imagem de satélite do trecho monitorado, com o traçado do duto destacado, e um celular em primeiro plano exibindo a sequência de alertas de escavação recebidos por SMS.",
          caption: "Fonte: Exemplo de alerta enviado via SMS para cliente após identificação de escavação ao longo do trecho monitorado",
        },
        en: {
          alt: "System event dashboard over a satellite view of the monitored section, with the pipeline route highlighted, and a phone in the foreground showing the sequence of digging alerts received by SMS.",
          caption: "Source: Example of an SMS alert sent to the client after digging was identified along the monitored section",
        },
        es: {
          alt: "Panel de eventos del sistema sobre una imagen satelital del tramo monitoreado, con el trazado del ducto destacado, y un teléfono en primer plano que muestra la secuencia de alertas de excavación recibidas por SMS.",
          caption: "Fuente: Ejemplo de alerta enviada por SMS al cliente tras identificar una excavación a lo largo del tramo monitoreado",
        },
      },
    ],
    "pt-BR": {
      heroTitle: "Monitoramento Inteligente de Dutos por Fibra Óptica",
      challenge: "<p>Grandes operadoras de infraestrutura de transporte de gás natural enfrentam um desafio permanente: monitorar extensos trechos de dutos em áreas remotas, muitas vezes de difícil acesso, contra ameaças que vão desde invasões e vandalismo até interferências involuntárias causadas por máquinas e veículos próximos à faixa de segurança — ou, no cenário mais crítico, tentativas deliberadas de perfuração do duto.</p><p>Os métodos convencionais de monitoramento — patrulhamento físico, câmeras pontuais e inspeções periódicas — não oferecem cobertura contínua nem capacidade de resposta imediata. O tempo entre o evento e a detecção pode ser fatal para a integridade do sistema e para a segurança das comunidades no entorno.</p>",
      sections: [
        { __component: "case.highlight-section", variant: "opening", eyebrow: "A solução", heading: "Máxima precisão sem infraestrutura complexa", body: "<p>Uma grande transportadora de gás natural do Brasil contratou a Immer Messen para um projeto de monitoramento contínuo e autônomo de um trecho de gasoduto por meio de tecnologia DFOS — Distributed Fiber Optic Sensing — combinada com Inteligência Artificial.</p>" },
        { __component: "case.text-section", body: "<p>Utilizando um cabo de fibra óptica de telecomunicações comum instalado ao longo do duto, o sistema DATS da Immer Messen transformou a fibra em uma rede densa de sensores acústicos distribuídos, capaz de detectar qualquer perturbação ao longo de toda a extensão monitorada — sem equipamentos adicionais em campo, sem intervenção humana contínua e sem obras de infraestrutura complexas.</p>" },
        { __component: "case.section-title", title: "Como funciona" },
        { __component: "case.text-section", body: "<p>O interrogador óptico DATS envia pulsos de luz pela fibra e analisa os sinais refletidos com resolução espacial de 3 metros. Qualquer evento acústico ou vibração mecânica ao longo do duto — seja um passo humano, a passagem de um veículo ou a vibração de uma escavadeira — altera o padrão do sinal de forma característica. <b>Os algoritmos de IA da Immer Messen processam essas variações em tempo real e classificam automaticamente cada evento detectado.</b></p><p>O operador acompanha tudo remotamente, de sua sala de controle, a mais de 200 km de distância do trecho monitorado.</p>" },
        { __component: "case.panel-section", icon: "bar_chart", defaultOpen: true, title: "Resultados", body: "<p>Durante semanas de operação autônoma e contínua, o sistema DATS demonstrou ótimo desempenho em todos os cenários testados. Eventos simulados às cegas foram realizados ao longo do trecho monitorado, sem que a equipe de operação soubesse o tipo, o local ou o momento de cada ocorrência. O sistema detecta as anomalias, e classifica em eventos através das classes:</p><ul><li>Pessoa caminhando na faixa (exemplo de sinal I.)</li><li>Motocicleta</li><li>Veículo leve (exemplo de sinal II.)</li><li>Veículo pesado</li><li>Escavadeira em operação (exemplo de sinal III.)</li><li>Perfuração do duto</li><li>Animais (gado transitando no pasto adjacente)</li></ul><p><b>Todos os alertas foram disparados e enviados por SMS à equipe de operação em menos de 1 minuto após o evento — sem qualquer supervisão local.</b></p>", blocks: [
          { body: "<p>Algumas amostras de sinais de detecção e classificação automática são apresentadas abaixo.</p><p>I, Pessoa caminhando na faixa: sinais explícitos revelam os passos e o deslocamento da pessoa nas imediações do cabo óptico;</p><p>II. Veículo leve: padrões mecânicos mais intensos se espalhando pelo espaço-tempo cujos apex revelam o deslocamento espacial com velocidade superior e sob intensidades variáveis – associadas ao relevo irregular da região;</p><p>III. Escavadeira: sinal sob três tipos de padrão revelam estágios de operação distintos. No início os sinais são associados a escavações de fato, com a ação periódica que cria padrões mecânicos intensos que se espalham pelo espaço. No segundo estágio nota-se um comportamento constante com padrões de mais alta frequência dominantes, associados somente à máquina escavadeira ligada, porém parada. No terceiro estágio então sinais mecânicos mais intensos com deslocamento espacial-temporal revelam a movimentação da escavadeira.</p>", figureKey: "dutos-sinais" },
        ] },
        { __component: "case.section-title", title: "Diferenciais técnicos" },
        { __component: "case.text-section", body: "<ul><li>Monitoramento contínuo 24/7, sem supervisão em campo</li><li>Classificação automática de eventos por IA — não apenas detecção, mas identificação do tipo de ameaça</li><li>Alertas em tempo real via SMS em menos de 1 minuto</li><li>Acompanhamento remoto em sala de controle a centenas de quilômetros do ponto monitorado</li><li>Operação sobre fibra óptica de telecomunicações comum — sem sensores pontuais adicionais</li><li>Resolução espacial de 3 metros ao longo de todo o trecho monitorado</li></ul>" },
        { figureKey: "dutos-dashboard" },
        { __component: "case.highlight-section", variant: "closing", heading: "Conclusão: Tecnologia DFOS e IA elevam a segurança de dutos a um novo patamar", body: "<p>O projeto demonstrou que a tecnologia DFOS da Immer Messen, combinada com algoritmos proprietários de IA, é capaz de transformar a fibra óptica já disponível em infraestruturas de dutos em um sistema robusto, autônomo e preciso de monitoramento de segurança — <b>entregando ao operador uma visibilidade em tempo real que os métodos convencionais simplesmente não oferecem.</b></p>" },
      ],
      slug: "monitoramento-inteligente-de-dutos",
      title: "Monitoramento Inteligente de Dutos por Fibra Óptica",
      summary: "Detecção de Anomalias em Tempo Real",
      duration: "3 meses",
      tags: "DFOS, Fibra Óptica, Monitoramento de Dutos, Detecção de Anomalias, Inteligência Artificial, Machine Learning, Segurança de Dutos, Pipelines, Monitoramento em Tempo Real, Oil & Gas",
      body: "<p>Utilizando um cabo de fibra óptica de telecomunicações comum instalado ao longo do duto, o sistema DATS transformou a fibra em uma rede densa de sensores acústicos distribuídos, com resolução espacial de 3 metros e sem qualquer equipamento adicional em campo.</p><p>Os algoritmos de IA classificam automaticamente cada evento detectado — pessoa, motocicleta, veículo leve, veículo pesado, escavadeira, perfuração do duto e animais — e disparam alertas por SMS em menos de 1 minuto, acompanhados remotamente de uma sala de controle a mais de 200 km do trecho monitorado.</p>",
      seoTitle: "Monitoramento inteligente de dutos por fibra óptica",
      seoDescription: "Case de detecção e classificação automática de anomalias em gasoduto onshore com DAS e IA.",
    },
    en: {
      client: "Natural Gas Transmission / Brazil",
      heroTitle: "Intelligent Pipeline Monitoring with Optical Fibre",
      challenge: "<p>Large natural gas transmission operators face a permanent challenge: monitoring long pipeline sections in remote, often hard-to-reach areas against threats ranging from intrusion and vandalism to unintentional interference from machinery and vehicles near the right of way — or, in the most critical scenario, deliberate attempts to drill into the pipeline.</p><p>Conventional monitoring methods — foot patrols, fixed cameras and periodic inspections — offer neither continuous coverage nor immediate response. The time between event and detection can be fatal to the integrity of the system and to the safety of surrounding communities.</p>",
      slug: "monitoramento-de-gasodutos-onshore",
      title: "Intelligent Pipeline Monitoring with Optical Fibre",
      summary: "Real-Time Anomaly Detection",
      duration: "3 months",
      tags: "DFOS, Optical Fibre, Pipeline Monitoring, Anomaly Detection, Artificial Intelligence, Machine Learning, Pipeline Security, Pipelines, Real-Time Monitoring, Oil & Gas",
      body: "<p>Using an ordinary telecom optical fibre cable installed along the pipeline, the DATS system turned the fibre into a dense array of distributed acoustic sensors, with 3-metre spatial resolution and no additional equipment in the field.</p><p>AI algorithms automatically classify every detected event — person, motorcycle, light vehicle, heavy vehicle, excavator, pipeline drilling and livestock — and trigger SMS alerts in under a minute, monitored remotely from a control room more than 200 km from the section under surveillance.</p>",
      seoTitle: "Intelligent pipeline monitoring with optical fibre",
      seoDescription: "Case on automatic detection and classification of anomalies on an onshore gas pipeline with DAS and AI.",
    },
    es: {
      client: "Transporte de Gas Natural / Brasil",
      heroTitle: "Monitoreo Inteligente de Ductos por Fibra Óptica",
      challenge: "<p>Las grandes operadoras de infraestructura de transporte de gas natural enfrentan un desafío permanente: monitorear extensos tramos de ductos en áreas remotas, muchas veces de difícil acceso, contra amenazas que van desde invasiones y vandalismo hasta interferencias involuntarias causadas por máquinas y vehículos próximos a la franja de seguridad — o, en el escenario más crítico, intentos deliberados de perforación del ducto.</p><p>Los métodos convencionales de monitoreo — patrullaje físico, cámaras puntuales e inspecciones periódicas — no ofrecen cobertura continua ni capacidad de respuesta inmediata. El tiempo entre el evento y la detección puede ser fatal para la integridad del sistema y para la seguridad de las comunidades del entorno.</p>",
      slug: "monitoramento-de-gasodutos-onshore",
      title: "Monitoreo Inteligente de Ductos por Fibra Óptica",
      summary: "Detección de Anomalías en Tiempo Real",
      duration: "3 meses",
      tags: "DFOS, Fibra Óptica, Monitoreo de Ductos, Detección de Anomalías, Inteligencia Artificial, Machine Learning, Seguridad de Ductos, Pipelines, Monitoreo en Tiempo Real, Oil & Gas",
      body: "<p>Utilizando un cable de fibra óptica de telecomunicaciones común instalado a lo largo del ducto, el sistema DATS transformó la fibra en una red densa de sensores acústicos distribuidos, con resolución espacial de 3 metros y sin ningún equipo adicional en campo.</p><p>Los algoritmos de IA clasifican automáticamente cada evento detectado — persona, motocicleta, vehículo ligero, vehículo pesado, excavadora, perforación del ducto y animales — y disparan alertas por SMS en menos de 1 minuto, monitoreados remotamente desde una sala de control a más de 200 km del tramo vigilado.</p>",
      seoTitle: "Monitoreo inteligente de ductos por fibra óptica",
      seoDescription: "Caso de detección y clasificación automática de anomalías en gasoducto onshore con DAS e IA.",
    },
  },
];

const caseStudies = caseStudyDefs.flatMap((def) =>
  locales.map((locale) => {
    const sections = buildCaseSections(def, locale);

    // Os assetRefs sao derivados dos blocos ja montados: seed-import consome a
    // fila por `usage` na ordem em que os blocos aparecem, entao a ordem aqui
    // precisa ser exatamente a ordem dos blocos.
    const heroRefs = sections.some((block) => block.__component === "case.hero-section")
      ? [{ assetKey: def.heroAssetKey ?? "case-hero-offshore", usage: "case.hero-section.media" }]
      : [];
    const logoRefs = sections
      .filter((block) => block.__component === "case.info-card")
      .flatMap((block) => block.partnerLogos ?? [])
      .map((_, index) => ({
        assetKey: `partner-${(def.projectLogoKeys ?? [])[index]}`,
        usage: "case.info-card.partnerLogos",
      }));
    const figureRefs = sections
      .filter((block) => block.__component === "case.figure-section")
      .map((block) => ({ assetKey: block.figureAssetKey, usage: "case.figure-section.image" }));
    // Figuras dentro do painel colapsavel (case.panel-block). Usage proprio, entao
    // formam uma fila separada da dos figure-section — so a ordem entre si importa.
    const panelFigureRefs = sections
      .filter((block) => block.__component === "case.panel-section")
      .flatMap((block) =>
        (block.blocks ?? [])
          .filter((sub) => sub.figureAssetKey)
          .map((sub) => ({ assetKey: sub.figureAssetKey, usage: "case.panel-section.blocks.image" }))
      );

    return {
      key: def.key,
      documentId: def.documentId,
      locale,
      // Apenas os campos de metadado que permanecem no content type (D-04);
      // todo o corpo vive em `sections` (D-03).
      data: {
        title: def[locale].title,
        slug: def[locale].slug,
        summary: def[locale].summary,
        sectorCategory: def.sectorCategory,
        sections,
        seo: seo(
          def[locale].seoTitle,
          def[locale].seoDescription,
          `https://www.immermessen.com/${locale}/cases/${def[locale].slug}`
        ),
      },
      relationRefs: {
        applicationAreaKeys: def.applicationAreaKeys,
      },
      assetRefs: [
        { assetKey: def.coverAssetKey, usage: "case-study.coverImage", status: "placeholder-external" },
        ...heroRefs,
        ...logoRefs,
        ...figureRefs,
        ...panelFigureRefs,
      ],
    };
  })
);

const slugByPageKey = {
  home: { "pt-BR": "home", en: "home", es: "inicio" },
  technology: { "pt-BR": "tecnologia", en: "technology", es: "tecnologia" },
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
      { assetKey: "about-fiber-bg", usage: "page.about-content-block.background" },
      { assetKey: "contact-fiber-bg", usage: "page.contact-form-block.background" },
    ],
    "pt-BR": {
      title: "Home",
      summary: "Página inicial institucional da Immer Messen com hero, tecnologia, soluções, áreas, cases, notícias e contato.",
      seoTitle: "Immer Messen",
      seoDescription: "Transformamos fibra óptica em sistemas inteligentes para infraestrutura crítica.",
      blocks: (locale) => [
        heroBlock(
          "Transformamos fibras ópticas em sistemas inteligentes",
          "Soluções para monitorar ativos e processos críticos através da tecnologia de sensoriamento distribuído a fibra óptica",
          "Fale com nossos engenheiros",
          contactHrefByLocale[locale]
        ),
        mediaTextBlock(
          "Uma plataforma integrada de sensoriamento inteligente construída para operadores de infraestrutura crítica",
          "<p>A tecnologia DFOS (Distributed Fiber Optic Sensing) transforma qualquer cabo de fibra óptica padrão em um sistema de sensoriamento contínuo com milhares de pontos de medição simultâneos, sem a necessidade de sensores extra ao longo da infraestrutura.</p>",
          "left",
          {
            eyebrow: "DISTRIBUTED ACOUSTIC AND TEMPERATURE SENSING",
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
          "Da fibra ao diagnóstico temos soluções completas para infraestrutura crítica",
          [
            {
              title: "Interrogador DATS: DAS e DTS na mesma fibra",
              content: "<p>Um único equipamento opera DAS e DTS simultaneamente sobre a mesma fibra já instalada, com alcance de até 60 km (DAS) e 30 km (DTS), sem necessidade de novos cabos.</p>",
            },
            {
              title: "Algoritmos de IA e software embarcado",
              content: "<p>Algoritmos proprietários treinados com dados de campo brasileiros classificam eventos acústicos e térmicos, filtram ruído e geram alertas com localização precisa — informação acionável, não apenas dados brutos.</p>",
            },
            {
              title: "Soluções customizadas por aplicação",
              content: "<p>Cada projeto é desenvolvido sob medida para o perfil de ameaças e contexto regulatório específico — gasodutos, oleodutos, linhas de transmissão, cabos submarinos, poços e infraestrutura civil.</p>",
            },
            {
              title: "Serviços de engenharia e implantação",
              content: "<p>Atuação completa desde a concepção até o comissionamento: levantamento de fibra existente, arquitetura do sistema, instalação, calibração e integração com sistemas do cliente.</p>",
            },
            {
              title: "Monitoramento contínuo",
              content: "<p>Plataforma por assinatura com acesso remoto seguro, gestão de alarmes configuráveis e relatórios automáticos de conformidade — modelos de IA atualizados continuamente com dados de campo acumulados.</p>",
            },
          ],
          "<p>A Immer Messen não fornece apenas hardware. Entregamos sistemas completos de monitoramento distribuído, do interrogador óptico à plataforma de inteligência operacional, adaptados aos requisitos técnicos, regulatórios e operacionais de cada cliente.</p>",
          { eyebrow: "Soluções:", variant: "numbered-cards" }
        ),
        applicationAreasBlock("Áreas de aplicação", allAreaKeys),
        homeAboutBlock(
          "QUEM SOMOS",
          "Nascemos nos laboratórios. Chegamos ao campo.",
          "<p>A Immer Messen tem origem na pesquisa de ponta desenvolvida na Universidade Tecnológica Federal do Paraná (UTFPR), em Curitiba. Foi dentro dos laboratórios da universidade que surgiu o primeiro interrogador DAS de desenvolvimento genuinamente nacional — resultado de anos de pesquisa aplicada em fotônica, metrologia óptica e processamento de sinais.</p>",
          [
            { title: "Da pesquisa ao mercado", body: "<p>O reconhecimento do potencial tecnológico da Immer Messen veio antes mesmo do lançamento comercial. A Petrobras selecionou a empresa como parceira em projeto de P&amp;D que validou a maturidade técnica do sistema e acelerou o desenvolvimento de aplicações para óleo e gás — posicionando a Immer Messen como referência técnica nacional em sensoriamento em poços e infraestrutura subsuperficial.</p>" },
            { title: "Membro do NVIDIA Inception Program", body: "<p>A Immer Messen integra o NVIDIA Inception Program, iniciativa global de suporte a startups de deep-tech e inteligência artificial — reconhecimento do papel estratégico dos algoritmos de IA na plataforma e do alinhamento com a fronteira em machine learning aplicado a sensoriamento distribuído.</p>" },
            { title: "O que nos define", body: "<p>Somos o único desenvolvedor brasileiro de tecnologia DFOS com hardware proprietário, algoritmos de IA treinados com dados de campo nacionais e capacidade de entrega de solução completa — do interrogador óptico à plataforma de monitoramento contínuo. Nossa estrutura local permite suporte ágil, precificação competitiva e integração nativa aos requisitos regulatórios do mercado brasileiro.</p>" },
          ]
        ),
        partnersBlock("Parceiros", allPartnerKeys),
        casesBlock("Tecnologia validada em campo.", "latest", [], {
          eyebrow: "Cases",
          subheading:
            "Confira em detalhes projetos realizados com as maiores operadoras de infraestrutura crítica do Brasil.",
        }),
        newsBlock("Notícias", "latest"),
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
          "We turn optical fibers into intelligent systems",
          "Solutions to monitor critical assets and processes through distributed fiber optic sensing technology",
          "Talk to our engineers",
          contactHrefByLocale[locale]
        ),
        mediaTextBlock(
          "An integrated intelligent sensing platform built for critical infrastructure operators",
          "<p>DFOS (Distributed Fiber Optic Sensing) turns any standard optical fiber cable into a continuous sensing system with thousands of simultaneous measurement points, with no extra sensors along the infrastructure.</p>",
          "left",
          {
            eyebrow: "DISTRIBUTED ACOUSTIC AND TEMPERATURE SENSING",
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
          "From fiber to diagnosis, complete solutions for critical infrastructure",
          [
            {
              title: "DATS interrogator: DAS and DTS on the same fiber",
              content: "<p>A single device runs DAS and DTS simultaneously over the same installed fiber, reaching up to 60 km (DAS) and 30 km (DTS), with no new cables required.</p>",
            },
            {
              title: "AI algorithms and embedded software",
              content: "<p>Proprietary algorithms trained on Brazilian field data classify acoustic and thermal events, filter out noise and raise alerts with precise localisation — actionable information, not raw data.</p>",
            },
            {
              title: "Application-tailored solutions",
              content: "<p>Every project is tailored to the specific threat profile and regulatory context — gas and oil pipelines, transmission lines, submarine cables, wells and civil infrastructure.</p>",
            },
            {
              title: "Engineering and deployment services",
              content: "<p>Full coverage from design to commissioning: survey of existing fiber, system architecture, installation, calibration and integration with the client's systems.</p>",
            },
            {
              title: "Continuous monitoring",
              content: "<p>Subscription platform with secure remote access, configurable alarm management and automatic compliance reports — AI models continuously updated with accumulated field data.</p>",
            },
          ],
          "<p>Immer Messen does not supply hardware alone. We deliver complete distributed monitoring systems, from the optical interrogator to the operational intelligence platform, adapted to each client's technical, regulatory and operational requirements.</p>",
          { eyebrow: "Solutions:", variant: "numbered-cards" }
        ),
        applicationAreasBlock("Application areas", allAreaKeys),
        homeAboutBlock(
          "WHO WE ARE",
          "Born in the lab. Proven in the field.",
          "<p>Immer Messen originates in the research developed at the Federal University of Technology — Paraná (UTFPR), in Curitiba. It was inside the university labs that the first genuinely Brazilian DAS interrogator emerged — the result of years of applied research in photonics, optical metrology and signal processing.</p>",
          [
            { title: "From research to market", body: "<p>Recognition of Immer Messen's technological potential arrived before the commercial launch. Petrobras selected the company as a partner in an R&amp;D project that validated the system's technical maturity and accelerated the development of oil and gas applications — establishing Immer Messen as the national technical reference in well and subsurface sensing.</p>" },
            { title: "Member of the NVIDIA Inception Program", body: "<p>Immer Messen is part of the NVIDIA Inception Program, a global initiative supporting deep-tech and artificial intelligence startups — recognition of the strategic role AI algorithms play in the platform and of its alignment with the frontier of machine learning applied to distributed sensing.</p>" },
            { title: "What defines us", body: "<p>We are the only Brazilian developer of DFOS technology with proprietary hardware, AI algorithms trained on national field data and the capacity to deliver a complete solution — from the optical interrogator to the continuous monitoring platform. Our local structure enables responsive support, competitive pricing and native alignment with Brazilian regulatory requirements.</p>" },
          ]
        ),
        partnersBlock("Partners", allPartnerKeys),
        casesBlock("Technology proven in the field.", "latest", [], {
          eyebrow: "Cases",
          subheading:
            "Explore in detail projects delivered with the largest critical infrastructure operators in Brazil.",
        }),
        newsBlock("News", "latest"),
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
          "Transformamos las fibras ópticas en sistemas inteligentes",
          "Soluciones para monitorear activos y procesos críticos mediante la tecnología de sensado distribuido por fibra óptica",
          "Hable con nuestros ingenieros",
          contactHrefByLocale[locale]
        ),
        mediaTextBlock(
          "Una plataforma integrada de sensado inteligente construida para operadores de infraestructura crítica",
          "<p>La tecnología DFOS (Distributed Fiber Optic Sensing) transforma cualquier cable de fibra óptica estándar en un sistema de sensado continuo con miles de puntos de medición simultáneos, sin necesidad de sensores adicionales a lo largo de la infraestructura.</p>",
          "left",
          {
            eyebrow: "DISTRIBUTED ACOUSTIC AND TEMPERATURE SENSING",
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
          "De la fibra al diagnóstico, soluciones completas para infraestructura crítica",
          [
            {
              title: "Interrogador DATS: DAS y DTS en la misma fibra",
              content: "<p>Un único equipo opera DAS y DTS simultáneamente sobre la misma fibra ya instalada, con alcance de hasta 60 km (DAS) y 30 km (DTS), sin necesidad de nuevos cables.</p>",
            },
            {
              title: "Algoritmos de IA y software embebido",
              content: "<p>Algoritmos propietarios entrenados con datos de campo brasileños clasifican eventos acústicos y térmicos, filtran ruido y generan alertas con localización precisa — información accionable, no solo datos brutos.</p>",
            },
            {
              title: "Soluciones personalizadas por aplicación",
              content: "<p>Cada proyecto se desarrolla a medida del perfil de amenazas y del contexto regulatorio específico — gasoductos, oleoductos, líneas de transmisión, cables submarinos, pozos e infraestructura civil.</p>",
            },
            {
              title: "Servicios de ingeniería e implementación",
              content: "<p>Actuación completa desde la concepción hasta la puesta en marcha: relevamiento de fibra existente, arquitectura del sistema, instalación, calibración e integración con los sistemas del cliente.</p>",
            },
            {
              title: "Monitoreo continuo",
              content: "<p>Plataforma por suscripción con acceso remoto seguro, gestión de alarmas configurables e informes automáticos de conformidad — modelos de IA actualizados continuamente con datos de campo acumulados.</p>",
            },
          ],
          "<p>Immer Messen no suministra solo hardware. Entregamos sistemas completos de monitoreo distribuido, del interrogador óptico a la plataforma de inteligencia operativa, adaptados a los requisitos técnicos, regulatorios y operativos de cada cliente.</p>",
          { eyebrow: "Soluciones:", variant: "numbered-cards" }
        ),
        applicationAreasBlock("Áreas de aplicación", allAreaKeys),
        homeAboutBlock(
          "QUIÉNES SOMOS",
          "Nacimos en los laboratorios. Llegamos al campo.",
          "<p>Immer Messen tiene origen en la investigación de punta desarrollada en la Universidad Tecnológica Federal de Paraná (UTFPR), en Curitiba. Fue dentro de los laboratorios de la universidad que surgió el primer interrogador DAS de desarrollo genuinamente nacional — resultado de años de investigación aplicada en fotónica, metrología óptica y procesamiento de señales.</p>",
          [
            { title: "De la investigación al mercado", body: "<p>El reconocimiento del potencial tecnológico de Immer Messen llegó antes del lanzamiento comercial. Petrobras seleccionó a la empresa como socia en un proyecto de I+D que validó la madurez técnica del sistema y aceleró el desarrollo de aplicaciones para petróleo y gas — posicionando a Immer Messen como referencia técnica nacional en sensado en pozos e infraestructura subsuperficial.</p>" },
            { title: "Miembro del NVIDIA Inception Program", body: "<p>Immer Messen integra el NVIDIA Inception Program, iniciativa global de apoyo a startups de deep-tech e inteligencia artificial — reconocimiento del papel estratégico de los algoritmos de IA en la plataforma y de su alineación con la frontera del machine learning aplicado al sensado distribuido.</p>" },
            { title: "Lo que nos define", body: "<p>Somos el único desarrollador brasileño de tecnología DFOS con hardware propietario, algoritmos de IA entrenados con datos de campo nacionales y capacidad de entrega de solución completa — del interrogador óptico a la plataforma de monitoreo continuo. Nuestra estructura local permite soporte ágil, precios competitivos e integración nativa con los requisitos regulatorios del mercado brasileño.</p>" },
          ]
        ),
        partnersBlock("Aliados", allPartnerKeys),
        casesBlock("Tecnología validada en campo.", "latest", [], {
          eyebrow: "Casos",
          subheading:
            "Conozca en detalle proyectos realizados con los mayores operadores de infraestructura crítica de Brasil.",
        }),
        newsBlock("Noticias", "latest"),
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
      { assetKey: "tec-equipamento-front", usage: "page.equipment-callouts-block.media" },
      { assetKey: "tec-interface-main", usage: "page.media-text-block.media" },
      { assetKey: "tec-interface-thumb-1", usage: "page.media-text-block.gallery" },
      { assetKey: "tec-interface-thumb-2", usage: "page.media-text-block.gallery" },
      { assetKey: "tec-interface-thumb-3", usage: "page.media-text-block.gallery" },
      { assetKey: "tec-cta-bg", usage: "page.media-text-block.background" },
    ],
    "pt-BR": {
      title: "Tecnologia",
      summary: "Visão geral da tecnologia proprietária DATS, key features e interface operacional.",
      seoTitle: "Tecnologia | Immer Messen",
      seoDescription: "Tecnologia proprietária DATS com DAS e DTS integrados.",
      blocks: () => [
        pageHeroBlock("Tecnologia DAS/DTS Immer Messen", "Plataforma proprietária para aquisição, processamento e inteligência operacional.", { badges: ["DAS Rayleigh", "DTS Raman"] }),
        specStripBlock(null, [
          { value: "120 km", label: "alcance total com um interrogador" },
          { value: "0,5 – 100 kHz", label: "amplitude da faixa de frequência" },
          { value: "3U | 10 kg", label: "design integrado e compacto" },
          { value: "300 W", label: "consumo máximo" },
        ]),
        featureGridBlock("Key features", [
          { title: "Tecnologia DAS baseada em fase para medições quantitativas", description: "Detecção de deformação, acústica e temperatura com alta precisão ao longo de toda a extensão da fibra." },
          { title: "DAS | DTS integrado: medições simultâneas", description: "Detecção acústica e de temperatura na mesma fibra óptica, sem necessidade de infraestrutura separada." },
          { title: "Alta sensibilidade: detecção de estímulos em escala micro", description: "Identificação precisa de eventos físicos ao longo de toda a fibra, mesmo em ambientes de alto ruído." },
          { title: "Resposta em frequência banda larga: 0,5 Hz a 100 kHz", description: "Detecção simultânea de eventos de baixa e alta frequência ao longo de toda a extensão da fibra." },
          { title: "Alcance de até 120 km com um único interrogador", description: "Monitoramento simultâneo de duas fibras de até 60 km cada, com eficiência de cobertura sem precedentes." },
          { title: "Infraestrutura eficiente com fibra óptica existente", description: "Baixo consumo de energia e possibilidade de uso da fibra já instalada, reduzindo custo e complexidade de implantação." },
        ], undefined, { subheading: "Tecnologia de ponta para monitoramento de infraestrutura crítica em tempo real" }),
        equipmentCalloutsBlock(null, [
          { title: "Fácil visualização", description: "Display frontal com dados de aquisição", position: "left" },
          { title: "Edge Computing", description: "Processamento paralelo embarcado de alto desempenho com GPU", position: "top-right" },
          { title: "IA e ML em tempo real", description: "Classificação de eventos e redução de alarmes falsos", position: "bottom" },
        ], { ctaLabel: "Download Datasheet", ctaHref: "#" }),
        mediaTextBlock(
          "Interface operacional embarcada",
          "<p>Acesso remoto, controle total de aquisição e alarmes configuráveis direto do navegador, sem instalação.</p><p>Interface web hospedada no próprio equipamento, acessível via intranet ou internet com conexão segura. Configure largura de pulso, gauge length e taxa de amostragem em tempo real, e defina alarmes para detecção e localização precisas de anomalia.</p>",
          "left",
          { variant: "interface-split" }
        ),
        mediaTextBlock(
          "Da fibra ao diagnóstico: uma plataforma completa",
          "<p>Equipamento que opera em conjunto com um sistema servidor dedicado, configurado e entregue pronto para uso. Algoritmos de IA desenvolvidos pela Immer Messen interpretam os sinais adquiridos e geram diagnósticos preditivos adaptados à operação de cada cliente.</p>",
          "right",
          { variant: "tech-cta", ctaLabel: "Fale com nossos engenheiros", ctaHref: "/pt-BR#contato" }
        ),
      ],
    },
    en: {
      title: "Technology",
      summary: "Overview of the proprietary DATS technology, key features and operational interface.",
      seoTitle: "Technology | Immer Messen",
      seoDescription: "Proprietary DATS technology with integrated DAS and DTS.",
      blocks: () => [
        pageHeroBlock("Immer Messen DAS/DTS technology", "Proprietary platform for acquisition, processing and operational intelligence.", { badges: ["DAS Rayleigh", "DTS Raman"] }),
        specStripBlock(null, [
          { value: "120 km", label: "total reach with a single interrogator" },
          { value: "0.5 – 100 kHz", label: "frequency response range" },
          { value: "3U | 10 kg", label: "integrated, compact design" },
          { value: "300 W", label: "maximum power draw" },
        ]),
        featureGridBlock("Key features", [
          { title: "Phase-based DAS technology", description: "Quantitative measurements of strain, acoustics and temperature." },
          { title: "Wide frequency response", description: "Monitoring from ultra-low frequencies up to tens of kHz." },
          { title: "Up to 120 km reach", description: "Two fibers of up to 60 km in a single interrogator." },
          { title: "Integrated DAS and DTS", description: "Simultaneous measurements over the same optical fiber." },
          { title: "High sensitivity", description: "Detection of axial stimuli at pico-strain and milliKelvin scale." },
          { title: "Efficient infrastructure", description: "Compatible with standard fiber and low power consumption." },
        ], undefined, { subheading: "State-of-the-art technology for real-time critical infrastructure monitoring" }),
        equipmentCalloutsBlock(null, [
          { title: "At-a-glance readout", description: "Front display with live acquisition data", position: "left" },
          { title: "Edge computing", description: "High-performance embedded parallel processing with GPU", position: "top-right" },
          { title: "Real-time AI and ML", description: "Event classification and false alarm reduction", position: "bottom" },
        ], { ctaLabel: "Download Datasheet", ctaHref: "#" }),
        mediaTextBlock(
          "Embedded operational interface",
          "<p>Remote access, full acquisition control and configurable alarms straight from the browser, with no installation.</p><p>Web interface hosted on the unit itself, reachable over intranet or internet on a secure connection. Set pulse width, gauge length and sampling rate in real time, and define alarms for precise anomaly detection and localization.</p>",
          "left",
          { variant: "interface-split" }
        ),
        mediaTextBlock(
          "From fiber to diagnosis: a complete platform",
          "<p>The unit operates alongside a dedicated server system, configured and delivered ready to use. AI algorithms developed by Immer Messen interpret the acquired signals and generate predictive diagnostics adapted to each client operation.</p>",
          "right",
          { variant: "tech-cta", ctaLabel: "Talk to our engineers", ctaHref: "/en#contato" }
        ),
      ],
    },
    es: {
      title: "Tecnología",
      summary: "Visión general de la tecnología propietaria DATS, key features e interfaz operativa.",
      seoTitle: "Tecnología | Immer Messen",
      seoDescription: "Tecnología propietaria DATS con DAS y DTS integrados.",
      blocks: () => [
        pageHeroBlock("Tecnología DAS/DTS Immer Messen", "Plataforma propietaria para adquisición, procesamiento e inteligencia operativa.", { badges: ["DAS Rayleigh", "DTS Raman"] }),
        specStripBlock(null, [
          { value: "120 km", label: "alcance total con un interrogador" },
          { value: "0,5 – 100 kHz", label: "amplitud del rango de frecuencia" },
          { value: "3U | 10 kg", label: "diseño integrado y compacto" },
          { value: "300 W", label: "consumo máximo" },
        ]),
        featureGridBlock("Key features", [
          { title: "Tecnología DAS basada en fase", description: "Mediciones cuantitativas de deformación, acústica y temperatura." },
          { title: "Respuesta en frecuencia amplia", description: "Monitoreo desde frecuencias ultrabajas hasta decenas de kHz." },
          { title: "Alcance de hasta 120 km", description: "Dos fibras de hasta 60 km en un solo interrogador." },
          { title: "DAS y DTS integrados", description: "Mediciones simultáneas sobre la misma fibra óptica." },
          { title: "Alta sensibilidad", description: "Detección de estímulos axiales en escala pico-strain y miliKelvin." },
          { title: "Infraestructura eficiente", description: "Compatibilidad con fibra estándar y bajo consumo energético." },
        ], undefined, { subheading: "Tecnología de punta para el monitoreo de infraestructura crítica en tiempo real" }),
        equipmentCalloutsBlock(null, [
          { title: "Visualización inmediata", description: "Display frontal con datos de adquisición", position: "left" },
          { title: "Edge computing", description: "Procesamiento paralelo embarcado de alto desempeño con GPU", position: "top-right" },
          { title: "IA y ML en tiempo real", description: "Clasificación de eventos y reducción de alarmas falsas", position: "bottom" },
        ], { ctaLabel: "Download Datasheet", ctaHref: "#" }),
        mediaTextBlock(
          "Interfaz operativa embebida",
          "<p>Acceso remoto, control total de adquisición y alarmas configurables directamente desde el navegador, sin instalación.</p><p>Interfaz web alojada en el propio equipo, accesible por intranet o internet con conexión segura. Configure ancho de pulso, gauge length y tasa de muestreo en tiempo real, y defina alarmas para detección y localización precisas de anomalías.</p>",
          "left",
          { variant: "interface-split" }
        ),
        mediaTextBlock(
          "De la fibra al diagnóstico: una plataforma completa",
          "<p>Equipo que opera junto a un sistema servidor dedicado, configurado y entregado listo para usar. Algoritmos de IA desarrollados por Immer Messen interpretan las señales adquiridas y generan diagnósticos predictivos adaptados a la operación de cada cliente.</p>",
          "right",
          { variant: "tech-cta", ctaLabel: "Hable con nuestros ingenieros", ctaHref: "/es#contato" }
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
    { assetKey: "tec-equipamento-front", sourcePath: "resources/imagens-tecnologia/equipamento-front.png", kind: "image" },
    { assetKey: "tec-interface-main", sourcePath: "resources/imagens-tecnologia/img-001-008.png", kind: "image" },
    { assetKey: "tec-interface-thumb-1", sourcePath: "resources/imagens-tecnologia/img-001-010.png", kind: "image" },
    { assetKey: "tec-interface-thumb-2", sourcePath: "resources/imagens-tecnologia/img-001-011.png", kind: "image" },
    { assetKey: "tec-interface-thumb-3", sourcePath: "resources/imagens-tecnologia/img-001-009.png", kind: "image" },
    { assetKey: "tec-cta-bg", sourcePath: "resources/imagens-tecnologia/img-001-007.png", kind: "image" },
    { assetKey: "interrogador-rack", sourcePath: "layout-aprovado/assets/img/interrogador.png", kind: "image" },
    { assetKey: "interrogador-front", sourcePath: "layout-aprovado/assets/img/interrogador-front.png", kind: "image" },
    { assetKey: "interface-monitors", sourcePath: "layout-aprovado/assets/img/interface-monitors.png", kind: "image" },
    { assetKey: "case-hero-offshore", sourcePath: "layout-aprovado/assets/img/case-hero-offshore.png", kind: "image" },
    // resources/Cases_Imagens — mapeamento confirmado em 10-ASSETS-DECISION.md.
    // image_016/018 sao os logos Petrobras e Instituto Aqualie (ja existem como
    // partner-*) e image_006/012/014/020 sao mascaras pretas do export do SVG:
    // nenhum dos dois grupos entra aqui.
    { assetKey: "case-hero-plataforma", sourcePath: "resources/Cases_Imagens/image_000.png", kind: "image" },
    { assetKey: "case-fig-baleia", sourcePath: "resources/Cases_Imagens/image_004.png", kind: "image" },
    { assetKey: "case-fig-mapa-campos", sourcePath: "resources/Cases_Imagens/image_008.png", kind: "image" },
    { assetKey: "case-fig-espectrograma", sourcePath: "resources/Cases_Imagens/image_010.png", kind: "image" },
    // Figuras acrescentadas na revisao do case Baleias (RevisaoWeber_CaseBaleias.docx).
    { assetKey: "case-fig-embarcacoes", sourcePath: "resources/Cases_Imagens/fig-embarcacoes.png", kind: "image" },
    { assetKey: "case-fig-processos-oceanicos", sourcePath: "resources/Cases_Imagens/fig-processos-oceanicos.png", kind: "image" },
    { assetKey: "case-cover-gasodutos-onshore", sourcePath: "resources/cases-03-onshore.jpeg", kind: "image" },
    // Vindos dos PDFs de layout aprovado (docs/Case *.pdf).
    { assetKey: "case-hero-oceano", sourcePath: "resources/Cases_Imagens/hero-oceano.jpg", kind: "image" },
    { assetKey: "case-fig-dutos-dashboard", sourcePath: "resources/Cases_Imagens/fig-dutos-dashboard.png", kind: "image" },
    { assetKey: "case-fig-dutos-sinais", sourcePath: "resources/Cases_Imagens/fig-dutos-sinais.png", kind: "image" },
    // Lockup empilhado sobre fundo claro: o logo-immer padrao e branco, para fundo escuro.
    { assetKey: "partner-immer-messen", sourcePath: "resources/Cases_Imagens/logo-immer-empilhado.png", kind: "image" },
    { assetKey: "case-bg-fibra", sourcePath: "resources/Cases_Imagens/image_022.png", kind: "image" },
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
    { assetKey: "about-fiber-bg", sourcePath: "layout-aprovado/assets/img/fiber-bg.png", kind: "image" },
    { assetKey: "application-cabos-submarinos", sourcePath: "layout-aprovado/assets/img/areas/cabos-submarinos.jpg", kind: "image" },
    { assetKey: "application-linhas-transmissao", sourcePath: "layout-aprovado/assets/img/areas/linhas-transmissao.jpg", kind: "image" },
    { assetKey: "application-geofisica", sourcePath: "layout-aprovado/assets/img/areas/geofisica.jpg", kind: "image" },
    { assetKey: "application-embarcacoes", sourcePath: "layout-aprovado/assets/img/areas/embarcacoes.jpg", kind: "image" },
    { assetKey: "application-pocos-submarinos", sourcePath: "layout-aprovado/assets/img/areas/pocos-submarinos.jpg", kind: "image" },
    { assetKey: "contact-fiber-bg", sourcePath: "layout-aprovado/assets/img/contact-fiber-bg.jpg", kind: "image" },
  ],
  placeholderAssetsToReplace: [
    { assetKey: "contact-placeholder-hero", location: "layout-aprovado/contato.html", purpose: "page hero", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-cabos-submarinos", location: "layout-aprovado/cases/monitoramento-cabos-submarinos.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-baleias", location: "layout-aprovado/cases/monitoramento-baleias.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-transmissao", location: "layout-aprovado/cases/monitoramento-transmissao-energia.html", purpose: "case cover", currentSource: "external-unsplash" },
    { assetKey: "case-placeholder-gasodutos", location: "layout-aprovado/cases/monitoramento-gasodutos.html", purpose: "case cover", currentSource: "external-unsplash" },
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
  // `about` saiu do seed no commit deebde2 (quem somos virou ancora da home);
  // a lista de esperados nao acompanhou e o validador falhava desde entao.
  const pageKeys = new Set(["home", "technology", "lgpd"]);
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

  // Guarda do plano 10-06: o seed nao pode reintroduzir a estrutura legada.
  // Os 9 campos de corpo sairam do content type (D-03) e um `data` que ainda os
  // declare seria rejeitado pelo Strapi — ou, pior, aceito e silenciosamente
  // descartado, deixando o case sem corpo.
  const removedCaseFields = [
    "client",
    "startDate",
    "duration",
    "tags",
    "body",
    "heroTitle",
    "challenge",
    "leadTitle",
    "leadSubtitle",
  ];
  const requiredCaseFields = ["title", "slug", "summary", "sectorCategory", "seo"];
  const knownAssetKeys = new Set(assetManifest.readyAssets.map((asset) => asset.assetKey));

  for (const entry of seedContent.caseStudies) {
    const label = `${entry.key} [${entry.locale}]`;
    for (const field of removedCaseFields) {
      if (field in entry.data) {
        errors.push(`Case ${label} still declares removed field ${field}`);
      }
    }
    for (const field of requiredCaseFields) {
      if (!entry.data[field]) errors.push(`Case ${label} lost metadata field ${field}`);
    }
    const sections = entry.data.sections;
    if (!Array.isArray(sections) || sections.length === 0) {
      errors.push(`Case ${label} has an empty sections zone`);
      continue;
    }
    for (const row of sections.flatMap((block) => block.rows ?? [])) {
      if (String(row.label ?? "").trim().endsWith(":")) {
        errors.push(`Case ${label} has an info row label ending in ':' (${row.label})`);
      }
    }
    for (const figure of sections.filter((block) => block.__component === "case.figure-section")) {
      if (!figure.figureAssetKey || !knownAssetKeys.has(figure.figureAssetKey)) {
        errors.push(`Case ${label} references unknown figure asset ${figure.figureAssetKey}`);
      }
      if (!String(figure.alt ?? "").trim()) {
        errors.push(`Case ${label} has a figure without alt text`);
      }
    }
    for (const ref of entry.assetRefs ?? []) {
      if (!knownAssetKeys.has(ref.assetKey) && ref.status !== "placeholder-external") {
        errors.push(`Case ${label} references unknown asset ${ref.assetKey}`);
      }
    }
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
