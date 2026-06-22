import { kv } from "@vercel/kv";

export async function verifyToken(token) {
  if (!token) return false;
  try {
    const exists = await kv.exists(`admin_session:${token}`);
    return exists === 1;
  } catch {
    return false;
  }
}

export function sendError(res, status, message) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).json({ ok: false, error: message });
}

export function sendJson(res, data) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ ok: true, data });
}
