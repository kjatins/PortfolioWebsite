import fs from 'fs';

// Let's parse all CSS rules and colors from the dump files
const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
  
  // Extract CSS variables or color values
  const bgMatches = Array.from(new Set(Array.from(html.matchAll(/(rgb\([0-9,\s]+\)|#[0-9a-fA-F]{3,8}|rgba\([0-9,\s\.]+\))/g)).map(m => m[0])));
  console.log(`\nPAGE ${p}: Colors sample:`, bgMatches.slice(0, 15));
}
