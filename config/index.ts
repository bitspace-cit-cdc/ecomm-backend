import dotenv from "dotenv";
dotenv.config();

import db from "./db";
const ACCESS_KEY = process.env.ACCESS_KEY!;
const REGION = process.env.REGION!;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY!;
const VERIFIED_EMAIL = process.env.VERIFIED_EMAIL!;

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

export {
  TOKEN_SECRET,
  db,
  ACCESS_KEY,
  REGION,
  SECRET_ACCESS_KEY,
  VERIFIED_EMAIL,
};
