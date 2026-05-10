import * as productRepository from '../repositories/product.repository.js';
import { CreateProductDTO, UpdateProductDTO } from '../types/product.types.js';
import mongoose from 'mongoose';

const createProduct = async (data: CreateProductDTO) => {
    if (!data.name?.trim() || !data.category?.trim() || !data.description?.trim()) {
        throw new Error("All fields are mandatory, fill all the details.");
    }
    if (!data.userId || !mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId.");
    }
    const price = Number(data.price);
    if (!Number.isFinite(price) || price <= 0) {
        throw new Error("Price must be a valid number greater than 0.");
    }
    if (data.description.trim().length < 10) {
        throw new Error("The description should contain at least 10 characters.");
    }
    const productData = { ...data, name: data.name.trim(), category: data.category.trim(), description: data.description.trim(), image: data.images, price, isSold: false };
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product id.");
    }
    if (!data || Object.keys(data).length === 0) {
        throw new Error("No update data provided.");
    }
    const updateData: any = {};
    if (data.name !== undefined) {
        if (!data.name.trim()) throw new Error("Name cannot be empty.");
        updateData.name = data.name.trim();
    }
    if (data.category !== undefined) {
        if (!data.category.trim()) throw new Error("Category cannot be empty.");
        updateData.category = data.category.trim();
    }
    if (data.description !== undefined) {
        if (data.description.trim().length < 10) {
            throw new Error("Description must be at least 10 characters.");
        }
        updateData.description = data.description.trim();
    }
    if (data.images !== undefined) {
        if (data.images.length < 1) throw new Error("At least 1 image is mandatory.");
        if (data.images.length > 4) throw new Error("Upload no more than 4 images.");
        updateData.images = data.images;
    }
    if (data.price !== undefined) {
        const price = Number(data.price);
        if (!Number.isFinite(price) || price <= 0) {
            throw new Error("Invalid price.");
        }
        updateData.price = price;
    }
    const updated = await productRepository.updateById(id, updateData);
    if (!updated) {
        throw new Error("Product not found or already sold.");
    }
    return updated;
};

const markProductAsSold = async (productIds: string[]) => {
    if (!Array.isArray(productIds) || productIds.length === 0) {
        throw new Error("Product IDs are required.");
    }
    const invalidId = productIds.find(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
        throw new Error("Invalid product IDs found.");
    }
    return productRepository.markAsSold(productIds);
};

const showMyProducts = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user id.");
    }
    return await productRepository.getMyProducts(id);
}

const deleteProduct = async (productId: string) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product id.");
    }
    return await productRepository.deletProduct(productId);
}


export { createProduct, showProductDetails, showProducts, updateProduct, markProductAsSold, showMyProducts, deleteProduct };