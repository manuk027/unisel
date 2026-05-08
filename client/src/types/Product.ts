export type ProductDetailsType = {
    _id: string;
    name: string;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    price: number;
    description: string;
    images: string[];
    isSold: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};