import express from "express";
import {
  addDocuments,
  getDocuments,
  updateDocument,
} from "../controllers/DocumentController.js";

const DocumentRoute = express.Router();

DocumentRoute.get("/document", getDocuments);
DocumentRoute.post("/document", addDocuments);
DocumentRoute.put("/document/:id", updateDocument);

export default DocumentRoute;
