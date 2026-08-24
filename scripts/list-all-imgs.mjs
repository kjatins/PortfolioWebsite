import fs from 'fs';

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
  console.log(`\n=================== ${p.toUpperCase()} IMAGES ===================`);
  const imgs = Array.from(html.matchAll(/https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9_-]+\.(png|jpg|jpeg|svg|webp))/g)).map(m => m[0]);
  const unique = Array.from(new Set(imgs));
  unique.forEach((img, i) => {
    console.log(`${i+1}. ${img}`);
  });
}
