import mongoose from "mongoose";
import { getPopulatedCart, clearCart, } from "../repositories/cart.repository.js";
import { markAsSold, } from "../repositories/product.repository.js";
import { ProductType } from "../model/product.model.js";

const validateCheckout = async (userId: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id.");
    }
    const cart = await getPopulatedCart(userId);
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty.");
    }
    const products = cart.items.map((item) => { return item.productId as unknown as ProductType; });
    const soldProduct = products.find((product) => product.isSold);
    if (soldProduct) {
        throw new Error(`${soldProduct.name} is already sold.`);
    }
    return { cart, products, message: "Checkout validation successful.", };
};

const checkout = async (userId: string) => {
    const { products } = await validateCheckout(userId);
    const productIds = products.map((product) => String(product._id));
    await markAsSold(productIds);
    await clearCart(userId);
    return { success: true, message: "Checkout completed successfully.", products, };
};


export { checkout, validateCheckout, };