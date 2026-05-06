import mongoose, { Schema, Document, Types } from "mongoose";

export interface CartType extends Document {
    userId: Types.ObjectId;
    items: {
        productId: Types.ObjectId;
    }[];
}

const cartSchema: Schema<CartType> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [
            {
                _id: false,
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Cart = mongoose.model<CartType>("Cart", cartSchema);
export default Cart;