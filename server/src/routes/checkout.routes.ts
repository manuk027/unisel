import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkoutProducts } from "../controllers/checkout.controllers.js";

const checkoutRouter = express.Router();

checkoutRouter.use(authMiddleware);

checkoutRouter.post("/", checkoutProducts);

export default checkoutRouter;