import express from "express";
import { getAllqualification } from "../controllers/QualificationController.js";

const QualificationRoute = express.Router();

QualificationRoute.get("/qualification", getAllqualification);

export default QualificationRoute;
