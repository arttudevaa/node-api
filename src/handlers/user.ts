import { comparePasswords, createJWT, hashPassword } from "../utils/auth";
import prisma from "../utils/db";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
      email: req.body.email,
    },
  });

  const token = createJWT(user);
  res.status(200);
  res.send({ token });
};

export const signIn = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    res.status(401);
    res.send({ message: "Invalid username or password" });
    return;
  }
  const passwordsMatch = comparePasswords(req.body.password, user?.password);

  if (!passwordsMatch) {
    res.status(401);
    res.send({ message: "Invalid username or password" });
  }
  const token = createJWT(user);
  res.status(200);
  res.send({ token });
};
