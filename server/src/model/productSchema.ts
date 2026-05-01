import mongoose, { Schema, Document, Types } from "mongoose";

export interface ProductType extends Document {
    name: string;
    userId: Types.ObjectId;
    category: string;
    price: number;
    description: string;
    image: string;
    isSold: boolean;
    quantity: number;
}

const productSchema: Schema<ProductType> = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    isSold: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);
export default Product;