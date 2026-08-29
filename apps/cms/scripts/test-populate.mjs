import http from 'node:http';

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
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
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

async function test(query) {
  const url = `http://127.0.0.1:1337/api/case-studies?${query}`;
  try {
    const res = await get(url);
    const item = res.data?.[0];
    console.log(`Query: ${query}`);
    console.log(`  Keys:`, item ? Object.keys(item) : 'no data');
    if (item && item.applicationAreas) {
      console.log(`  applicationAreas count:`, item.applicationAreas.length);
    }
  } catch (err) {
    console.log(`Query ${query} failed:`, err.message);
  }
}

async function main() {
  try {
    const res = await get('http://127.0.0.1:1337/api/application-areas');
    console.log('application-areas API success. Count:', res.data?.length);
  } catch (err) {
    console.log('application-areas API failed:', err.message);
  }
  await test('populate=*');
  await test('populate[applicationAreas]=true&populate[coverImage]=true&populate[heroMedia]=true&populate[seo]=true');
}


main().catch(console.error);
