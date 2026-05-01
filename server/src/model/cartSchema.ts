import mongoose, { Document, Schema, Types } from "mongoose";
import { ref } from "node:process";


export interface CartType extends Document {
    userId: Types.ObjectId;
    items: Types.ObjectId[],
}

const cartSchema: Schema<CartType> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
    }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;