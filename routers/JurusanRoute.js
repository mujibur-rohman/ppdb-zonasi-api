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

JurusanRoute.post("/jurusan", createJurusan);
JurusanRoute.get("/jurusan", getJurusan);
JurusanRoute.put("/jurusan/:id", updateJurusan);
JurusanRoute.delete("/jurusan/:id", deleteJurusan);

export default JurusanRoute;
