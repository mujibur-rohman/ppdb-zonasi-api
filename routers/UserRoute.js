import express from "express";
import { body } from "express-validator";
import {
  createUser,
  getUsers,
  updateFullName,
  updatePassword,
} from "../controllers/UserController.js";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";

const UserRoute = express.Router();

UserRoute.get("/admin/users", getUsers);
UserRoute.post("/admin/users", createUser);
UserRoute.put(
  "/admin/users/:id",
  body("fullName").notEmpty().trim(),
  checkErrorsBody,
  updateFullName
);
UserRoute.put(
  "/admin/change-password/:id",
  body("newPassword").notEmpty().trim(),
  checkErrorsBody,
  updatePassword
);

export default UserRoute;
