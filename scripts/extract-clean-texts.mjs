import fs from 'fs';

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
  
  // Extract all text inside tags, preserving order
  // Clean scripts and styles
  const cleanHtml = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '');

  const textMatches = Array.from(cleanHtml.matchAll(/>([^<]+)</g))
    .map(m => m[1].replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim())
    .filter(t => t.length > 0 && !t.includes('__framer') && !t.startsWith('var '));

  console.log(`\n======================================================`);
  console.log(`PAGE: ${p.toUpperCase()} (${textMatches.length} text items)`);
  
  // Group consecutive identical lines or deduplicate adjacent
  const cleaned = [];
  for (const t of textMatches) {
    if (cleaned.length === 0 || cleaned[cleaned.length - 1] !== t) {
      cleaned.push(t);
    }
  }
  
  console.log(cleaned.join('\n--- '));
}
