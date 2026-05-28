import type { SupportedLocale } from "@/lib/i18n/config";
import type { CmsPage } from "./schemas";

const media = (id: number, url: string, alternativeText: string) => ({
  id,
  url,
  alternativeText,
});

const homeAreasPt = {
  __component: "page.application-areas-block" as const,
  heading: "Areas de aplicacao",
  areas: [
    { title: "Integridade estrutural", summary: "Monitoramento continuo de vibracoes e deformacoes para identificar riscos estruturais em pontes, dutos, cabos e outras infraestruturas criticas.", image: media(4, "/assets/img/areas/integridade-estrutural.png", "Ponte sob monitoramento estrutural") },
    { title: "Vazamentos", summary: "Deteccao precoce de vazamentos em dutos e infraestruturas lineares por meio da identificacao de padroes acusticos e termicos ao longo da fibra.", image: media(5, "/assets/img/areas/vazamentos.png", "Dutos industriais para deteccao de vazamentos") },
    { title: "Seguranca patrimonial", summary: "Deteccao de intrusoes, escavacoes e movimentacoes nao autorizadas ao longo de perimetros e ativos sensiveis.", image: media(6, "/assets/img/areas/seguranca-patrimonial.png", "Perimetro industrial para seguranca patrimonial") },
    { title: "Meio ambiente", summary: "Monitoramento de cetaceos e da atividade acustica marinha para mitigacao dos impactos de estudos sismicos e outras atividades offshore.", image: media(7, "/assets/img/areas/meio-ambiente.png", "Ambiente marinho para monitoramento ambiental") },
    { title: "Sismica", summary: "Aquisicao e monitoramento de sinais sismicos utilizando fibras opticas como sensores distribuidos.", image: media(8, "/assets/img/areas/sismica.png", "Plataforma offshore para aquisicao sismica") },
    { title: "Deteccao de incendios", summary: "Identificacao precoce de variacoes de temperatura e padroes termicos associados ao inicio de incendios em infraestruturas e areas industriais.", image: media(9, "/assets/img/areas/incendios.png", "Linhas de transmissao para deteccao de incendios") },
    { title: "Escoamento", summary: "Monitoramento do fluxo em dutos e pocos, permitindo identificar variacoes no regime de escoamento e otimizar a operacao.", image: media(10, "/assets/img/areas/escoamento.png", "Dutos metalicos para monitoramento de escoamento") },
    { title: "Derivacao clandestina", summary: "Deteccao de atividades suspeitas em dutos, como perfuracoes e intervencoes ilegais para retirada de produtos.", image: media(11, "/assets/img/areas/derivacao-clandestina.png", "Refinaria com sistema de dutos para deteccao de derivacao") },
  ],
};

const homePagePt: CmsPage = {
  id: 1,
  title: "Home",
  slug: "home",
  locale: "pt-BR",
  seo: {
    title: "Immer Messen - Transformamos fibra optica em sistemas inteligentes",
    description: "Tecnologia DAS/DTS de sensoriamento distribuido por fibra optica para monitoramento em tempo real de infraestruturas criticas.",
  },
  blocks: [
    {
      __component: "page.hero-block",
      title: "Transformamos fibra optica em sistemas inteligentes",
      subtitle: "",
      alignment: "left",
      posterImage: media(1, "/assets/img/hero-home.png", "Poster da hero da Immer Messen"),
      backgroundVideo: media(2, "/assets/video/HOME.mp4", "Video institucional da hero"),
    },
    {
      __component: "page.media-text-block",
      variant: "home-tech",
      eyebrow: "TECNOLOGIA",
      heading: "Uma plataforma integrada de sensoriamento inteligente construida para operadores de infraestrutura critica",
      body: "<p>A tecnologia DFOS (Distributed Fiber Optic Sensing) transforma qualquer cabo de fibra optica padrao em um sistema de sensoriamento continuo com milhares de pontos de medicao simultaneos, sem a necessidade de sensores extra ao longo da infraestrutura.</p>",
      media: media(3, "/assets/img/interrogador.png", "Interrogador DATS Immer Messen - chassi rack iluminado em azul"),
      ctaLabel: "Saiba mais",
      ctaHref: "/pt-BR/tecnologia",
      features: [
        { title: "Milhares de sensores acústicos, de temperatura e deformação com uma única solução.", icon: media(101, "/assets/img/tec-icons/tec-icon-01.png", "Sensores acústicos, de temperatura e deformação") },
        { title: "Monitoramento de mais de 70 quilômetros com um único aparelho", icon: media(102, "/assets/img/tec-icons/tec-icon-02.png", "Alcance estendido") },
        { title: "Um sensor a cada 3 metros do cabo", icon: media(103, "/assets/img/tec-icons/tec-icon-03.png", "Sensor a cada 3 metros") },
        { title: "Algoritmos de IA e Machine Learning monitorando quilômetros em tempo real", icon: media(104, "/assets/img/tec-icons/tec-icon-04.png", "IA e Machine Learning") },
        { title: "Alarmes integrados à infraestrutura atual", icon: media(105, "/assets/img/tec-icons/tec-icon-05.png", "Alarmes integrados") },
        { title: "Precisão de nano-strain e microkelvin", icon: media(106, "/assets/img/tec-icons/tec-icon-06.png", "Precisão nano-strain e microkelvin") },
      ],
    },
    {
      __component: "page.accordion-block",
      heading: "Soluções",
      body: "<h3>Da fibra ao diagnóstico temos soluções completas para infraestrutura crítica</h3><p>A Immer Messen não fornece apenas hardware. Entregamos sistemas completos de monitoramento distribuído, do interrogador óptico à plataforma de inteligência operacional, todos adaptados aos requisitos técnicos, regulatórios e operacionais de cada cliente.</p>",
      items: [
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
    },
    homeAreasPt,
    {
      __component: "page.cases-block",
      heading: "CASES",
      displayMode: "latest",
      limit: 4,
      cases: [],
    },
    {
      __component: "page.news-carousel-block",
      heading: "Notícias",
      displayMode: "latest",
      articles: [],
    },
    {
      __component: "page.contact-form-block",
      heading: "Fale com a nossa equipe",
      body: "<p>Se voce tem interesse em saber mais sobre as nossas solucoes, deixe o seu contato.</p>",
      submitLabel: "enviar",
    },
  ],
};

const homeAreasEn = {
  __component: "page.application-areas-block" as const,
  heading: "Application areas",
  areas: [
    { title: "Structural integrity", summary: "Continuous monitoring of vibration and strain to detect structural risks on bridges, pipelines, cables and other critical civil assets.", image: media(4, "/assets/img/areas/integridade-estrutural.png", "Bridge under structural monitoring") },
    { title: "Leak detection", summary: "Early detection of leaks in pipelines and linear infrastructure through acoustic and thermal patterns along the fiber.", image: media(5, "/assets/img/areas/vazamentos.png", "Industrial pipelines for leak detection") },
    { title: "Asset security", summary: "Detection of intrusions, digging and unauthorized movement around perimeters and sensitive assets.", image: media(6, "/assets/img/areas/seguranca-patrimonial.png", "Industrial perimeter for asset security") },
    { title: "Environment", summary: "Acoustic monitoring of cetaceans and marine activity to mitigate the impact of seismic studies and offshore operations.", image: media(7, "/assets/img/areas/meio-ambiente.png", "Marine environment for environmental monitoring") },
    { title: "Seismic", summary: "Acquisition and monitoring of seismic signals using optical fibers as distributed sensors over long distances.", image: media(8, "/assets/img/areas/sismica.png", "Offshore platform for seismic acquisition") },
    { title: "Fire detection", summary: "Early identification of temperature variations and thermal patterns associated with fire onset in industrial environments.", image: media(9, "/assets/img/areas/incendios.png", "Transmission lines for fire detection") },
    { title: "Flow monitoring", summary: "Monitoring of flow in pipelines and wells, identifying regime variations and optimizing operations.", image: media(10, "/assets/img/areas/escoamento.png", "Metallic pipelines for flow monitoring") },
    { title: "Clandestine tapping", summary: "Detection of suspicious activity in pipelines, such as illegal drilling and interventions to extract product.", image: media(11, "/assets/img/areas/derivacao-clandestina.png", "Refinery pipelines for tapping detection") },
  ],
};

const homeAreasEs = {
  __component: "page.application-areas-block" as const,
  heading: "Areas de aplicacion",
  areas: [
    { title: "Integridad estructural", summary: "Monitoreo continuo de vibraciones y deformaciones para identificar riesgos estructurales en puentes, ductos, cables y otros activos criticos.", image: media(4, "/assets/img/areas/integridade-estrutural.png", "Puente bajo monitoreo estructural") },
    { title: "Fugas", summary: "Deteccion temprana de fugas en ductos e infraestructuras lineales mediante patrones acusticos y termicos a lo largo de la fibra.", image: media(5, "/assets/img/areas/vazamentos.png", "Ductos industriales para deteccion de fugas") },
    { title: "Seguridad patrimonial", summary: "Deteccion de intrusiones, excavaciones y movimientos no autorizados en perimetros y activos sensibles.", image: media(6, "/assets/img/areas/seguranca-patrimonial.png", "Perimetro industrial para seguridad patrimonial") },
    { title: "Medio ambiente", summary: "Monitoreo acustico de cetaceos y actividad marina para mitigar el impacto de estudios sismicos y operaciones offshore.", image: media(7, "/assets/img/areas/meio-ambiente.png", "Entorno marino para monitoreo ambiental") },
    { title: "Sismica", summary: "Adquisicion y monitoreo de senales sismicas usando fibras opticas como sensores distribuidos en grandes extensiones.", image: media(8, "/assets/img/areas/sismica.png", "Plataforma offshore para adquisicion sismica") },
    { title: "Deteccion de incendios", summary: "Identificacion temprana de variaciones de temperatura y patrones termicos asociados al inicio de incendios en entornos industriales.", image: media(9, "/assets/img/areas/incendios.png", "Lineas de transmision para deteccion de incendios") },
    { title: "Escurrimiento", summary: "Monitoreo del flujo en ductos y pozos, identificando variaciones del regimen y optimizando la operacion.", image: media(10, "/assets/img/areas/escoamento.png", "Ductos metalicos para monitoreo de escurrimiento") },
    { title: "Derivacion clandestina", summary: "Deteccion de actividades sospechosas en ductos, como perforaciones e intervenciones ilegales para extraer producto.", image: media(11, "/assets/img/areas/derivacao-clandestina.png", "Refineria con ductos para deteccion de derivacion") },
  ],
};

const homePageEn: CmsPage = {
  id: 1,
  title: "Home",
  slug: "home",
  locale: "en",
  seo: {
    title: "Immer Messen - Turning optical fiber into intelligent systems",
    description: "DAS/DTS distributed fiber-optic sensing technology for real-time monitoring of critical infrastructure.",
  },
  blocks: [
    {
      __component: "page.hero-block",
      title: "We turn optical fiber into intelligent systems",
      subtitle: "",
      alignment: "left",
      posterImage: media(1, "/assets/img/hero-home.png", "Immer Messen hero poster"),
      backgroundVideo: media(2, "/assets/video/HOME.mp4", "Institutional hero video"),
    },
    {
      __component: "page.media-text-block",
      variant: "home-tech",
      eyebrow: "TECHNOLOGY",
      heading: "An integrated intelligent sensing platform built for operators of critical infrastructure",
      body: "<p>DFOS (Distributed Fiber Optic Sensing) turns any standard optical fiber cable into a continuous sensing system with thousands of simultaneous measurement points, with no extra sensors along the infrastructure.</p>",
      media: media(3, "/assets/img/interrogador.png", "Immer Messen DATS interrogator - blue-lit rack chassis"),
      ctaLabel: "Learn more",
      ctaHref: "/en/technology",
      features: [
        { title: "Thousands of acoustic, temperature and strain sensors with a single solution.", icon: media(101, "/assets/img/tec-icons/tec-icon-01.png", "Acoustic, temperature and strain sensors") },
        { title: "Over 70 kilometers monitored with a single device", icon: media(102, "/assets/img/tec-icons/tec-icon-02.png", "Extended range monitoring") },
        { title: "One sensor every 3 meters of cable", icon: media(103, "/assets/img/tec-icons/tec-icon-03.png", "One sensor every 3 meters") },
        { title: "AI and Machine Learning algorithms monitoring kilometers in real time", icon: media(104, "/assets/img/tec-icons/tec-icon-04.png", "AI and Machine Learning") },
        { title: "Alarms integrated with existing infrastructure", icon: media(105, "/assets/img/tec-icons/tec-icon-05.png", "Integrated alarms") },
        { title: "Nano-strain and microkelvin precision", icon: media(106, "/assets/img/tec-icons/tec-icon-06.png", "Nano-strain and microkelvin precision") },
      ],
    },
    {
      __component: "page.accordion-block",
      heading: "Solutions",
      body: "<h3>From fiber to diagnostics: complete solutions for critical infrastructure</h3><p>Immer Messen does not provide hardware alone. We deliver complete distributed monitoring systems, from the optical interrogator to the operational intelligence platform, all tailored to each client's technical, regulatory and operational requirements.</p>",
      items: [
        { title: "DATS interrogator: DAS and DTS on the same fiber", content: "<p>DATS is the proprietary optical interrogator developed by Immer Messen to operate simultaneously in DAS and DTS modes over the same fiber cable with a single device. The co-located architecture removes the need for dedicated fiber per modality, reducing deployment cost and simplifying operations.</p><p>Reach of up to 60 km per DAS channel and 30 km per DTS channel, sampling rate from 0.5 to 100 kHz and spatial resolution from 5 to 50 m on standard single-mode fiber already in place - with no need to replace or install new cables.</p>" },
        { title: "AI algorithms and embedded software", content: "<p>Raw data generated by the interrogator is processed by proprietary machine-learning algorithms developed and trained by Immer Messen on field data from Brazilian critical infrastructure. This intelligence layer classifies acoustic and thermal events, filters environmental noise and generates actionable alerts with precise geolocation - reducing false positives and delivering information, not just data.</p>" },
        { title: "Application-tailored solutions", content: "<p>Every infrastructure has its own threat profile, regulatory context and operational constraints. Immer Messen builds custom solutions for gas and oil pipelines, electrical transmission lines, submarine cables, wells, civil infrastructure and more.</p>" },
        { title: "Engineering and deployment services", content: "<p>Our technical team works from project conception to field commissioning - including surveying existing fiber infrastructure, defining system architecture, installing the interrogator, calibration and integration with existing systems.</p>" },
        { title: "Continuous monitoring", content: "<p>Our technical team works from project conception to field commissioning - including surveying existing fiber infrastructure, defining system architecture, installing the interrogator, calibration and integration with existing systems.</p>" },
      ],
    },
    homeAreasEn,
    {
      __component: "page.cases-block",
      heading: "CASES",
      displayMode: "latest",
      limit: 4,
      cases: [],
    },
    {
      __component: "page.news-carousel-block",
      heading: "News",
      displayMode: "latest",
      articles: [],
    },
    {
      __component: "page.contact-form-block",
      heading: "Talk to our team",
      body: "<p>If you would like to know more about our solutions, leave us your contact.</p>",
      submitLabel: "send",
    },
  ],
};

const homePageEs: CmsPage = {
  id: 1,
  title: "Inicio",
  slug: "inicio",
  locale: "es",
  seo: {
    title: "Immer Messen - Transformamos fibra optica en sistemas inteligentes",
    description: "Tecnologia DAS/DTS de sensado distribuido por fibra optica para monitoreo en tiempo real de infraestructuras criticas.",
  },
  blocks: [
    {
      __component: "page.hero-block",
      title: "Transformamos fibra optica en sistemas inteligentes",
      subtitle: "",
      alignment: "left",
      posterImage: media(1, "/assets/img/hero-home.png", "Poster del hero de Immer Messen"),
      backgroundVideo: media(2, "/assets/video/HOME.mp4", "Video institucional del hero"),
    },
    {
      __component: "page.media-text-block",
      variant: "home-tech",
      eyebrow: "TECNOLOGÍA",
      heading: "Una plataforma integrada de sensado inteligente construida para operadores de infraestructura crítica",
      body: "<p>La tecnologia DFOS (Distributed Fiber Optic Sensing) transforma cualquier cable de fibra optica estandar en un sistema de sensado continuo con miles de puntos de medicion simultaneos, sin necesidad de sensores adicionales a lo largo de la infraestructura.</p>",
      media: media(3, "/assets/img/interrogador.png", "Interrogador DATS Immer Messen - chasis rack iluminado en azul"),
      ctaLabel: "Saber mas",
      ctaHref: "/es/tecnologia",
      features: [
        { title: "Miles de sensores acústicos, de temperatura y deformación con una sola solución.", icon: media(101, "/assets/img/tec-icons/tec-icon-01.png", "Sensores acústicos, de temperatura y deformación") },
        { title: "Más de 70 kilómetros monitoreados con un solo equipo", icon: media(102, "/assets/img/tec-icons/tec-icon-02.png", "Alcance extendido") },
        { title: "Un sensor cada 3 metros de cable", icon: media(103, "/assets/img/tec-icons/tec-icon-03.png", "Sensor cada 3 metros") },
        { title: "Algoritmos de IA y Machine Learning monitoreando kilómetros en tiempo real", icon: media(104, "/assets/img/tec-icons/tec-icon-04.png", "IA y Machine Learning") },
        { title: "Alarmas integradas a la infraestructura actual", icon: media(105, "/assets/img/tec-icons/tec-icon-05.png", "Alarmas integradas") },
        { title: "Precisión de nano-strain y microkelvin", icon: media(106, "/assets/img/tec-icons/tec-icon-06.png", "Precisión nano-strain y microkelvin") },
      ],
    },
    {
      __component: "page.accordion-block",
      heading: "Soluciones",
      body: "<h3>De la fibra al diagnóstico: soluciones completas para infraestructura crítica</h3><p>Immer Messen no ofrece solo hardware. Entregamos sistemas completos de monitoreo distribuido, del interrogador óptico a la plataforma de inteligencia operacional, todos adaptados a los requisitos técnicos, regulatorios y operacionales de cada cliente.</p>",
      items: [
        { title: "Interrogador DATS: DAS y DTS en la misma fibra", content: "<p>DATS es el interrogador optico propietario de Immer Messen, desarrollado para operar simultaneamente en modos DAS y DTS sobre el mismo cable de fibra con un unico equipo. La arquitectura co-localizada elimina la necesidad de fibra dedicada por modalidad, reduciendo el costo de despliegue y simplificando la operacion.</p><p>Alcance de hasta 60 km por canal DAS y 30 km por canal DTS, tasa de muestreo de 0,5 a 100 kHz y resolucion espacial de 5 a 50 m sobre fibra monomodo estandar ya instalada - sin necesidad de sustituir ni instalar nuevos cables.</p>" },
        { title: "Algoritmos de IA y software embebido", content: "<p>Los datos brutos generados por el interrogador son procesados por algoritmos propietarios de machine learning desarrollados y entrenados por Immer Messen con datos de campo de infraestructura critica brasilena. Esta capa de inteligencia clasifica eventos acusticos y termicos, filtra ruido ambiental y genera alertas accionables con geolocalizacion precisa - reduciendo falsos positivos y entregando informacion, no solo datos.</p>" },
        { title: "Soluciones customizadas por aplicacion", content: "<p>Cada infraestructura tiene su perfil de amenazas, su contexto regulatorio y sus restricciones operacionales. Immer Messen desarrolla soluciones a medida para gasoductos y oleoductos, lineas de transmision electrica, cables submarinos, pozos, infraestructura civil y mas.</p>" },
        { title: "Servicios de ingenieria y despliegue", content: "<p>Nuestro equipo tecnico actua desde la concepcion del proyecto hasta la puesta en marcha en campo - incluyendo relevamiento de infraestructura de fibra existente, definicion de arquitectura del sistema, instalacion del interrogador, calibracion e integracion con sistemas existentes.</p>" },
        { title: "Monitoreo continuo", content: "<p>Nuestro equipo tecnico actua desde la concepcion del proyecto hasta la puesta en marcha en campo - incluyendo relevamiento de infraestructura de fibra existente, definicion de arquitectura del sistema, instalacion del interrogador, calibracion e integracion con sistemas existentes.</p>" },
      ],
    },
    homeAreasEs,
    {
      __component: "page.cases-block",
      heading: "CASES",
      displayMode: "latest",
      limit: 4,
      cases: [],
    },
    {
      __component: "page.news-carousel-block",
      heading: "Noticias",
      displayMode: "latest",
      articles: [],
    },
    {
      __component: "page.contact-form-block",
      heading: "Hable con nuestro equipo",
      body: "<p>Si desea saber mas sobre nuestras soluciones, dejenos su contacto.</p>",
      submitLabel: "enviar",
    },
  ],
};

const technologyPagePt: CmsPage = {
  id: 2,
  title: "Tecnologia",
  slug: "tecnologia",
  locale: "pt-BR",
  seo: {
    title: "Tecnologia | Immer Messen",
    description: "Conheca o interrogador DATS - DAS e DTS integrados em um unico equipamento.",
  },
  blocks: [
    {
      __component: "page.page-hero-block",
      title: "Tecnologia DAS/DTS Immer Messen",
      subtitle: "Plataforma proprietaria para aquisicao, processamento e inteligencia operacional.",
      backgroundVideo: media(20, "/assets/video/Interrogador.webm", "Video do interrogador"),
    },
    {
      __component: "page.media-text-block",
      variant: "tech-band",
      heading: "Design compacto e integrado: sensoriamento optico, eletronica e edge computing reunidos em uma unica unidade.",
      body: "",
      media: media(21, "/assets/img/interrogador-front.png", "Interrogador DATS - vista frontal"),
      ctaLabel: "Download Datasheet",
      ctaHref: "#",
    },
    {
      __component: "page.feature-grid-block",
      heading: "KEY FEATURES",
      cards: [
        { title: "Tecnologia DAS baseada em fase", description: "para medicoes quantitativas de deformacao, acustica e temperatura.", icon: media(31, "/assets/img/kf/01-fase.png", "Icone tecnologia DAS baseada em fase") },
        { title: "Ampla resposta em frequencia:", description: "monitoramento desde frequencias ultrabaixas ate dezenas de kHz.", icon: media(32, "/assets/img/kf/02-frequencia.png", "Icone de frequencia") },
        { title: "Alcance de ate 120 km:", description: "monitoramento simultaneo de duas fibras de ate 60 km cada com um unico interrogador.", icon: media(33, "/assets/img/kf/03-alcance.png", "Icone de alcance") },
        { title: "DAS | DTS integrado:", description: "medicoes simultaneas de DAS e DTS na mesma fibra optica.", icon: media(34, "/assets/img/kf/04-das-dts.png", "Icone DAS e DTS integrados") },
        { title: "Alta sensibilidade:", description: "deteccao de estimulos axiais em escala pico-strain e miliKelvin com fibra monomodo padrao.", icon: media(35, "/assets/img/kf/05-sensibilidade.png", "Icone de sensibilidade") },
        { title: "Infraestrutura eficiente:", description: "compativel com fibra optica padrao e baixo consumo de energia (300 W).", icon: media(36, "/assets/img/kf/06-infraestrutura.png", "Icone de infraestrutura eficiente") },
      ],
    },
    {
      __component: "page.media-text-block",
      variant: "interface",
      heading: "INTERFACE OPERACIONAL",
      body: "<ul><li>Interface do usuario baseada na web, hospedada em um servidor web embarcado.</li><li>Acesso remoto por meio de conexao segura via intranet ou internet.</li><li>Controle total dos parametros de aquisicao (largura de pulso, gauge length, taxa de amostragem e decimacao).</li><li>Alarmes configuraveis para deteccao e localizacao precisas de anomalias.</li></ul>",
      mediaPosition: "left",
      media: media(40, "/assets/img/interface-monitors.png", "Interface operacional - monitor com graficos DAS e laptop com mapa de monitoramento"),
    },
  ],
};

const aboutPartners = [
  { id: 400, name: "Petrobras", sortOrder: 1, logo: media(400, "/assets/img/partners/petrobras.png", "Petrobras") },
  { id: 401, name: "SEBRAE", sortOrder: 2, logo: media(401, "/assets/img/partners/sebrae.png", "SEBRAE") },
  { id: 402, name: "Instituto Aqualie", sortOrder: 3, logo: media(402, "/assets/img/partners/instituto-aqualie.png", "Instituto Aqualie") },
  { id: 403, name: "NVIDIA", sortOrder: 4, logo: media(403, "/assets/img/partners/nvidia.png", "NVIDIA") },
  { id: 404, name: "CNPq", sortOrder: 5, logo: media(404, "/assets/img/partners/cnpq.png", "CNPq") },
  { id: 405, name: "SEAFOM", sortOrder: 6, logo: media(405, "/assets/img/partners/seafom.png", "SEAFOM - Fiber Optic Monitoring Group") },
  { id: 406, name: "ouronova", sortOrder: 7, logo: media(406, "/assets/img/partners/ouronova.png", "ouronova - inovacoes tecnologicas") },
  { id: 407, name: "UTFPR", sortOrder: 8, logo: media(407, "/assets/img/partners/utfpr.png", "UTFPR - Universidade Tecnologica Federal do Parana") },
];

const aboutPagePt: CmsPage = {
  id: 4,
  title: "Quem somos",
  slug: "quem-somos",
  locale: "pt-BR",
  seo: { title: "Quem somos | Immer Messen", description: "Origem academica, P&D aplicado e capacidade de entrega." },
  blocks: [
    {
      __component: "page.about-content-block",
      title: "QUEM SOMOS",
      rows: [
        {
          mediaPosition: "left",
          media: media(410, "/assets/img/quem-somos.png", "Pesquisador em laboratorio de sensoriamento optico Immer Messen"),
          heading: "Nascemos nos laboratórios. Chegamos ao campo.",
          body: "<p>A Immer Messen tem origem na pesquisa de ponta desenvolvida na Universidade Tecnológica Federal do Paraná (UTFPR), em Curitiba. Foi dentro dos laboratórios da universidade que surgiu o primeiro interrogador DAS de desenvolvimento genuinamente nacional — resultado de anos de pesquisa aplicada em fotônica, metrologia óptica e processamento de sinais.</p><p>Esse DNA acadêmico não ficou no laboratório. Ele se traduziu em tecnologia proprietária, arquitetura de hardware independente de fornecedores externos e capacidade de desenvolvimento de algoritmos específicos para as condições operacionais da infraestrutura crítica brasileira.</p>",
        },
        {
          mediaPosition: "right",
          media: media(411, "/assets/img/quem-somos.png", "Equipe Immer Messen em ambiente de pesquisa"),
          heading: "Da pesquisa ao mercado, com validação de classe mundial",
          body: "<p>O reconhecimento do potencial tecnológico da Immer Messen veio antes mesmo do lançamento comercial. A Petrobras, maior operadora de infraestrutura de energia do país, selecionou a empresa como parceira em projeto de P&amp;D que validou a maturidade técnica do sistema e acelerou o desenvolvimento de aplicações para o segmento de óleo e gás.</p><p>Essa parceria resultou em projetos de pesquisa aplicada voltados ao monitoramento de reservatórios, com foco em armazenamento, tratamento e distribuição de dados DFOS para aplicações de sensoriamento em poços e infraestrutura subsuperficial — posicionando a Immer Messen como referência técnica nacional no segmento.</p>",
        },
      ],
      highlight: {
        badgeLabel: "INCEPTION PROGRAM",
        leftHeading: "Membro do NVIDIA Inception Program",
        leftBody: "<p>A Immer Messen integra o NVIDIA Inception Program, iniciativa global de suporte a startups de deep-tech e inteligência artificial — reconhecimento do papel estratégico que os algoritmos de IA desempenham na plataforma da empresa e do alinhamento com a fronteira tecnológica em aceleração de modelos de machine learning aplicados a dados de sensoriamento distribuído.</p>",
        media: media(412, "/assets/img/quem-somos-02.png", "Interrogador DATS Immer Messen instalado em rack"),
        rightHeading: "Pioneirismo Brasileiro",
        rightBody: "<p>Somos o único desenvolvedor brasileiro de tecnologia DFOS com hardware proprietário, algoritmos de IA treinados com dados de campo nacionais e capacidade de entrega de solução completa — do interrogador óptico à plataforma de monitoramento contínuo. Nossa estrutura local permite suporte ágil, precificação competitiva e integração nativa aos requisitos regulatórios do mercado brasileiro.</p>",
      },
    },
    {
      __component: "page.partners-block",
      heading: "Nossos parceiros:",
      partners: aboutPartners,
    },
  ],
};

const lgpdPagePt: CmsPage = {
  id: 6,
  title: "LGPD",
  slug: "lgpd",
  locale: "pt-BR",
  seo: { title: "Politica de Privacidade & LGPD | Immer Messen", description: "Politica de privacidade e tratamento de dados pessoais." },
  blocks: [
    {
      __component: "page.page-hero-block",
      title: "Politica de Privacidade & LGPD",
      subtitle: "Como tratamos seus dados pessoais em conformidade com a Lei Geral de Protecao de Dados.",
      posterImage: media(50, "/assets/img/hero-home.png", "Imagem decorativa LGPD"),
    },
    {
      __component: "page.lgpd-content-block",
      summaryTitle: "Ultima atualizacao: maio de 2026",
      sections: [
        { title: "1. Introducao", content: "<p>A Immer Messen valoriza a privacidade e a protecao dos dados pessoais dos seus usuarios, clientes e parceiros. Esta Politica de Privacidade descreve, de forma clara e transparente, como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os dados pessoais em conformidade com a Lei Geral de Protecao de Dados (Lei n 13.709/2018 - LGPD).</p>" },
        { title: "2. Dados coletados", content: "<p>Coletamos dados fornecidos diretamente por voce - como nome, e-mail, empresa, cargo e mensagem em formularios de contato - bem como dados de navegacao coletados de forma automatizada (endereco IP, tipo de dispositivo, sistema operacional, paginas visitadas e horarios de acesso) por meio de cookies e tecnologias similares.</p>" },
        { title: "3. Finalidade do tratamento", content: "<p>Os dados sao tratados para responder as solicitacoes de contato, fornecer informacoes sobre nossas solucoes, melhorar a experiencia de navegacao, realizar analises estatisticas, atender obrigacoes legais ou regulatorias e proteger nossos legitimos interesses.</p>" },
        { title: "4. Base legal", content: "<p>O tratamento de dados pessoais pela Immer Messen ocorre com fundamento em uma das bases legais previstas no artigo 7 da LGPD, incluindo o consentimento do titular, o cumprimento de obrigacao legal, a execucao de contrato e o legitimo interesse.</p>" },
        { title: "5. Direitos do titular", content: "<p>O titular dos dados pode, a qualquer momento, solicitar confirmacao de tratamento, acesso, correcao, anonimizacao, portabilidade, eliminacao, informacao sobre compartilhamento e revogacao do consentimento.</p>" },
      ],
    },
  ],
};

const technologyPageEn: CmsPage = {
  id: 2,
  title: "Technology",
  slug: "technology",
  locale: "en",
  seo: {
    title: "Technology | Immer Messen",
    description: "Meet the DATS interrogator - DAS and DTS integrated in a single unit.",
  },
  blocks: [
    {
      __component: "page.page-hero-block",
      title: "Immer Messen DAS/DTS technology",
      subtitle: "Proprietary platform for acquisition, processing and operational intelligence.",
      backgroundVideo: media(20, "/assets/video/Interrogador.webm", "Interrogator video"),
    },
    {
      __component: "page.media-text-block",
      variant: "tech-band",
      heading: "Compact integrated design: optical sensing, electronics and edge computing combined in a single unit.",
      body: "",
      media: media(21, "/assets/img/interrogador-front.png", "DATS interrogator - front view"),
      ctaLabel: "Download datasheet",
      ctaHref: "#",
    },
    {
      __component: "page.feature-grid-block",
      heading: "KEY FEATURES",
      cards: [
        { title: "Phase-based DAS technology", description: "for quantitative measurements of strain, acoustics and temperature.", icon: media(31, "/assets/img/kf/01-fase.png", "Phase-based DAS technology icon") },
        { title: "Wide frequency response:", description: "monitoring from ultra-low frequencies up to tens of kHz.", icon: media(32, "/assets/img/kf/02-frequencia.png", "Frequency icon") },
        { title: "Range up to 120 km:", description: "simultaneous monitoring of two fibers up to 60 km each with a single interrogator.", icon: media(33, "/assets/img/kf/03-alcance.png", "Range icon") },
        { title: "Integrated DAS | DTS:", description: "simultaneous DAS and DTS measurements on the same optical fiber.", icon: media(34, "/assets/img/kf/04-das-dts.png", "Integrated DAS and DTS icon") },
        { title: "High sensitivity:", description: "detection of axial stimuli at pico-strain and milliKelvin scale on standard single-mode fiber.", icon: media(35, "/assets/img/kf/05-sensibilidade.png", "Sensitivity icon") },
        { title: "Efficient infrastructure:", description: "compatible with standard fiber and low energy consumption (300 W).", icon: media(36, "/assets/img/kf/06-infraestrutura.png", "Efficient infrastructure icon") },
      ],
    },
    {
      __component: "page.media-text-block",
      variant: "interface",
      heading: "OPERATIONAL INTERFACE",
      body: "<ul><li>Web-based user interface hosted on an embedded web server.</li><li>Secure remote access via intranet or internet.</li><li>Full control over acquisition parameters (pulse width, gauge length, sampling rate and decimation).</li><li>Configurable alarms for precise anomaly detection and localization.</li></ul>",
      mediaPosition: "left",
      media: media(40, "/assets/img/interface-monitors.png", "Operational interface - monitor with DAS charts and laptop with monitoring map"),
    },
  ],
};

const technologyPageEs: CmsPage = {
  id: 2,
  title: "Tecnologia",
  slug: "tecnologia",
  locale: "es",
  seo: {
    title: "Tecnologia | Immer Messen",
    description: "Conozca el interrogador DATS - DAS y DTS integrados en una sola unidad.",
  },
  blocks: [
    {
      __component: "page.page-hero-block",
      title: "Tecnologia DAS/DTS Immer Messen",
      subtitle: "Plataforma propietaria para adquisicion, procesamiento e inteligencia operacional.",
      backgroundVideo: media(20, "/assets/video/Interrogador.webm", "Video del interrogador"),
    },
    {
      __component: "page.media-text-block",
      variant: "tech-band",
      heading: "Diseno compacto e integrado: sensado optico, electronica y edge computing reunidos en una sola unidad.",
      body: "",
      media: media(21, "/assets/img/interrogador-front.png", "Interrogador DATS - vista frontal"),
      ctaLabel: "Descargar datasheet",
      ctaHref: "#",
    },
    {
      __component: "page.feature-grid-block",
      heading: "KEY FEATURES",
      cards: [
        { title: "Tecnologia DAS basada en fase", description: "para mediciones cuantitativas de deformacion, acustica y temperatura.", icon: media(31, "/assets/img/kf/01-fase.png", "Icono tecnologia DAS basada en fase") },
        { title: "Amplia respuesta en frecuencia:", description: "monitoreo desde frecuencias ultrabajas hasta decenas de kHz.", icon: media(32, "/assets/img/kf/02-frequencia.png", "Icono de frecuencia") },
        { title: "Alcance de hasta 120 km:", description: "monitoreo simultaneo de dos fibras de hasta 60 km cada una con un solo interrogador.", icon: media(33, "/assets/img/kf/03-alcance.png", "Icono de alcance") },
        { title: "DAS | DTS integrado:", description: "mediciones simultaneas de DAS y DTS en la misma fibra optica.", icon: media(34, "/assets/img/kf/04-das-dts.png", "Icono DAS y DTS integrados") },
        { title: "Alta sensibilidad:", description: "deteccion de estimulos axiales a escala pico-strain y miliKelvin con fibra monomodo estandar.", icon: media(35, "/assets/img/kf/05-sensibilidade.png", "Icono de sensibilidad") },
        { title: "Infraestructura eficiente:", description: "compatible con fibra optica estandar y bajo consumo de energia (300 W).", icon: media(36, "/assets/img/kf/06-infraestrutura.png", "Icono de infraestructura eficiente") },
      ],
    },
    {
      __component: "page.media-text-block",
      variant: "interface",
      heading: "INTERFAZ OPERACIONAL",
      body: "<ul><li>Interfaz de usuario basada en web, alojada en un servidor web embebido.</li><li>Acceso remoto seguro por intranet o internet.</li><li>Control total de parametros de adquisicion (ancho de pulso, gauge length, tasa de muestreo y decimacion).</li><li>Alarmas configurables para deteccion y localizacion precisas de anomalias.</li></ul>",
      mediaPosition: "left",
      media: media(40, "/assets/img/interface-monitors.png", "Interfaz operacional - monitor con graficos DAS y laptop con mapa de monitoreo"),
    },
  ],
};

const aboutPageEn: CmsPage = {
  id: 4,
  title: "About us",
  slug: "about",
  locale: "en",
  seo: { title: "About | Immer Messen", description: "Academic origin, applied R&D and field-ready capability." },
  blocks: [
    {
      __component: "page.about-content-block",
      title: "ABOUT US",
      rows: [
        {
          mediaPosition: "left",
          media: media(410, "/assets/img/quem-somos.png", "Researcher at the Immer Messen optical sensing lab"),
          heading: "Born in the labs. Proven in the field.",
          body: "<p>Immer Messen originates from cutting-edge research developed at the Federal University of Technology - Paraná (UTFPR) in Curitiba. The first genuinely Brazilian DAS interrogator was built inside the university's labs - the result of years of applied research in photonics, optical metrology and signal processing.</p><p>That academic DNA didn't stay in the lab. It evolved into proprietary technology, a hardware architecture independent of external vendors, and the capability to develop algorithms specific to the operating conditions of Brazilian critical infrastructure.</p>",
        },
        {
          mediaPosition: "right",
          media: media(411, "/assets/img/quem-somos.png", "Immer Messen team in a research environment"),
          heading: "From research to market, with world-class validation",
          body: "<p>Recognition of Immer Messen's technological potential arrived even before its commercial launch. Petrobras, the country's largest energy infrastructure operator, selected the company as a partner in an R&amp;D project that validated the system's technical maturity and accelerated the development of applications for the oil and gas segment.</p><p>This partnership produced applied research projects focused on reservoir monitoring - with emphasis on storage, processing and distribution of DFOS data for downhole and subsurface sensing - positioning Immer Messen as the national technical reference in the segment.</p>",
        },
      ],
      highlight: {
        badgeLabel: "INCEPTION PROGRAM",
        leftHeading: "Member of the NVIDIA Inception Program",
        leftBody: "<p>Immer Messen is part of the NVIDIA Inception Program, a global initiative supporting deep-tech and AI startups - recognition of the strategic role that AI algorithms play in the company's platform and of its alignment with the technological frontier in accelerating machine learning models applied to distributed sensing data.</p>",
        media: media(412, "/assets/img/quem-somos-02.png", "Immer Messen DATS interrogator installed in rack"),
        rightHeading: "Brazilian Pioneering",
        rightBody: "<p>We are the only Brazilian developer of DFOS technology with proprietary hardware, AI algorithms trained on national field data, and the capability to deliver a full solution - from optical interrogator to continuous monitoring platform. Our local structure enables agile support, competitive pricing and native compliance with Brazilian regulatory requirements.</p>",
      },
    },
    {
      __component: "page.partners-block",
      heading: "Our partners:",
      partners: aboutPartners,
    },
  ],
};

const aboutPageEs: CmsPage = {
  id: 4,
  title: "Quienes somos",
  slug: "quienes-somos",
  locale: "es",
  seo: { title: "Quienes somos | Immer Messen", description: "Origen academico, I+D aplicado y capacidad de entrega." },
  blocks: [
    {
      __component: "page.about-content-block",
      title: "QUIÉNES SOMOS",
      rows: [
        {
          mediaPosition: "left",
          media: media(410, "/assets/img/quem-somos.png", "Investigador en el laboratorio de sensado óptico de Immer Messen"),
          heading: "Nacimos en los laboratorios. Llegamos al campo.",
          body: "<p>Immer Messen tiene origen en la investigación de punta desarrollada en la Universidad Tecnológica Federal de Paraná (UTFPR), en Curitiba. Fue dentro de los laboratorios de la universidad donde surgió el primer interrogador DAS de desarrollo genuinamente brasileño - resultado de años de investigación aplicada en fotónica, metrología óptica y procesamiento de señales.</p><p>Ese ADN académico no se quedó en el laboratorio. Se tradujo en tecnología propietaria, arquitectura de hardware independiente de proveedores externos y capacidad para desarrollar algoritmos específicos para las condiciones operativas de la infraestructura crítica brasileña.</p>",
        },
        {
          mediaPosition: "right",
          media: media(411, "/assets/img/quem-somos.png", "Equipo Immer Messen en ambiente de investigación"),
          heading: "De la investigación al mercado, con validación de clase mundial",
          body: "<p>El reconocimiento del potencial tecnológico de Immer Messen llegó incluso antes del lanzamiento comercial. Petrobras, el mayor operador de infraestructura de energía del país, seleccionó a la empresa como aliada en un proyecto de I+D que validó la madurez técnica del sistema y aceleró el desarrollo de aplicaciones para el segmento de petróleo y gas.</p><p>Esta alianza resultó en proyectos de investigación aplicada orientados al monitoreo de reservorios, con enfoque en almacenamiento, tratamiento y distribución de datos DFOS para aplicaciones de sensado en pozos e infraestructura subsuperficial - posicionando a Immer Messen como referencia técnica nacional en el segmento.</p>",
        },
      ],
      highlight: {
        badgeLabel: "INCEPTION PROGRAM",
        leftHeading: "Miembro del NVIDIA Inception Program",
        leftBody: "<p>Immer Messen integra el NVIDIA Inception Program, iniciativa global de apoyo a startups de deep-tech e inteligencia artificial - reconocimiento del papel estratégico que los algoritmos de IA desempeñan en la plataforma de la empresa y del alineamiento con la frontera tecnológica en aceleración de modelos de machine learning aplicados a datos de sensado distribuido.</p>",
        media: media(412, "/assets/img/quem-somos-02.png", "Interrogador DATS Immer Messen instalado en rack"),
        rightHeading: "Pionerismo Brasileño",
        rightBody: "<p>Somos el único desarrollador brasileño de tecnología DFOS con hardware propietario, algoritmos de IA entrenados con datos de campo nacionales y capacidad de entrega de solución completa - del interrogador óptico a la plataforma de monitoreo continuo. Nuestra estructura local permite soporte ágil, precificación competitiva e integración nativa a los requisitos regulatorios del mercado brasileño.</p>",
      },
    },
    {
      __component: "page.partners-block",
      heading: "Nuestros aliados:",
      partners: aboutPartners,
    },
  ],
};

const lgpdPageEn: CmsPage = {
  id: 6,
  title: "Privacy Policy & LGPD",
  slug: "lgpd",
  locale: "en",
  seo: { title: "Privacy Policy & LGPD | Immer Messen", description: "How we handle your personal data." },
  blocks: [
    {
      __component: "page.page-hero-block",
      title: "Privacy Policy & LGPD",
      subtitle: "How we handle your personal data under Brazil's General Data Protection Law.",
      posterImage: media(50, "/assets/img/hero-home.png", "Decorative LGPD image"),
    },
    {
      __component: "page.lgpd-content-block",
      summaryTitle: "Last updated: May 2026",
      sections: [
        { title: "1. Introduction", content: "<p>Immer Messen values the privacy and protection of the personal data of its users, clients and partners. This Privacy Policy describes, in a clear and transparent way, how we collect, use, store, share and protect personal data in compliance with Brazil's General Data Protection Law (Law No. 13.709/2018 - LGPD).</p>" },
        { title: "2. Data collected", content: "<p>We collect data you provide directly - such as name, email, company, role and message in contact forms - as well as automatically collected navigation data (IP address, device type, operating system, pages visited and access times) through cookies and similar technologies.</p>" },
        { title: "3. Purpose of processing", content: "<p>Data is processed to respond to contact requests, provide information about our solutions, improve the browsing experience, perform statistical analyses, meet legal or regulatory obligations and protect our legitimate interests.</p>" },
        { title: "4. Legal basis", content: "<p>Processing is based on one of the legal grounds set out in article 7 of the LGPD, including the data subject's consent, compliance with legal obligation, performance of contract and legitimate interest.</p>" },
        { title: "5. Data subject rights", content: "<p>The data subject may, at any time, request confirmation of processing, access, correction, anonymization, portability, deletion, information on sharing and revocation of consent.</p>" },
      ],
    },
  ],
};

const lgpdPageEs: CmsPage = {
  id: 6,
  title: "Politica de Privacidad & LGPD",
  slug: "lgpd",
  locale: "es",
  seo: { title: "Politica de Privacidad & LGPD | Immer Messen", description: "Como tratamos sus datos personales." },
  blocks: [
    {
      __component: "page.page-hero-block",
      title: "Politica de Privacidad & LGPD",
      subtitle: "Como tratamos sus datos personales conforme a la Ley General de Proteccion de Datos.",
      posterImage: media(50, "/assets/img/hero-home.png", "Imagen decorativa LGPD"),
    },
    {
      __component: "page.lgpd-content-block",
      summaryTitle: "Ultima actualizacion: mayo de 2026",
      sections: [
        { title: "1. Introduccion", content: "<p>Immer Messen valora la privacidad y la proteccion de los datos personales de sus usuarios, clientes y socios. Esta Politica de Privacidad describe, de forma clara y transparente, como recopilamos, utilizamos, almacenamos, compartimos y protegemos los datos personales de acuerdo con la Ley General de Proteccion de Datos (Ley n 13.709/2018 - LGPD).</p>" },
        { title: "2. Datos recopilados", content: "<p>Recopilamos datos proporcionados directamente por usted - como nombre, correo electronico, empresa, cargo y mensaje en formularios de contacto - asi como datos de navegacion recopilados automaticamente (direccion IP, tipo de dispositivo, sistema operativo, paginas visitadas y horarios de acceso) mediante cookies y tecnologias similares.</p>" },
        { title: "3. Finalidad del tratamiento", content: "<p>Los datos son tratados para responder solicitudes de contacto, brindar informacion sobre nuestras soluciones, mejorar la experiencia de navegacion, realizar analisis estadisticos, atender obligaciones legales o regulatorias y proteger nuestros intereses legitimos.</p>" },
        { title: "4. Base legal", content: "<p>El tratamiento se ampara en una de las bases legales previstas en el articulo 7 de la LGPD, incluido el consentimiento del titular, el cumplimiento de obligacion legal, la ejecucion de contrato y el interes legitimo.</p>" },
        { title: "5. Derechos del titular", content: "<p>El titular puede, en cualquier momento, solicitar confirmacion de tratamiento, acceso, correccion, anonimizacion, portabilidad, eliminacion, informacion sobre compartilhamiento y revocacion del consentimiento.</p>" },
      ],
    },
  ],
};

type LocalizedMockPage = Partial<Record<SupportedLocale, CmsPage>>;

export const mockCmsPagesByKey: Record<string, LocalizedMockPage> = {
  home: {
    "pt-BR": homePagePt,
    en: homePageEn,
    es: homePageEs,
  },
  technology: {
    "pt-BR": technologyPagePt,
    en: technologyPageEn,
    es: technologyPageEs,
  },
  about: {
    "pt-BR": aboutPagePt,
    en: aboutPageEn,
    es: aboutPageEs,
  },
  lgpd: {
    "pt-BR": lgpdPagePt,
    en: lgpdPageEn,
    es: lgpdPageEs,
  },
};

export const mockCmsPage = homePagePt;
