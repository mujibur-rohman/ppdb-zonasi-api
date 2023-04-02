import express from "express";
import { createRegisterPeriode } from "../controllers/RegisterPeriodeController.js";
import verifyJWT from "../controllers/verifyJWT.js";

const RegisterPeriodRoute = express.Router();

RegisterPeriodRoute.post("/register-periode", verifyJWT, createRegisterPeriode);

export default RegisterPeriodRoute;
