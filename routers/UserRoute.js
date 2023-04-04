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

UserRoute.get("/admin/users", verifyJWT, verifyIsAdmin, getUsers);
UserRoute.post("/admin/users", verifyJWT, verifyIsAdmin, createUser);
UserRoute.delete("/admin/users/:id", verifyJWT, deleteUsers);
UserRoute.put(
  "/admin/users/:id",
  verifyJWT,
  verifyIsAdmin,
  body("fullName").notEmpty().trim(),
  checkErrorsBody,
  updateFullName
);
UserRoute.put(
  "/admin/change-password/:id",
  body("newPassword").notEmpty().trim(),
  verifyJWT,
  verifyIsAdmin,
  checkErrorsBody,
  updatePassword
);

export default UserRoute;
