import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils";

export async function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(error.statusCode).json(error.message);
}
