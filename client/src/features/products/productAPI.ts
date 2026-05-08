import api from "../../api/axios";

type ProductData = {
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
};

export const uploadProduct = async (data: ProductData) => {
    const response = await api.post("/products", data);
    return response.data;
};