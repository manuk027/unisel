import express from "express";
import { createProduct, getProductById, getAllProducts, updateProduct, markAsSold } from "../controllers/product.controllers.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.patch("/mark-sold", markAsSold);

export default productRouter