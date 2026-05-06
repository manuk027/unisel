import { Request, Response, NextFunction } from "express";
import { addToCart, getCart, removeFromCart, emptyCart } from "../services/cart.service.js";

const addItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { productId } = req.body;
        const cart = await addToCart(userId, productId);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next();
    }
};

const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const cart = await getCart(userId);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next();
    }
};

const removeItemFromCart = async (req: Request<{ productId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { productId } = req.params;
        const cart = await removeFromCart(userId, productId);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next(error);
    }
}

const clearItemsFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const cart = await emptyCart(userId);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next(error);
    }
}


export { addItemToCart, getUserCart, removeItemFromCart, clearItemsFromCart };