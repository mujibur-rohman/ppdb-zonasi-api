import express from "express";
import {
  createJurusan,
  deleteJurusan,
  getJurusan,
  updateJurusan,
} from "../controllers/JurusanController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin.js";

const JurusanRoute = express.Router();

JurusanRoute.post("/admin/jurusan", verifyJWT, verifyIsAdmin, createJurusan);
JurusanRoute.get("/admin/jurusan", verifyJWT, verifyIsAdmin, getJurusan);
JurusanRoute.put("/admin/jurusan/:id", verifyJWT, verifyIsAdmin, updateJurusan);
JurusanRoute.delete(
  "/admin/jurusan/:id",
  verifyJWT,
  verifyIsAdmin,
  deleteJurusan
);

export default JurusanRoute;
