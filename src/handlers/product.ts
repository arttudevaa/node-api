import { NextFunction, Request, Response } from "express";
import prisma from "../utils/db";
import { CustomRequest } from "../utils/auth";
import { getUserIdFromRequest } from "../utils/misc";

export const getUserProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdFromRequest(req);
    const products = await prisma.product.findMany({
      where: { userId: userId },
    });
    res.send({ data: products });
  } catch (e) {
    next(e);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (product) {
      res.send({ data: product });
    } else {
      res.status(404).send({
        message: "Resource not found",
        data: null,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdFromRequest(req);
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId,
      },
    });
    res.json({ message: "Product created", data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdFromRequest(req);
    const product = await prisma.product.update({
      data: { name: req.body.name },
      where: { id: req.params.id, userId: userId },
    });
    res.json({ message: "Product updated", data: product });
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdFromRequest(req);

    const product = await prisma.product.findUnique({
      where: { id: req.params.id, userId },
    });

    if (!product) {
      res.status(404).json({ message: "Resource not found", data: null });
      return;
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: product.id },
    });

    res.json({ message: "Product deleted", data: deletedProduct });
  } catch (e) {
    next(e);
  }
};
