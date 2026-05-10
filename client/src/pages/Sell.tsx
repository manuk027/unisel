import ProductForm from "../components/ProductForm";
import { uploadProduct } from "../features/products/productAPI";

export type ProductFormType = {
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
    images: string[];
};

const Sell = () => {

    const handleCreateProduct = async (productData: ProductFormType) => {
        await uploadProduct(productData);
    };

    return (<ProductForm onSubmitHandler={handleCreateProduct} />);
};

export default Sell;