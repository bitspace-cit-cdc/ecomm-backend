import bcrypt from "bcrypt";
import { userValidator } from "@/validators";
import { db, TOKEN_SECRET } from "@config";
import { Request, Response } from "express";
import { userQueries } from "@queries";
import { CustomError, STATUS_CODE } from "utils";
import jwt from "jsonwebtoken";
import { ROLES } from "utils/customError";

const createUser = async (req: Request, _res: Response) => {
  const userData = userValidator.userBody.validate(req.body);
  if (userData.error) {
    throw new CustomError(userData.error.message, STATUS_CODE.BAD_REQUEST);
  } else {
    const client = await db.pool.connect();
    const passwordHash = await bcrypt.hash(userData.value.password, 10);
    try {
      const result = await client.query(userQueries.createUser, [
        userData.value.name,
        userData.value.email,
        passwordHash,
        userData.value.phone,
        userData.value.address,
      ]);
      client.release();
      return result.rows;
    } catch (err: any) {
      throw new CustomError(
        "Email already Exists",
        STATUS_CODE.NOT_IMPLEMENTED,
      );
    }
  }
};

const loginUser = async (req: Request, _res: Response) => {
  const loginData = userValidator.loginBody.validate(req.body);
  if (loginData.error) {
    throw new CustomError(loginData.error.message, STATUS_CODE.BAD_REQUEST);
  } else {
    const client = await db.pool.connect();
    const result = await client.query(userQueries.getUserByEmail, [
      loginData.value.email,
    ]);
    client.release();
    if (result.rowCount === 0) {
      throw new CustomError("Login Failed", STATUS_CODE.NOT_FOUND);
    } else {
      const passwordHash = result.rows[0].password_hash;
      if (!(await bcrypt.compare(loginData.value.password, passwordHash))) {
        throw new CustomError("Login Failed", STATUS_CODE.NOT_FOUND);
      } else {
        const tokenData = {
          id: result.rows[0].customer_id,
          role: ROLES.CUSTOMER,
        };
        return {
          token: jwt.sign(tokenData, TOKEN_SECRET),
        };
      }
    }
  }
};

const createTicket = async (req: Request, _res: Response) => {
  const orderId = req.body.order_id;
  const issueDesc = req.body.issue_desc;
  const customerId = req.body.token.id;

  const client = await db.pool.connect();
  const result = await client.query(userQueries.checkUserOrder, [
    orderId,
    customerId,
  ]);
  if (result && result.rows.length > 0) {
    const resultS = await client.query(userQueries.assignStaff);
    const staffId = resultS.rows[0].staff_id;
    const timeCreated = new Date().toISOString();
    await client.query(userQueries.createIssue, [
      orderId,
      customerId,
      issueDesc,
      timeCreated,
      staffId,
    ]);
    // send email that the issue was assigned to the proffesional
  } else {
    throw new CustomError("No such order exist", STATUS_CODE.NOT_FOUND);
  }
};

export default {
  createUser,
  loginUser,
  createTicket,
};
