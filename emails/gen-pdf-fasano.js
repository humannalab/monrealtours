const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, '12-08-2026 - Fasano Fifth Avenue Nova York/email-fasano-fifth-avenue.html');
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0', timeout: 15000 });

  await page.setViewport({ width: 700, height: 800 });

  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

  await page.pdf({
    path: '12-08-2026 - Fasano Fifth Avenue Nova York/email-fasano-fifth-avenue.pdf',
    width: '700px',
    height: `${bodyHeight + 40}px`,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('PDF gerado com sucesso. Altura:', bodyHeight + 40, 'px');
})();
