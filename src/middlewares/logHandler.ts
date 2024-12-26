import { Request, Response, NextFunction } from "express";
const logHandler = (req: Request, _res: Response, next: NextFunction) => {
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime} ${req.method} ${req.originalUrl}]`);
  next();
};
export { logHandler };
