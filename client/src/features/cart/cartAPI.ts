import api from "../../api/axios";

export const addToCart = async (productId: string) => {
    const response = await api.post("/cart", { productId });
    return response.data;
};

export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
}

export const removeItem = async (productId: string) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
}

export const clearCart = async () => {
    const response = await api.delete("/cart");
    return response.data;
}