import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "./misc";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export interface CustomRequest extends Request {
  user: string;
}

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const secret = env("JWT_SECRET");
  const token = jwt.sign({ id: user.id, username: user.username }, secret);
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, env("JWT_SECRET"));
    (req as CustomRequest).user = JSON.stringify(payload);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
};
