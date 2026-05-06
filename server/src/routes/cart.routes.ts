import express from "express";
import { addItemToCart, clearItemsFromCart, getUserCart, removeItemFromCart } from "../controllers/cart.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.use(authMiddleware);

cartRouter.get("/", getUserCart);
cartRouter.post("/", addItemToCart);
cartRouter.delete("/:productId", removeItemFromCart);
cartRouter.delete("/", clearItemsFromCart);

export default cartRouter;