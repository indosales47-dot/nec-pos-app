const fs = require('fs');
const path = require('path');

const libsDir = path.join(__dirname, 'www', 'libs');
fs.mkdirSync(libsDir, { recursive: true });

const files = [
  { name: 'tailwind.js', url: 'https://cdn.tailwindcss.com' },
  { name: 'chart.js', url: 'https://cdn.jsdelivr.net/npm/chart.js' },
  { name: 'lucide.js', url: 'https://unpkg.com/lucide@latest' },
  { name: 'html5-qrcode.js', url: 'https://unpkg.com/html5-qrcode' },
  { name: 'JsBarcode.all.min.js', url: 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js' },
  { name: 'jspdf.umd.min.js', url: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js' },
  { name: 'jspdf.plugin.autotable.min.js', url: 'https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js' },
  { name: 'pdf.min.js', url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js' }
];

async function run() {
  for (const item of files) {
    const target = path.join(libsDir, item.name);
    console.log(`Downloading ${item.name}...`);
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      fs.writeFileSync(target, text, 'utf-8');
      console.log(`Saved ${item.name} (${(text.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
}

run();
