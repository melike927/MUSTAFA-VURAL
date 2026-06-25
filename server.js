require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { DEFAULT_CONTENT, getDefaultContent, isSupportedContentPage } = require("./content-data");

const app = express();
const port = Number(process.env.PORT || 3000);
const dbPath = path.join(__dirname, "db.json");
const adminPassword = process.env.ADMIN_PASSWORD || "panel1234";
const adminSessions = new Set();

const DEFAULT_DB_STATE = {
  version: 1,
  content: JSON.parse(JSON.stringify(DEFAULT_CONTENT)),
  appointments: [],
};

let dbState = null;
let dbReady = false;
let writeQueue = Promise.resolve();

function getBearerToken(req) {
  const authorization = String(req.headers.authorization || "");
  if (!authorization.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice(7).trim();
}

function requireAdmin(req, res, next) {
  const token = getBearerToken(req);
  if (!token || !adminSessions.has(token)) {
    return res.status(401).json({ ok: false, error: "Yetkisiz erisim" });
  }

  return next();
}

function cloneDefaultDbState() {
  return JSON.parse(JSON.stringify(DEFAULT_DB_STATE));
}

function normalizeDbState(rawState) {
  const baseState = cloneDefaultDbState();
  if (!rawState || typeof rawState !== "object") {
    return baseState;
  }

  if (rawState.content && typeof rawState.content === "object") {
    for (const pageKey of Object.keys(DEFAULT_CONTENT)) {
      if (rawState.content[pageKey] && typeof rawState.content[pageKey] === "object") {
        baseState.content[pageKey] = rawState.content[pageKey];
      }
    }

    if (rawState.content.index && !rawState.content.about) {
      baseState.content.about = rawState.content.index;
    }

    if (rawState.content.patientRights && !rawState.content.patientrights) {
      baseState.content.patientrights = rawState.content.patientRights;
    }
  }

  if (Array.isArray(rawState.appointments)) {
    baseState.appointments = rawState.appointments;
  }

  return baseState;
}

async function writeDbState(nextState) {
  const tempPath = `${dbPath}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(nextState, null, 2)}\n`, "utf8");
  await fs.rename(tempPath, dbPath);
}

async function ensureDbState() {
  if (dbState) {
    return dbState;
  }

  let shouldPersist = false;
  try {
    const raw = await fs.readFile(dbPath, "utf8");
    const parsed = JSON.parse(raw);
    dbState = normalizeDbState(parsed);
    shouldPersist = JSON.stringify(parsed) !== JSON.stringify(dbState);
  } catch (error) {
    dbState = cloneDefaultDbState();
    shouldPersist = true;
  }

  if (shouldPersist) {
    await writeDbState(dbState);
  }

  dbReady = true;
  return dbState;
}

async function persistDbState() {
  const nextState = dbState || cloneDefaultDbState();
  writeQueue = writeQueue.then(() => writeDbState(nextState));
  await writeQueue;
}

function getPageContent(pageKey) {
  if (!isSupportedContentPage(pageKey)) {
    return null;
  }

  if (!dbState || !dbState.content || !dbState.content[pageKey]) {
    return getDefaultContent(pageKey);
  }

  return JSON.parse(JSON.stringify(dbState.content[pageKey]));
}

function setPageContent(pageKey, content) {
  if (!isSupportedContentPage(pageKey)) {
    return null;
  }

  if (!dbState) {
    dbState = cloneDefaultDbState();
  }

  dbState.content[pageKey] = content;
  return content;
}

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/api/health", async (req, res) => {
  await ensureDbState();
  res.json({ ok: true, storage: "file", dbReady });
});

app.post("/api/admin/login", (req, res) => {
  const password = String(req.body.password || "");
  if (password !== adminPassword) {
    return res.status(401).json({ ok: false, error: "Parola hatali" });
  }

  const token = crypto.randomUUID();
  adminSessions.add(token);
  return res.json({ ok: true, token });
});

app.get("/api/content/:pageKey", async (req, res) => {
  const pageKey = String(req.params.pageKey || "").toLowerCase();
  await ensureDbState();
  const content = getPageContent(pageKey);

  if (!content) {
    return res.status(404).json({ ok: false, error: "Icerik bulunamadi" });
  }

  return res.json({ ok: true, data: content });
});

app.get("/api/admin/content", requireAdmin, async (req, res) => {
  await ensureDbState();
  const data = {};

  for (const pageKey of Object.keys(DEFAULT_CONTENT)) {
    data[pageKey] = getPageContent(pageKey) || getDefaultContent(pageKey);
  }

  return res.json({ ok: true, data });
});

app.put("/api/admin/content/:pageKey", requireAdmin, async (req, res) => {
  const pageKey = String(req.params.pageKey || "").toLowerCase();
  if (!isSupportedContentPage(pageKey)) {
    return res.status(404).json({ ok: false, error: "Icerik bulunamadi" });
  }

  const content = req.body && req.body.content ? req.body.content : req.body;
  if (!content || typeof content !== "object") {
    return res.status(400).json({ ok: false, error: "Gecerli icerik bekleniyor" });
  }

  await ensureDbState();
  setPageContent(pageKey, content);
  await persistDbState();
  return res.json({ ok: true, data: content });
});

app.get("/api/randevu", async (req, res) => {
  await ensureDbState();
  const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
  const appointments = [...(dbState.appointments || [])]
    .sort((left, right) => String(right.createdAt || "").localeCompare(String(left.createdAt || "")))
    .slice(0, limit);

  return res.json({ ok: true, data: appointments });
});

app.post("/api/randevu", async (req, res) => {
  await ensureDbState();

  const fullName = String(req.body.adSoyad || "").trim();
  const phone = String(req.body.telefon || "").trim();
  const email = String(req.body.email || "").trim();
  const treatment = String(req.body.tedavi || "").trim();
  const appointmentDate = String(req.body.tarih || "").trim();
  const appointmentTime = String(req.body.saat || "").trim();
  const note = String(req.body.not || "").trim();

  if (!fullName || !phone || !treatment || !appointmentDate || !appointmentTime) {
    return res.status(400).json({
      ok: false,
      error: "Ad Soyad, Telefon, Tedavi, Tarih ve Saat alanlari zorunludur.",
    });
  }

  const appointment = {
    id: crypto.randomUUID(),
    full_name: fullName,
    phone,
    email: email || null,
    treatment,
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
    note: note || null,
    source: "website",
    status: "new",
    createdAt: new Date().toISOString(),
  };

  dbState.appointments.unshift(appointment);
  await persistDbState();

  return res.status(201).json({
    ok: true,
    id: appointment.id,
    message: "Randevu talebi kaydedildi.",
  });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Bulunamadi" });
});

app.listen(port, () => {
  console.log(`Sunucu calisiyor: http://localhost:${port}`);
  ensureDbState().catch((error) => {
    console.error("Dosya tabanli veri deposu baslatma hatasi:", error);
  });
});
