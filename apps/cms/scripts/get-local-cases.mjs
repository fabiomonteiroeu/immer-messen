import http from 'node:http';
import fs from 'node:fs/promises';

const STRAPI_URL = 'http://127.0.0.1:1337';
const STRAPI_API_TOKEN = 'ef6a07344eaf4c727141ef7922ae061736938dca2c6cb0efa11338ce98079b8b99257589f536c4ec68684bd7c993af2a754d6541b4d057889c1c43ffa6c493f3de18ed14ab047df0f9f51a00e8552913d69c60c6dcdb25b7618aa45ed5e3de1bc9b358c7e84546416997b2ae31ec406d7e26bc5ebb8ed72b79607d9a03175192';

function get(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Connection': 'keep-alive'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  const locales = ['pt-BR', 'en', 'es'];
  const allCases = [];

  for (const locale of locales) {
    try {
      const url = `${STRAPI_URL}/api/case-studies?locale=${locale}&populate[0]=coverImage&populate[1]=heroMedia&populate[2]=applicationAreas&populate[3]=seo&status=draft`;
      const json = await get(url);
      allCases.push({ locale, data: json.data });
    } catch (err) {
      console.error(`Failed to fetch for ${locale}:`, err.message);
    }
  }


  await fs.writeFile(

    '/Users/fabiomonteiro/projects/immer-messen/apps/cms/scripts/local-cases-dump.json',
    JSON.stringify(allCases, null, 2),
    'utf-8'
  );
  console.log('Saved to local-cases-dump.json');
}

run().catch(console.error);

