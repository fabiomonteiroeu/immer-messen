import http from 'node:http';

const STRAPI_API_TOKEN = 'ef6a07344eaf4c727141ef7922ae061736938dca2c6cb0efa11338ce98079b8b99257589f536c4ec68684bd7c993af2a754d6541b4d057889c1c43ffa6c493f3de18ed14ab047df0f9f51a00e8552913d69c60c6dcdb25b7618aa45ed5e3de1bc9b358c7e84546416997b2ae31ec406d7e26bc5ebb8ed72b79607d9a03175192';

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
