import { staffValidator } from "@/validators";
import { staffQueries } from "@/queries";
import { db, TOKEN_SECRET } from "@config";
import { Request, Response } from "express";
import { CustomError, getRoleNum, STATUS_CODE } from "utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRole } from "utils/customError";

const createStaff = async (req: Request, _res: Response) => {
  const staffData = staffValidator.staffBody.validate(req.body);
  if (staffData.error) {
    console.log(staffData.error.message);
    throw new CustomError("Invalid Body", STATUS_CODE.BAD_REQUEST);
  } else {
    if (getRoleNum(req.body.token.role) > staffData.value.privileage) {
      const client = await db.pool.connect();
      const passwordHash = await bcrypt.hash(staffData.value.password, 10);
      const dateHired = new Date().toISOString().split("T")[0];
      await client.query(staffQueries.insertStaff, [
        staffData.value.name,
        staffData.value.email,
        passwordHash,
        dateHired,
        getRole(staffData.value.privileage),
      ]);
    } else {
      throw new CustomError("Role issue for creation", STATUS_CODE.BAD_REQUEST);
    }
  }
};

const loginStaff = async (req: Request, _res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const client = await db.pool.connect();
  const result = await client.query(staffQueries.getStaff, [email]);
  if (result && result.rows.length > 0) {
    const passwordHash = result.rows[0].password_hash;
    if (await bcrypt.compare(password, passwordHash)) {
      const tokenData = {
        id: result.rows[0].staff_id,
        role: result.rows[0].privilege,
      };
      return {
        token: jwt.sign(tokenData, TOKEN_SECRET),
      };
    } else {
      throw new CustomError("Invalid email or password", STATUS_CODE.NOT_FOUND);
    }
  }
};

// get the all issues of the respective staff
const getAllIssues = async (req: Request, _res: Response) => {
  const client = await db.pool.connect();
  const result = await client.query(staffQueries.getIssues, [
    req.body.token.id,
  ]);
	console.log(result.rows)
};
export default {
  createStaff,
  getAllIssues,
  loginStaff,
};
