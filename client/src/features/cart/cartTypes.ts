type Product = {
    _id: string;
    name: string;
    category: string;
    price: number;
    images: string[];
    isSold: boolean;
};

export type CartItemType = {
    _id: string;
    productId: Product;
};

export type CartState = {
    items: CartItemType[];
    loading: boolean;
    error: string | null;
}