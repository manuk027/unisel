import * as productService from '../services/product.service.js'
import { NextFunction, Request, Response } from 'express'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const product = await productService.createProduct({ ...req.body, userId, });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productService.showProductDetails(id);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
}

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.showProducts();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateProduct(id, req.body);
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        next(error);
    }
}

const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const products = await productService.showMyProducts(userId);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }

}

const deleteProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deleteProduct = await productService.deleteProduct(id);
        res.status(200).json({ success: true, data: deleteProduct });
    } catch (error) {
        next(error);
    }
}

export { createProduct, getProductById, getAllProducts, updateProduct, getMyProducts, deleteProduct };