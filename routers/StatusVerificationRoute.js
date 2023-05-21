import express from "express";
import {
  statusDecline,
  statusVerification,
} from "../controllers/StatusController.js";

const StatusVerifyRoute = express.Router();

StatusVerifyRoute.post("/verification-status/:id", statusVerification);
StatusVerifyRoute.post("/verification-status/decline/:id", statusDecline);

export default StatusVerifyRoute;
