# Estratégia de Integração de Notícias do LinkedIn via Strapi + Make/Zapier

Este documento detalha o planejamento, arquitetura e um prompt estruturado para migrar a exibição de notícias do site da Immer Messen de um widget de terceiros (Elfsight) para uma arquitetura nativa com melhor performance de Core Web Vitals (LCP, TBT) e indexação completa de SEO.

---

## 🏗️ Visão Geral da Arquitetura (Estratégia 03)

```
[Post no LinkedIn] ──(Make/Zapier)──> [API do Strapi (Criação do Post)] ──(Webhook)──> [Next.js (Purga de Cache)] ──> [Usuário final com HTML Estático]
```

### Componentes:
1. **Gatilho (LinkedIn):** Novo post publicado na LinkedIn Company Page da Immer Messen.
2. **Orquestrador de Integração (Make.com ou Zapier):** Escuta o gatilho do LinkedIn, faz o parse da imagem e do texto, e dispara uma chamada HTTP POST para o Strapi.
3. **Repositório Editorial (Strapi):** Armazena a postagem no Content Type `news-article` e dispara um Webhook para o Next.js informando a atualização do conteúdo.
4. **Renderização Estática (Next.js):** Reconstrói a página da Home ou de Notícias (ISR) gerando HTML estático puro de altíssima velocidade.

---

## 🛠️ Passo a Passo da Implementação Futura

### Fase 1: Configuração no Strapi
1. Acesse o Strapi Admin.
2. Certifique-se de que a API de posts existe (o Content Type `news-article` já está estruturado no backend).
3. Em **Settings > Users & Permissions Plugin > Roles**, edite a role **Public**.
4. Procure por `news-article` e marque as ações `find` e `findOne` para permitir que o Next.js consuma a API publicamente.
5. Obtenha ou crie um Token de API em **Settings > API Tokens** (se necessário para a autenticação do Make/Zapier).

### Fase 2: Configuração da Automação (Make.com)
1. Crie uma conta gratuita em [Make.com](https://www.make.com/).
2. Crie um novo **Scenario**:
   * **Módulo Gatilho:** LinkedIn (evento: *Watch Company Shares* ou *Watch Updates*).
   * **Módulo de Ação:** HTTP (*Make a request*) ou módulo do Strapi (se disponível).
3. Configure a chamada HTTP POST para o seu Strapi:
   * **URL:** `https://<dominio-do-strapi>/api/news-articles`
   * **Method:** `POST`
   * **Headers:** `Authorization: Bearer <SEU_API_TOKEN_DO_STRAPI>`
   * **Body JSON:** Mapeie o texto do LinkedIn no campo `body` ou `summary`, o título, e insira a imagem no repositório de mídia (ou salve a URL da imagem externa para renderização direta).

### Fase 3: Modificação no Frontend (Next.js)
1. **Remoção do Widget:** No arquivo `apps/web/components/ui/news-block.tsx`, remova o componente `<Script>` do Elfsight e o contêiner `elfsight-app-...`.
2. **Consumo da API:** Crie um arquivo `apps/web/lib/cms/news.ts` para buscar as notícias do Strapi na rota `/api/case-studies` (adaptado para notícias: `/api/news-articles`).
3. **Renderização Nativa:** Crie um layout de carrossel de notícias ou grade usando componentes React simples no arquivo `apps/web/components/ui/news-block.tsx` para exibir os dados reais retornados.

---

## 🚀 PROMPT DE EXECUÇÃO (Copie e cole para a IA no futuro)

Quando você decidir fazer essa migração, forneça o seguinte prompt para o assistente de codificação:

```markdown
Olá! Gostaria de migrar a integração de notícias do LinkedIn do Elfsight (Estratégia 1) para a integração via Strapi + Next.js nativo (Estratégia 3). 

A API de notícias do Strapi no backend já está estruturada no diretório `apps/cms/src/api/news-article`.

Por favor, faça as seguintes tarefas no código do frontend:

1. Crie os schemas Zod necessários em `apps/web/lib/cms/schemas.ts` para o Content Type `news-article`. Os campos esperados do Strapi são:
   - title: string
   - summary: string (opcional)
   - content: string (rich text)
   - slug: string
   - publishedAt: string/date
   - coverImage: cmsMediaSchema (opcional)

2. Crie a função de busca `getNewsArticles` no arquivo `apps/web/lib/cms/news.ts` com suporte a internacionalização (locale) e revalidação por tags (tag: "news").

3. Refatore o componente `NewsBlock` em `apps/web/components/ui/news-block.tsx` para:
   - Receber a lista de notícias (articles) como propriedade.
   - Renderizar nativamente um grid ou carrossel responsivo usando os dados do Strapi (título, resumo, imagem de capa resolvida com resolveMediaUrl e link).
   - Remover qualquer referência ao script e widget do Elfsight.

4. Atualize o componente `NewsCarouselSection` em `apps/web/components/ui/page-blocks.tsx` para buscar os dados de notícias de forma assíncrona antes de renderizar o `NewsBlock`.

5. Limpe as variáveis de ambiente `NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID` nos arquivos `.env` e `.env.example`.
```
