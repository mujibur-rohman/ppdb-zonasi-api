import express from "express";
import {
  getAllqualification,
  sendEmailQualification,
} from "../controllers/QualificationController.js";

const QualificationRoute = express.Router();

QualificationRoute.get("/qualification", getAllqualification);
QualificationRoute.post("/qualification/send-email", sendEmailQualification);

export default QualificationRoute;
