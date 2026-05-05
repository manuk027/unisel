import { CreateProductDTO, UpdateProductDTO } from "../types/product.types.js";
import Product from "../model/product.model.js";

export const create = async (data: CreateProductDTO) => {
    return await Product.create(data);
}

export const findById = async (id: string) => {
    return await Product.findById(id);
};

export const findAvailable = async (filters: any = {}) => {
    return await Product.find({
        ...filters,
        isSold: false,
    });
}

export const updateById = async (id: string, data: UpdateProductDTO) => {
    return await Product.findOneAndUpdate({ _id: id, isSold: false }, data, { new: true, runValidators: true });
}

export const markAsSold = async (productIds: string[]) => {
    return await Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { isSold: true } },
    );
}