import * as productService from '../services/product.service.js'
import { NextFunction, Request, Response } from 'express'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productService.showProductDetails(id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.showProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedProduct = await productService.updateProduct(id, data);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

const markAsSold = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productIds } = req.body;
        const result = await productService.markProductAsSold(productIds);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};