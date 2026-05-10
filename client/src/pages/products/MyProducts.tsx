import MyProductCard from "../../components/MyProductCard";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import {
    deleteProduct,
    getMyProducts,
    type ProductData,
} from "../../features/products/productAPI";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoProductFallback from "../../components/NoProductFallback";

const MyProducts = () => {

    const [products, setProducts] =
        useState<ProductData[]>([]);

    const navigate = useNavigate();

    const fetchProductDetails = async () => {

        try {

            const product = await getMyProducts();

            setProducts(product.data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {

        try {

            await deleteProduct(id);

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product._id !== id
                )
            );

            toast.success(
                "Product deleted successfully.",
                {
                    containerId: "productToast",
                }
            );

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-8">

                <header className="flex items-center justify-between mb-6 md:mb-8">

                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                            My Products
                        </h1>
                    </div>

                    <button
                        onClick={() => navigate("/sell")}
                        className="bg-blue-600 text-white px-4 md:px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                    >
                        <span className="text-lg leading-none">
                            +
                        </span>

                        <span className="hidden sm:inline">
                            Add Product
                        </span>
                    </button>

                </header>

                {products.length > 0 ? (

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                        {products.map((product) => (

                            <MyProductCard
                                key={product._id}
                                product={product}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>

                ) : (

                    <NoProductFallback />

                )}

            </main>

        </div>
    );
};

export default MyProducts;