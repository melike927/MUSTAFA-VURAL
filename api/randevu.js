import { kv } from "@vercel/kv";
import { sendError, sendJson } from "../auth.js";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
      const appointments = await kv.lrange("appointments", 0, limit - 1);
      return sendJson(res, appointments.map((a) => JSON.parse(a)));
    } catch (error) {
      return sendError(res, 500, "Randevu listesi yuklenemedi");
    }
  }

  if (req.method === "POST") {
    const fullName = String(req.body?.adSoyad || "").trim();
    const phone = String(req.body?.telefon || "").trim();
    const email = String(req.body?.email || "").trim();
    const treatment = String(req.body?.tedavi || "").trim();
    const appointmentDate = String(req.body?.tarih || "").trim();
    const appointmentTime = String(req.body?.saat || "").trim();
    const note = String(req.body?.not || "").trim();

    if (!fullName || !phone || !treatment || !appointmentDate || !appointmentTime) {
      return sendError(
        res,
        400,
        "Ad Soyad, Telefon, Tedavi, Tarih ve Saat alanlari zorunludur."
      );
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

    try {
      await kv.lpush("appointments", JSON.stringify(appointment));
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        ok: true,
        id: appointment.id,
        message: "Randevu talebi kaydedildi.",
      });
    } catch (error) {
      return sendError(res, 500, "Randevu kaydedilemedi");
    }
  } else {
    return sendError(res, 405, "Method not allowed");
  }
}
