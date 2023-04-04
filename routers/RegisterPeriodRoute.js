import express from "express";
import {
  createRegisterPeriode,
  getRegisterPeriode,
  updateRegisterPeriode,
} from "../controllers/RegisterPeriodeController.js";
import { body } from "express-validator";
import verifyJWT from "../controllers/verifyJWT.js";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";

const RegisterPeriodRoute = express.Router();

RegisterPeriodRoute.post("/register-periode", verifyJWT, createRegisterPeriode);
RegisterPeriodRoute.get("/register-periode", verifyJWT, getRegisterPeriode);
RegisterPeriodRoute.put(
  "/register-periode/:id",
  body("tahunAjaran").notEmpty(),
  body("startDate").notEmpty(),
  body("endDate").notEmpty(),
  body("kuota").notEmpty(),
  checkErrorsBody,
  verifyJWT,
  updateRegisterPeriode
);

export default RegisterPeriodRoute;
