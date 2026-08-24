import fs from 'fs';

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
  
  // Extract title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  // Extract meta description
  const descMatch = html.match(/<meta name="description" content="(.*?)">/);
  const desc = descMatch ? descMatch[1] : '';

  // Extract all image URLs from framerusercontent
  const images = Array.from(new Set(Array.from(html.matchAll(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_-]+\.[a-z0-9]+/g)).map(m => m[0])));
  
  // Extract text nodes roughly
  // Look for framer text elements or readable chunks
  const texts = Array.from(new Set(
    Array.from(html.matchAll(/>([^<>{}\n\t]{3,})</g))
      .map(m => m[1].trim())
      .filter(t => !t.startsWith('var ') && !t.includes('__framer') && !t.includes('!function') && !t.includes('window.') && t.length > 2)
  ));

  console.log(`\n========================================`);
  console.log(`PAGE: ${p}`);
  console.log(`TITLE: ${title}`);
  console.log(`DESC: ${desc}`);
  console.log(`IMAGES COUNT: ${images.length}`);
  console.log(`SAMPLE IMAGES:`, images.slice(0, 8));
  console.log(`TEXT EXTRACT SAMPLE (first 25 chunks):`);
  console.log(texts.slice(0, 30).join(' \n| '));
}
