import express from "express";
import ApiRouter from "./Backend/Routes/apiCall.js";
import Userrouter from "./Backend/Routes/UserRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { config } from "dotenv";

config();
const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use(ApiRouter);
app.use(Userrouter);

async function ConnectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
}

app.listen(process.env.PORT, () => {
  ConnectMongoDb();
  console.log(`${process.env.PORT}port listening`);
});
