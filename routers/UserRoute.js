import express from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUsers,
  getUsers,
  sendEmail,
  updateFullName,
  updatePassword,
  verifyEmail,
} from "../controllers/UserController.js";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";

const UserRoute = express.Router();

UserRoute.get("/users", getUsers);
UserRoute.post("/users/verify-email/:id", verifyEmail);
UserRoute.post("/users/send-email/:id", sendEmail);
UserRoute.post("/users", createUser);
UserRoute.delete("/users/:id", deleteUsers);
UserRoute.put(
  "/users/:id",
  body("fullName").notEmpty().trim(),
  checkErrorsBody,
  updateFullName
);
UserRoute.put(
  "/users/change-password/:id",
  body("newPassword").notEmpty().trim(),
  checkErrorsBody,
  updatePassword
);

export default UserRoute;
