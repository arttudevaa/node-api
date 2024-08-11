import { Router } from "express";
import { body, query } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getUserProducts,
  updateProduct,
} from "./handlers/product";
import { validateInput } from "./utils/middleware";
const router = Router();

// Product
router.get("/product", getUserProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").isString().notEmpty(),
  validateInput,
  updateProduct
);
router.post(
  "/product",
  body("name").isString().notEmpty(),
  validateInput,
  createProduct
);
router.delete(
  "/product/:id",

  deleteProduct
);

// Update
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

// Update points
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.put("/updatepoints/:id", () => {});
router.post("/updatepoints", () => {});
router.delete("/updatepoints/:id", () => {});

export default router;
