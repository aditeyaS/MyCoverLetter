import mongoose from "mongoose";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import templateRoutes from "./routes/template";
import { env } from "./config";

mongoose.connect(env.MONGO_DB_URL);

const app: Express = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: env.FRONT_END_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/template", templateRoutes);

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
