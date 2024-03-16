import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    domain: "localhost",
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent xss attacks cross-site scripting attacks
    sameSite: "none",
    secure: false, //process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
