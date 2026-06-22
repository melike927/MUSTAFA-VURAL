import { kv } from "@vercel/kv";
import crypto from "crypto";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const password = String(req.body?.password || "");
  const adminPassword = process.env.ADMIN_PASSWORD || "panel1234";

  if (password !== adminPassword) {
    return res.status(401).json({ ok: false, error: "Parola hatali" });
  }

  try {
    const token = crypto.randomUUID();
    await kv.set(`admin_session:${token}`, 1, { ex: 86400 });
    return res.status(200).json({ ok: true, token });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Giris basarisiz" });
  }
}
