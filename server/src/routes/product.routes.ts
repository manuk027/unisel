import express from "express";
import { createProduct, getProductById, getAllProducts, updateProduct } from "../controllers/product.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, createProduct);
productRouter.get("/", authMiddleware, getAllProducts);
productRouter.put("/:id", updateProduct);
productRouter.get("/:id", getProductById);

export default productRouter;