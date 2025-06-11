// controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { login as loginService } from "../service/auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error); // or return res.status(400).json({ message: error.message });
  }
};
