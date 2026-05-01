import { CreateProductDTO, UpdateProductDTO } from "../types/product.types.js";
import Product from "../model/productSchema.js";

export const create = async (data: CreateProductDTO) => {
    return await Product.create(data);
}

export const findById = async (id: string) => {
    return await Product.findById(id);
};

export const findAvailbale = async (filters: any = {}) => {
    return await Product.find({
        isSold: false,
        ...filters
    });
}

export const updateById = async (id: string, data: UpdateProductDTO) => {
    return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const markAsSold = async (productIds: string[]) => {
    return await Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { isSold: true } },
    );
}