import dotenv from "dotenv";
dotenv.config();

import db from "./db";

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

export { TOKEN_SECRET, db };
