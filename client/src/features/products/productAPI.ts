import api from "../../api/axios";

export type ProductForm = {
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
};


export type ProductData = {
    _id: string;
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
};


export const uploadProduct = async (data: ProductForm) => {
    const response = await api.post("/products", data);
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
}

export const getProductDetails = async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}