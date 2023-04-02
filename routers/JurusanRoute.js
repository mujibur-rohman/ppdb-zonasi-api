import express from "express";
import {
  createJurusan,
  deleteJurusan,
  getJurusan,
  updateJurusan,
} from "../controllers/JurusanController.js";

const JurusanRoute = express.Router();

JurusanRoute.post("/admin/jurusan", createJurusan);
JurusanRoute.get("/admin/jurusan", getJurusan);
JurusanRoute.put("/admin/jurusan/:id", updateJurusan);
JurusanRoute.delete("/admin/jurusan/:id", deleteJurusan);

export default JurusanRoute;
