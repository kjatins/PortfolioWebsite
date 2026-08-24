import fs from 'fs';

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');

  // Let's find all script chunks or text fragments inside data-framer-component or similar
  console.log(`\n======================================================`);
  console.log(`PAGE: ${p}`);
  
  // Extract all <a> hrefs
  const links = Array.from(new Set(Array.from(html.matchAll(/href="([^"]+)"/g)).map(m => m[1])));
  console.log(`LINKS:`, links.filter(l => !l.startsWith('https://fonts') && !l.includes('.woff') && !l.includes('.svg')));

  // Extract all image tags with src / alt / width / height / srcset
  const imgMatches = Array.from(html.matchAll(/<img[^>]+>/g)).map(m => m[0]);
  console.log(`IMG TAGS COUNT:`, imgMatches.length);
  imgMatches.forEach((img, i) => {
    const src = img.match(/src="([^"]+)"/)?.[1];
    const alt = img.match(/alt="([^"]*)"/)?.[1];
    console.log(`  Img #${i+1}: src=${src?.slice(0, 60)}... alt="${alt}"`);
  });
}
