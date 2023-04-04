import express from "express";
import {
  createProfileSchool,
  getProfileSchool,
  updateProfileSchool,
} from "../controllers/ProfileSchoolController.js";
import { body } from "express-validator";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin.js";

const ProfileSchoolRoute = express.Router();

ProfileSchoolRoute.post(
  "/profile-school",
  verifyJWT,
  verifyIsAdmin,
  createProfileSchool
);
ProfileSchoolRoute.get("/profile-school", getProfileSchool);
ProfileSchoolRoute.put(
  "/profile-school/:id",
  verifyJWT,
  verifyIsAdmin,
  body("schoolName").notEmpty().trim(),
  body("address").notEmpty().trim(),
  body("provinsi").notEmpty().trim(),
  body("kota").notEmpty().trim(),
  body("kecamatan").notEmpty().trim(),
  body("kodePos").notEmpty().trim(),
  body("npsn").notEmpty().trim(),
  body("logo").notEmpty().trim(),
  body("latitude").notEmpty().trim(),
  body("longitude").notEmpty().trim(),
  checkErrorsBody,
  updateProfileSchool
);

export default ProfileSchoolRoute;
