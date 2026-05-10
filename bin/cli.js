#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];

const DESIGN_MD_URL =
  'https://raw.githubusercontent.com/om-1115/iql-design/main/Design.md';

if (command === 'add' && target === 'docs') {
  console.log('📥 Fetching Design.md...');

  https.get(DESIGN_MD_URL, (res) => {
    if (res.statusCode !== 200) {
      console.error(`❌ Failed: HTTP ${res.statusCode}`);
      process.exit(1);
    }
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      const outPath = path.join(process.cwd(), 'Design.md');
      fs.writeFileSync(outPath, data);
      console.log(`✅ Created ${outPath}`);
    });
  }).on('error', (err) => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  });
} else {
  console.log('Usage: npx iql-design@latest add docs');
}