import express from "express";
import {
  LoginAdmin,
  LoginSiswa,
  Logout,
  Me,
  RegisterSiswa,
} from "../controllers/AuthController.js";
import getCookie from "../middleware/getCookie.js";

const AuthRoute = express.Router();

AuthRoute.post("/auth/login", LoginAdmin);
AuthRoute.post("/auth/register", RegisterSiswa);
AuthRoute.post("/siswa/auth/login", LoginSiswa);
AuthRoute.post("/auth/logout", getCookie, Logout);
AuthRoute.get("/me", getCookie, Me);

export default AuthRoute;
