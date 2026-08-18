const fs = require('fs');
const https = require('https');

const sites = [
  { url: 'https://compasslogistics.co.za', file: 'preview_compass.jpg' },
  { url: 'https://bossrides.co.za/wordpress_5', file: 'preview_boss.jpg' },
  { url: 'https://globalcolourcorrect.com', file: 'preview_colour.jpg' },
  { url: 'https://ayesham.co.za/products/design-your-mag-case', file: 'preview_ayesha.jpg' },
  { url: 'https://catoridge.netlify.app', file: 'preview_catoridge.jpg' },
  { url: 'https://propertyportfolio.netlify.app', file: 'preview_property.jpg' }
];

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${data.substring(0, 100)}`));
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: Status Code ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const site of sites) {
    console.log(`Fetching screenshot metadata for ${site.url}...`);
    try {
      // Use Microlink API to get screenshot metadata
      const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(site.url)}&screenshot=true`;
      const response = await getJson(apiUrl);
      if (response.status === 'success' && response.data && response.data.screenshot && response.data.screenshot.url) {
        const screenshotUrl = response.data.screenshot.url;
        console.log(`Downloading screenshot from ${screenshotUrl} to ${site.file}...`);
        await downloadFile(screenshotUrl, site.file);
        console.log(`Successfully saved ${site.file}`);
      } else {
        console.error(`Failed to get screenshot URL for ${site.url}:`, response);
      }
    } catch (error) {
      console.error(`Error processing ${site.url}:`, error.message);
    }
  }
}

run();
