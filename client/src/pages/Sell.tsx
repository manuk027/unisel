import ProductForm from "../components/ProductForm";
import { uploadProduct } from "../features/products/productAPI";

const Sell = () => {

    const handleCreateProduct = async (productData: {
        name: string;
        price: number;
        category:
        | "Electronics"
        | "Books"
        | "Fashion"
        | "Pets"
        | "Cars"
        | "Bikes"
        | "Properties"
        | "Mobile"
        | "Vehicle Spares"
        | "Furniture";
        description: string;
        images: string[];
    }) => {

        await uploadProduct(productData);
    };

    return (
        <ProductForm
            onSubmitHandler={handleCreateProduct}
        />
    );
};

export default Sell;