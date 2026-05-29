import fs from 'node:fs/promises';

async function main() {
  const file = await fs.readFile('/Users/fabiomonteiro/projects/immer-messen/apps/cms/scripts/local-cases-dump.json', 'utf-8');
  const localesData = JSON.parse(file);

  // Group by documentId
  const casesMap = new Map();

  for (const loc of localesData) {
    const locale = loc.locale;
    const items = loc.data;

    for (const item of items) {
      const docId = item.documentId;
      if (!casesMap.has(docId)) {
        casesMap.set(docId, {});
      }
      const entry = casesMap.get(docId);
      entry.documentId = docId;
      entry.slug = item.slug; // Note: slug might differ across locales or be the same.

      entry.sectorCategory = item.sectorCategory;
      console.log('Item keys:', Object.keys(item));
      if (item.applicationAreas) {
        console.log('applicationAreas value:', item.applicationAreas);
      }

      if (item.applicationAreas) {
        entry.applicationAreaKeys = item.applicationAreas.map(a => a.key || a.slug);
      }
      if (item.coverImage) {
        // Find filename or some key
        entry.coverImageName = item.coverImage.name;
        entry.coverImageMime = item.coverImage.mime;
      }
      if (item.heroMedia) {
        entry.heroMediaName = item.heroMedia.name;
        entry.heroMediaMime = item.heroMedia.mime;
      }

      entry[locale] = {
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        challenge: item.challenge,
        solution: item.solution,
        results: item.results,
        body: item.body,
        seoTitle: item.seo?.title || item.title,
        seoDescription: item.seo?.description || item.summary,
      };

    }
  }

  console.log('Parsed Case Studies list:');
  for (const [docId, info] of casesMap.entries()) {
    console.log(`- Document ID: ${docId}`);
    console.log(`  Sector: ${info.sectorCategory}`);
    console.log(`  Cover image: ${info.coverImageName}`);
    console.log(`  Hero media: ${info.heroMediaName}`);
    console.log(`  Locales: ${Object.keys(info).filter(k => ['pt-BR', 'en', 'es'].includes(k)).join(', ')}`);
    console.log(`  pt-BR Slug: ${info['pt-BR']?.slug} | Title: ${info['pt-BR']?.title}`);
    console.log(`  en Slug: ${info['en']?.slug} | Title: ${info['en']?.title}`);
    console.log(`  es Slug: ${info['es']?.slug} | Title: ${info['es']?.title}`);
    console.log('---');
  }



  // Also print the formatted code block for caseStudyDefs
  const caseStudyDefs = Array.from(casesMap.values());
  await fs.writeFile(
    '/Users/fabiomonteiro/projects/immer-messen/apps/cms/scripts/formatted-defs.json',
    JSON.stringify(caseStudyDefs, null, 2),
    'utf-8'
  );
  console.log('Saved formatted-defs.json');
}

main().catch(console.error);
