import fs from 'fs';

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai'];

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
  console.log(`\n=================== ${p.toUpperCase()} ORDERED IMAGES ===================`);
  
  const imgTags = Array.from(html.matchAll(/<img[^>]+>/g)).map(m => m[0]);
  imgTags.forEach((tag, idx) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const pos = html.indexOf(tag);
    const snippetBefore = html.slice(Math.max(0, pos - 300), pos).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const snippetAfter = html.slice(pos, Math.min(html.length, pos + 300)).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`\n[${idx + 1}] SRC: ${src}`);
    console.log(`  BEFORE: "${snippetBefore.slice(-120)}"`);
    console.log(`  AFTER:  "${snippetAfter.slice(0, 120)}"`);
  });
}
