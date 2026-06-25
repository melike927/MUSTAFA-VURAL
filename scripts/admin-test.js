const fetch = globalThis.fetch || require('node-fetch');

const API = 'http://localhost:3000';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'panel1234';

async function run() {
  try {
    // login
    const loginRes = await fetch(`${API}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: ADMIN_PASS }),
    });
    const loginJson = await loginRes.json();
    if (!loginJson.ok || !loginJson.token) {
      console.error('Giriş başarısız', loginJson);
      process.exit(2);
    }
    const token = loginJson.token;
    console.log('Admin token alındı.');

    // get all content
    const allRes = await fetch(`${API}/api/admin/content`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const allJson = await allRes.json();
    if (!allJson.ok) {
      console.error('İçerik alınamadı', allJson);
      process.exit(3);
    }

    const originalTop = allJson.data.site.topStrip;
    console.log('Orjinal topStrip:', originalTop);

    // modify and PUT
    const modified = originalTop + ' [test kaydı]';
    const newContent = Object.assign({}, allJson.data.site, { topStrip: modified });

    const putRes = await fetch(`${API}/api/admin/content/site`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(newContent),
    });
    const putJson = await putRes.json();
    console.log('PUT sonuç:', putJson.ok ? 'başarılı' : 'başarısız', putJson);

    // verify
    const getRes = await fetch(`${API}/api/content/site`);
    const getJson = await getRes.json();
    console.log('GET site.topStrip:', getJson.data && getJson.data.topStrip);

    // restore
    const restoreRes = await fetch(`${API}/api/admin/content/site`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(Object.assign({}, newContent, { topStrip: originalTop })),
    });
    const restoreJson = await restoreRes.json();
    console.log('Restore sonuç:', restoreJson.ok ? 'başarılı' : 'başarısız', restoreJson);

    // final verify
    const finalRes = await fetch(`${API}/api/content/site`);
    const finalJson = await finalRes.json();
    console.log('Final site.topStrip:', finalJson.data && finalJson.data.topStrip);

    console.log('Admin kaydetme testi tamamlandı.');
    process.exit(0);
  } catch (err) {
    console.error('Hata:', err);
    process.exit(1);
  }
}

run();
