import express from "express";
import dotenv from "dotenv";
import UserRoute from "./routers/UserRoute.js";
import cors from "cors";
import db from "./config/database.js";
import ProfileSchoolRoute from "./routers/ProfileSchoolRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import JurusanRoute from "./routers/JurusanRoute.js";
import RegisterPeriodRoute from "./routers/RegisterPeriodRoute.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import PendaftaranRoute from "./routers/PendaftaranRoute.js";
import DocumentRoute from "./routers/DocumentRoutes.js";
import StatusVerifyRoute from "./routers/StatusVerificationRoute.js";
import QualificationRoute from "./routers/QualificationRoute.js";

dotenv.config();

const app = express();

//cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(DocumentRoute);
app.use(PendaftaranRoute);
app.use(ProfileSchoolRoute);
app.use(JurusanRoute);
app.use(RegisterPeriodRoute);
app.use(StatusVerifyRoute);
app.use(QualificationRoute);

(async () => {
  await db.sync();
})();

app.listen(process.env.APP_PORT, () => console.log("Server Running"));
