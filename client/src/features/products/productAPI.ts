import api from "../../api/axios";

export type ProductForm = {
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
    images: string[];
};


export type ProductData = {
    _id: string;
    images: string[];
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
};

// export type ProductPayload = {
//     name: string;
//     price: number;
//     category: string;
//     description: string;
//     images: string[];
// }


export const uploadProduct = async (data: ProductForm) => {
    const response = await api.post("/products", data);
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
}

export const getMyProducts = async () => {
    const response = await api.get("/products/my-products");
    return response.data;
}

export const getProductDetails = async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}


export const deleteProduct = async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}


export const updateProduct = async (productId: string, data: ProductForm) => {
    const response = await api.put(`/products/${productId}`, data);
    return response.data;
}