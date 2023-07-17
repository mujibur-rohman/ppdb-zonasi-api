import express from "express";
import { getPendaftarStatus } from "../controllers/DashboardController.js";
const DashboardRoute = express.Router();
DashboardRoute.get("/dashboard/status", getPendaftarStatus);

export default DashboardRoute;
