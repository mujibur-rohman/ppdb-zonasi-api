import express from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUsers,
  getUsers,
  updateFullName,
  updatePassword,
} from "../controllers/UserController.js";
import verifyJWT from "../controllers/verifyJWT.js";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";

const UserRoute = express.Router();

UserRoute.get("/admin/users", verifyJWT, getUsers);
UserRoute.post("/admin/users", verifyJWT, createUser);
UserRoute.delete("/admin/users/:id", verifyJWT, deleteUsers);
UserRoute.put(
  "/admin/users/:id",
  verifyJWT,
  body("fullName").notEmpty().trim(),
  checkErrorsBody,
  updateFullName
);
UserRoute.put(
  "/admin/change-password/:id",
  body("newPassword").notEmpty().trim(),
  verifyJWT,
  checkErrorsBody,
  updatePassword
);

export default UserRoute;
