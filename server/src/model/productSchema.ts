import mongoose, { Schema, Document, Types } from "mongoose";

export interface ProductType extends Document {
    name: string;
    userId: Types.ObjectId
    category: string;
    price: number;
    description: string;
    image: string;
    isSold: boolean;
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
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isSold: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);
export default Product;