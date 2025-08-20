import { Router } from "express";
import { pool } from "../db.js";
import { haversineDistance } from "../utils/distance.js";
import { schoolBodySchema, coordsQuerySchema } from "../validators/schoolSchema.js";

const router = Router();


router.post("/addSchool", async (req, res) => {
  try {
    const { error, value } = schoolBodySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation failed", details: error.details });
    }
    const { name, address, latitude, longitude } = value;

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    const [rows] = await pool.execute("SELECT * FROM schools WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
});


router.get("/listSchools", async (req, res) => {
  try {
    const { error, value } = coordsQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: "Validation failed", details: error.details });
    }
    const { lat, lon } = value;

    const [rows] = await pool.query("SELECT id, name, address, latitude, longitude FROM schools");

    const enriched = rows.map((s) => ({
      ...s,
      distance_km: parseFloat(haversineDistance(lat, lon, s.latitude, s.longitude).toFixed(3)),
    }));

    enriched.sort((a, b) => a.distance_km - b.distance_km);
    res.json(enriched);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
});

export default router;
