import http from 'node:http';
import fs from 'node:fs/promises';

const STRAPI_URL = 'http://127.0.0.1:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
if (!STRAPI_API_TOKEN) {
  console.error('Defina STRAPI_API_TOKEN no ambiente antes de rodar este script.');
  process.exit(1);
}

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

