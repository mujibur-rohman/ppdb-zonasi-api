import express from "express";
import {
  createPendaftaran,
  deletePendaftaran,
  getAllPendaftaran,
  updatePendaftaran,
} from "../controllers/PendaftaranControler.js";

const PendaftaranRoute = express.Router();

PendaftaranRoute.get("/pendaftaran", getAllPendaftaran);
PendaftaranRoute.post("/pendaftaran", createPendaftaran);
PendaftaranRoute.put("/pendaftaran", updatePendaftaran);
PendaftaranRoute.delete("/pendaftaran/:id", deletePendaftaran);

export default PendaftaranRoute;
