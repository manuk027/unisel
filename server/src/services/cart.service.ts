import { addItem, getPopulatedCart, removeItem, clearCart, findCartByUserId } from "../repositories/cart.repository.js"
import { findById } from "../repositories/product.repository.js";
import { ProductType } from "../model/product.model.js";
import mongoose from "mongoose";

const addToCart = async (userId: string, productId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id.");
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product id.");
    }
    const product = await findById(productId);
    if (!product) {
        throw new Error("Product not found.");
    }
    if (product.isSold) {
        throw new Error("Product is already sold.");
    }
    const existingCart = await findCartByUserId(userId);
    const alreadyExists = existingCart?.items.some((item) => item.productId.toString() === productId);
    if (alreadyExists) {
        throw new Error("Product already exists in cart.");
    }
    const cart = await addItem(userId, productId);
    return cart;
};

const getCart = async (userId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id.");
    }
    const cart = await getPopulatedCart(userId);
    if (!cart) {
        return { userId, items: [], }
    }
    const validItems = cart.items.filter((item) => {
        const product = item.productId as unknown as ProductType;
        return product && !product.isSold;
    });
    return { ...cart.toObject(), items: validItems, };
};

const removeFromCart = async (userId: string, productId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id.");
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product id.");
    }
    const cart = await removeItem(userId, productId);
    return cart;
};

const emptyCart = async (userId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id.");
    }
    return await clearCart(userId);
};

export { addToCart, getCart, removeFromCart, emptyCart };