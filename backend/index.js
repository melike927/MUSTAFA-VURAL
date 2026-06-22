const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');
const crypto = require('crypto');
const { DEFAULT_CONTENT, getDefaultContent, isSupportedContentPage } = require('./content-data');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const adminSessions = new Set();
const adminPassword = process.env.ADMIN_PASSWORD || 'panel1234';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || process.env.MYSQL_USER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE || 'mv_clinic',
  waitForConnections: true,
  connectionLimit: 10,
});

async function ensureWebsiteContentTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS website_content (
      page_key VARCHAR(40) NOT NULL,
      content_json LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (page_key)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;
  `);

  const [rows] = await pool.query('SELECT COUNT(*) AS total FROM website_content');
  if (rows[0] && Number(rows[0].total) === 0) {
    for (const [pageKey, content] of Object.entries(DEFAULT_CONTENT)) {
      await pool.query(
        'INSERT INTO website_content (page_key, content_json) VALUES (?, ?)',
        [pageKey, JSON.stringify(content)]
      );
    }
  }
}

function getBearerToken(req) {
  const authorization = String(req.headers.authorization || '');
  if (!authorization.startsWith('Bearer ')) {
    return '';
  }

  return authorization.slice(7).trim();
}

function requireAdmin(req, res, next) {
  const token = getBearerToken(req);
  if (!token || !adminSessions.has(token)) {
    return res.status(401).json({ ok: false, error: 'Yetkisiz erisim' });
  }

  return next();
}

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      adSoyad VARCHAR(255),
      telefon VARCHAR(50),
      email VARCHAR(255),
      tedavi VARCHAR(255),
      tarih DATE,
      saat VARCHAR(50),
      note TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await ensureWebsiteContentTable();
}

ensureSchema().catch((e) => console.error('Schema init error', e));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/admin/login', (req, res) => {
  const password = String(req.body.password || '');
  if (password !== adminPassword) {
    return res.status(401).json({ ok: false, error: 'Parola hatali' });
  }

  const token = crypto.randomUUID();
  adminSessions.add(token);
  return res.json({ ok: true, token });
});

app.get('/api/content/:pageKey', async (req, res) => {
  const pageKey = String(req.params.pageKey || '').toLowerCase();
  if (!isSupportedContentPage(pageKey)) {
    return res.status(404).json({ ok: false, error: 'Icerik bulunamadi' });
  }

  if (!pool) {
    return res.json({ ok: true, data: getDefaultContent(pageKey) });
  }

  try {
    const [rows] = await pool.query(
      'SELECT content_json FROM website_content WHERE page_key = ? LIMIT 1',
      [pageKey]
    );

    if (!rows.length) {
      return res.json({ ok: true, data: getDefaultContent(pageKey) });
    }

    return res.json({ ok: true, data: JSON.parse(rows[0].content_json) });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Icerik okunamadi' });
  }
});

app.get('/api/admin/content', requireAdmin, async (req, res) => {
  const data = {};
  for (const pageKey of Object.keys(DEFAULT_CONTENT)) {
    data[pageKey] = getDefaultContent(pageKey);
  }

  if (!pool) {
    return res.json({ ok: true, data });
  }

  try {
    const [rows] = await pool.query('SELECT page_key, content_json FROM website_content');
    rows.forEach((row) => {
      if (isSupportedContentPage(row.page_key)) {
        try {
          data[row.page_key] = JSON.parse(row.content_json);
        } catch (err) {
          data[row.page_key] = getDefaultContent(row.page_key);
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Icerik listelenemedi' });
  }

  return res.json({ ok: true, data });
});

app.put('/api/admin/content/:pageKey', requireAdmin, async (req, res) => {
  const pageKey = String(req.params.pageKey || '').toLowerCase();
  if (!isSupportedContentPage(pageKey)) {
    return res.status(404).json({ ok: false, error: 'Icerik bulunamadi' });
  }

  const content = req.body && req.body.content ? req.body.content : req.body;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ ok: false, error: 'Gecerli icerik bekleniyor' });
  }

  if (!pool) {
    return res.json({ ok: true, data: content });
  }

  try {
    await pool.query(
      `INSERT INTO website_content (page_key, content_json)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE content_json = VALUES(content_json), updated_at = CURRENT_TIMESTAMP`,
      [pageKey, JSON.stringify(content)]
    );

    return res.json({ ok: true, data: content });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Icerik kaydedilemedi' });
  }
});

app.post('/api/randevu', async (req, res) => {
  try {
    const { adSoyad, telefon, email, tedavi, tarih, saat, not: note, createdAt } = req.body;
    await pool.query(
      'INSERT INTO appointments (adSoyad, telefon, email, tedavi, tarih, saat, note, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [adSoyad || null, telefon || null, email || null, tedavi || null, tarih || null, saat || null, note || null, createdAt || new Date()]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Kayıt sırasında hata oluştu.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));
