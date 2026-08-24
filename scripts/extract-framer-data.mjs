import fs from 'fs';

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];

async function inspectModules() {
  for (const p of pages) {
    const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
    const mjsMatches = Array.from(html.matchAll(/https:\/\/framerusercontent\.com\/sites\/[a-zA-Z0-9_\/-]+\.mjs/g)).map(m => m[0]);
    console.log(`\nPage ${p} has ${mjsMatches.length} mjs scripts`);
    
    // Download each mjs script and search for text content
    let fullText = '';
    for (const url of mjsMatches) {
      const filename = url.split('/').pop();
      const localPath = `./dump/${filename}`;
      if (!fs.existsSync(localPath)) {
        try {
          const res = await fetch(url);
          const code = await res.text();
          fs.writeFileSync(localPath, code);
        } catch (e) {
          console.error(`Failed to fetch ${url}:`, e);
        }
      }
    }
  }
}

inspectModules();
