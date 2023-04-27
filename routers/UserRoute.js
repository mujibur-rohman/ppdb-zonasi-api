import express from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUsers,
  getUsers,
  updateFullName,
  updatePassword,
} from "../controllers/UserController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { checkErrorsBody } from "../middleware/checkErrorsBody.js";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin.js";

const UserRoute = express.Router();

UserRoute.get("/users", getUsers);
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
