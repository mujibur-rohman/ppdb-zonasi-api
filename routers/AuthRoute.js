import express from "express";
import { LoginAdmin, LogoutAdmin, Me } from "../controllers/AuthController.js";
import getCookie from "../middleware/getCookie.js";

const AuthRoute = express.Router();

AuthRoute.post("/auth/login", LoginAdmin);
AuthRoute.post("/auth/logout", getCookie, LogoutAdmin);
AuthRoute.get("/me", getCookie, Me);

export default AuthRoute;
