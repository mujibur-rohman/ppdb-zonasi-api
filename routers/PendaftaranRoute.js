import express from "express";
import {
  createPendaftaran,
  deletePendaftaran,
  getAllPendaftaran,
  getAllPendaftaranNoPagination,
  getAllPendaftaranUser,
  getByIdPendaftaran,
  getByUserPendaftaran,
  incrementStatus,
  updatePendaftaran,
} from "../controllers/PendaftaranControler.js";

const PendaftaranRoute = express.Router();

PendaftaranRoute.get("/pendaftaran", getAllPendaftaran);
PendaftaranRoute.get("/pendaftaran/all", getAllPendaftaranNoPagination);
PendaftaranRoute.get("/pendaftaran/:id", getByIdPendaftaran);
PendaftaranRoute.get("/pendaftaran/user/:userId", getAllPendaftaranUser);
PendaftaranRoute.get(
  "/pendaftaran/:userId/:registerPeriodId",
  getByUserPendaftaran
);
PendaftaranRoute.post("/pendaftaran", createPendaftaran);
PendaftaranRoute.put("/pendaftaran/:id", updatePendaftaran);
PendaftaranRoute.put("/status/pendaftaran/:id", incrementStatus);
PendaftaranRoute.delete("/pendaftaran/:id", deletePendaftaran);

export default PendaftaranRoute;
