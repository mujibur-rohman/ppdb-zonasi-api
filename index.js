import express from "express";
import dotenv from "dotenv";
import UserRoute from "./routers/UserRoute.js";
import cors from "cors";
import db from "./config/database.js";
import ProfileSchoolRoute from "./routers/ProfileSchoolRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import JurusanRoute from "./routers/JurusanRoute.js";

dotenv.config();

const app = express();

//cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(ProfileSchoolRoute);
app.use(JurusanRoute);

(async () => {
  await db.sync();
})();

app.listen(process.env.APP_PORT, () => console.log("Server Running"));
