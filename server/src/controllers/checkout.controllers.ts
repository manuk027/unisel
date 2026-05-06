import { Request, Response, NextFunction } from "express";
import { checkout } from "../services/checkout.service.js";

const checkoutProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const result = await checkout(userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

export { checkoutProducts };