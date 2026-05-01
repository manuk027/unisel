import * as productRepository from '../repositories/product.repository.js';
import { CreateProductDTO, UpdateProductDTO } from '../types/product.types.js';
import mongoose from 'mongoose';

const createProduct = async (data: CreateProductDTO) => {
    if (!data.name?.trim() || !data.category?.trim() || !data.description?.trim() || !data.image?.trim()) {
        throw new Error("All fields are mandatory, fill all the details.");
    }
    if (!data.userId || !mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId.");
    }
    const price = Number(data.price);
    const quantity = Number(data.quantity);
    if (!Number.isFinite(price)) {
        throw new Error("Price must be a valid number.");
    }
    if (!Number.isFinite(quantity)) {
        throw new Error("Quantity must be a valid number.");
    }
    if (price <= 0) {
        throw new Error("The price should be greater than 0.");
    }
    if (quantity <= 0) {
        throw new Error("The quantity should be at least 1.");
    }
    if (data.description.trim().length < 10) {
        throw new Error("The description should contain at least 10 characters.");
    }
    const productData = { ...data, name: data.name.trim(), category: data.category.trim(), description: data.description.trim(), image: data.image.trim(), price, quantity, isSold: false };
    return productRepository.create(productData);
};

const showProductDetails = async (id: string) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product ID.");
    }
    const product = await productRepository.findById(id);
    if (!product) {
        throw new Error("Product not found.");
    }
    return product;
};

const showProducts = async () => {
    return productRepository.findAvailable();
};

const updateProduct = async (id: string, data: UpdateProductDTO) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product id.");
    }
    if (!data || Object.keys(data).length === 0) {
        throw new Error("No update data provided.");
    }
    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
        throw new Error("Product not found.");
    }
    if (existingProduct.isSold) {
        throw new Error("Sold products cannot be updated.");
    }
    const updateData: any = {};
    if (data.name !== undefined) {
        if (!data.name.trim()) {
            throw new Error("Name cannot be empty.");
        }
        updateData.name = data.name.trim();
    }
    if (data.category !== undefined) {
        if (!data.category.trim()) {
            throw new Error("Category cannot be empty.");
        }
        updateData.category = data.category.trim();
    }
    if (data.description !== undefined) {
        if (data.description.trim().length < 10) {
            throw new Error("Description should contain at least 10 characters.");
        }
        updateData.description = data.description.trim();
    }
    if (data.image !== undefined) {
        if (!data.image.trim()) {
            throw new Error("Image cannot be empty.");
        }
        updateData.image = data.image.trim();
    }

    if (data.price !== undefined) {
        const price = Number(data.price);
        if (!Number.isFinite(price) || price <= 0) {
            throw new Error("Price must be a valid number greater than 0.");
        }
        updateData.price = price;
    }
    if (data.quantity !== undefined) {
        const quantity = Number(data.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) {
            throw new Error("Quantity must be at least 1.");
        }
        updateData.quantity = quantity;
    }
    // delete updateData.isSold;
    return await productRepository.updateById(id, updateData);
};

const markProductAsSold = async (productIds: string[]) => {
    if (!Array.isArray(productIds) || productIds.length === 0) {
        throw new Error("Product IDs are required.");
    }
    const invalidId = productIds.find(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
        throw new Error("Invalid product IDs found.");
    }
    const result = await productRepository.markAsSold(productIds);
    if (result.matchedCount === 0) {
        throw new Error("No products found.");
    }
    return result;
};


export { createProduct, showProductDetails, showProducts, updateProduct, markProductAsSold };