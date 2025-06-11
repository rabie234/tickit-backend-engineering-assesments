import { Response } from "express";

export const success = (
  res: Response,
  data: any = undefined,
  status: number = 200
): Response => {
  const response = {
    status,
    success: true,
    data,
  };
  return res.status(status).json(response);
};

export const error = (
  res: Response,
  status: number = 500,
  message: string | undefined = undefined
): Response => {
  const response = {
    status,
    success: false,
    message,
  };
  return res.status(status).json(response);
};
