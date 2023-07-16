import express from "express";
import {
  getPendaftarJurusan,
  getPendaftarStatus,
} from "../controllers/DashboardController.js";
const DashboardRoute = express.Router();
DashboardRoute.get("/dashboard/status", getPendaftarStatus);
DashboardRoute.get("/dashboard/jurusan", getPendaftarJurusan);

export default DashboardRoute;
