import express from "express";
import {
  createPendaftaran,
  getAllPendaftaran,
  updatePendaftaran,
} from "../controllers/PendaftaranControler.js";

const PendaftaranRoute = express.Router();

PendaftaranRoute.get("/pendaftaran", getAllPendaftaran);
PendaftaranRoute.post("/pendaftaran", createPendaftaran);
PendaftaranRoute.put("/pendaftaran", updatePendaftaran);

export default PendaftaranRoute;
