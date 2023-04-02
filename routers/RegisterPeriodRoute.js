import express from "express";
import {
  createRegisterPeriode,
  getRegisterPeriode,
} from "../controllers/RegisterPeriodeController.js";
import verifyJWT from "../controllers/verifyJWT.js";

const RegisterPeriodRoute = express.Router();

RegisterPeriodRoute.post("/register-periode", verifyJWT, createRegisterPeriode);
RegisterPeriodRoute.get("/register-periode", getRegisterPeriode);

export default RegisterPeriodRoute;
