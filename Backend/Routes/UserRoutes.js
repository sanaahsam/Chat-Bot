import express from "express";

import { Login, Logout, Signup } from "../Routes/userControlls.js";

const Userrouter = express.Router();

Userrouter.post("/login", Login);

Userrouter.post("/signup", Signup);

Userrouter.post("/logout", Logout);

export default Userrouter;
