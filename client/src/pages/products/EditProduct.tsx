import ProductForm from "../../components/ProductForm";
import {
    getProductDetails,
    updateProduct,
} from "../../features/products/productAPI";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type FormType = {
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

    images?: string[];
};

const EditProduct = () => {

    const { productId } = useParams();

    const [productData, setProductData] =
        useState<FormType | null>(null);

    useEffect(() => {

        const fetchProduct = async () => {

            if (!productId) return;

            try {

                const response =
                    await getProductDetails(productId);

                setProductData({
                    name: response.data.name,
                    price: response.data.price,
                    category: response.data.category,
                    description: response.data.description,
                    images: response.data.images,
                });

            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();

    }, [productId]);

    const handleUpdateProduct = async (updatedData: {
        name: string;
        price: number;
        category: FormType["category"];
        description: string;
        images: string[];
    }) => {

        if (!productId) return;

        await updateProduct(productId, updatedData);
    };

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <ProductForm
            initialData={productData}
            isEdit={true}
            onSubmitHandler={handleUpdateProduct}
        />
    );
};

export default EditProduct;