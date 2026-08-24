import fs from 'fs';

// Let's parse all image URLs with their context or surrounding text
function extractImagesFromHtml(html) {
  const matches = [];
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const src = match[1];
    const altMatch = fullTag.match(/alt="([^"]*)"/);
    const alt = altMatch ? altMatch[1] : '';
    matches.push({ src, alt, fullTag });
  }
  return matches;
}

const pages = ['homepage', 'approach', 'aiappbuilder', 'dubaiai', 'sony', 'thefriedkingroup', 'amnhealthcare'];
const extracted = {};

for (const p of pages) {
  const html = fs.readFileSync(`./dump/${p}.html`, 'utf-8');
  extracted[p] = {
    images: extractImagesFromHtml(html)
  };
}

console.log(JSON.stringify(extracted, null, 2));
