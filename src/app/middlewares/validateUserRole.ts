import { NextFunction, Request, Response } from "express";
import { USER_ROLE_ENUM } from "../modules/user/user.constant";


export const validateUserRole = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body;
  console.log('role', role);

  if (!role || !Object.values(USER_ROLE_ENUM).includes(role)) {
    return res.status(400).json({
      status: 'false',
      message: 'Invalid role value',
    });
  }

  next();
};
