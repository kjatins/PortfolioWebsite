import fs from 'fs';

const pages = [
  { name: 'homepage', url: 'https://smaller-estimate-698488.framer.app/' },
  { name: 'approach', url: 'https://smaller-estimate-698488.framer.app/approach' },
  { name: 'aiappbuilder', url: 'https://smaller-estimate-698488.framer.app/aiappbuilder' },
  { name: 'dubaiai', url: 'https://smaller-estimate-698488.framer.app/dubaiai' },
  { name: 'sony', url: 'https://smaller-estimate-698488.framer.app/sony' },
  { name: 'thefriedkingroup', url: 'https://smaller-estimate-698488.framer.app/thefriedkingroup' },
  { name: 'amnhealthcare', url: 'https://smaller-estimate-698488.framer.app/amnhealthcare' }
];

async function fetchAll() {
  if (!fs.existsSync('./dump')) {
    fs.mkdirSync('./dump');
  }
  for (const p of pages) {
    try {
      console.log(`Fetching ${p.name}...`);
      const res = await fetch(p.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const html = await res.text();
      fs.writeFileSync(`./dump/${p.name}.html`, html);
      console.log(`Saved ${p.name} (${html.length} chars)`);
    } catch (e) {
      console.error(`Failed ${p.name}:`, e);
    }
  }
}

fetchAll();
