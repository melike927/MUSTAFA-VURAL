import { kv } from "@vercel/kv";
import { verifyToken, sendError, sendJson } from "../../auth.js";
import { isSupportedContentPage } from "../../../content-data.js";

export default async function handler(req, res) {
  const { pageKey } = req.query;
  
  if (!pageKey) {
    return sendError(res, 400, "Page key gerekli");
  }

  if (req.method === "GET") {
    try {
      const token = String(req.headers.authorization || "").slice(7).trim();
      const isAdmin = await verifyToken(token);
      
      const raw = await kv.get(`content:${pageKey}`);
      if (!raw) {
        return sendError(res, 404, "Icerik bulunamadi");
      }
      
      return sendJson(res, JSON.parse(raw));
    } catch (error) {
      return sendError(res, 500, "Icerik yuklemesi basarisiz");
    }
  }

  if (req.method === "PUT") {
    const token = String(req.headers.authorization || "").slice(7).trim();
    if (!(await verifyToken(token))) {
      return sendError(res, 401, "Yetkisiz erisim");
    }

    if (!isSupportedContentPage(pageKey)) {
      return sendError(res, 404, "Desteklenmeyen sayfa");
    }

    const content = req.body;
    if (!content || typeof content !== "object") {
      return sendError(res, 400, "Gecerli icerik gerekli");
    }

    try {
      await kv.set(`content:${pageKey}`, JSON.stringify(content));
      return sendJson(res, content);
    } catch (error) {
      return sendError(res, 500, "Icerik kaydedilmesi basarisiz");
    }
  }

  return sendError(res, 405, "Method not allowed");
}
