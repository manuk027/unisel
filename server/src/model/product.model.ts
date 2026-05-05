import mongoose, { Schema, Document, Types } from "mongoose";

export interface ProductType extends Document {
    name: string;
    userId: Types.ObjectId;
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
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        index: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    image: {
        type: String,
        required: true,
    },
    isSold: {
        type: Boolean,
        default: false,
        index: true,
    }
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);
export default Product;