import Cart from "../model/cart.model.js";
import { Types } from "mongoose";

const findOrCreateCartByUserId = async (uid: string) => {
    const userId = new Types.ObjectId(uid);
    return Cart.findOneAndUpdate(
        { userId },
        { $setOnInsert: { userId, items: [] } },
        { returnDocument: "after", upsert: true }
    );
};

const findCartByUserId = async (userId: string) => {
    return Cart.findOne({ userId });
};

const addItem = async (uid: string, pid: string) => {
    const userId = new Types.ObjectId(uid);
    const productId = new Types.ObjectId(pid);
    return Cart.findOneAndUpdate(
        { userId },
        {
            $addToSet: { items: { productId } },
            $setOnInsert: { userId: userId }
        },
        { returnDocument: "after", upsert: true },
    );
}

const removeItem = async (uid: string, pid: string) => {
    const userId = new Types.ObjectId(uid);
    const productId = new Types.ObjectId(pid);
    return Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } }, },
        { returnDocument: "after" },
    );
}

const clearCart = async (uid: string) => {
    const userId = new Types.ObjectId(uid);
    return Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        { returnDocument: "after" },
    );
}

const getPopulatedCart = async (userId: string) => {
    return Cart.findOne({ userId }).populate("items.productId");
}

export { findOrCreateCartByUserId, findCartByUserId, addItem, removeItem, clearCart, getPopulatedCart };