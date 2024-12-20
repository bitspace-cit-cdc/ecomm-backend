import { NextFunction, Request, Response } from "express";
import { TOKEN_SECRET } from "@config";
import jwt from "jsonwebtoken";
import { STATUS_CODE } from "utils";

const authHandler = (req: Request, res: Response, next: NextFunction) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, TOKEN_SECRET, (err, user) => {
			if (err) {
				res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
			} else {
				req.body.user = user;
				next();
			}
		});
	}
};

export { authHandler };
