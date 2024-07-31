import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user/userRoutes";
import requestRoutes from "./src/routes/request/requestRoutes";
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/requests", requestRoutes);

const port = process.env.PORT ?? 5000;
app.listen(port, () => console.log("Listening on port " + port));
