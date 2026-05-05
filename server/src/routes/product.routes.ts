import express from "express";
import { createProduct, getProductById, getAllProducts, updateProduct } from "../controllers/product.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", authMiddleware, updateProduct);

export default productRouter;