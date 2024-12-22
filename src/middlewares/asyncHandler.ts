import { Request, Response, NextFunction } from "express";
import { CustomError, STATUS_CODE } from "utils";

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
		console.log(2)
    fn(req, res, next)
      .then((data) => {
				console.log("Response", data)
        if (data) {
          res.status(STATUS_CODE.ACCEPTED).json({ data });
        } else {
          res.sendStatus(STATUS_CODE.ACCEPTED);
        }
      })
      .catch((err: Error) => {
        console.log(err);
        if (err instanceof CustomError) {
          res.status(err.status).json({ message: err.message });
        } else {
          res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "INTERNAL SERVER ERROR",
          });
        }
      });
  };

export default asyncHandler;
