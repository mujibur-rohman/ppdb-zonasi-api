import express from "express";
import {LoginAdmin, LogoutAdmin} from "../controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post('/admin/auth/login', LoginAdmin);
AuthRoute.post('/admin/auth/logout', LogoutAdmin);

export default AuthRoute;