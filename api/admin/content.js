import { kv } from "@vercel/kv";
import { verifyToken, sendError, sendJson } from "../auth.js";
import { DEFAULT_CONTENT } from "../../content-data.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  const token = String(req.headers.authorization || "").slice(7).trim();
  if (!(await verifyToken(token))) {
    return sendError(res, 401, "Yetkisiz erisim");
  }

  try {
    const data = {};
    for (const pageKey of Object.keys(DEFAULT_CONTENT)) {
      const raw = await kv.get(`content:${pageKey}`);
      data[pageKey] = raw ? JSON.parse(raw) : DEFAULT_CONTENT[pageKey];
    }
    return sendJson(res, data);
  } catch (error) {
    return sendError(res, 500, "Icerik yuklemesi basarisiz");
  }
}
