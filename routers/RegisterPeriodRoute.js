import express from "express";
import {
  createRegisterPeriode,
  getRegisterPeriode,
  updateRegisterPeriode,
} from "../controllers/RegisterPeriodeController.js";
import { body } from "express-validator";
import verifyJWT from "../middleware/verifyJWT.js";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin.js";

const RegisterPeriodRoute = express.Router();

RegisterPeriodRoute.post(
  "/register-periode",
  verifyJWT,
  verifyIsAdmin,
  createRegisterPeriode
);
RegisterPeriodRoute.get(
  "/register-periode",
  verifyJWT,
  verifyIsAdmin,
  getRegisterPeriode
);
RegisterPeriodRoute.put(
  "/register-periode/:id",
  body("tahunAjaran").notEmpty(),
  body("startDate").notEmpty(),
  body("endDate").notEmpty(),
  body("kuota").notEmpty(),
  checkErrorsBody,
  verifyJWT,
  verifyIsAdmin,
  updateRegisterPeriode
);

export default RegisterPeriodRoute;
