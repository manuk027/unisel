import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";

import { useEffect, useState } from "react";

import {
    getProducts,
    type ProductData,
} from "../../features/products/productAPI";

import { useNavigate, Link } from "react-router-dom";

import NoProductFallback from "../../components/NoProductFallback";

const ProductListing = () => {

    const [products, setProducts] =
        useState<ProductData[]>([]);

    const navigate = useNavigate();

    const fetchProductDetails = async () => {

        try {

            const product = await getProducts();

            setProducts(product.data);

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
                            All Products
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

                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                            >
                                <ProductCard product={product} />
                            </Link>

                        ))}

                    </div>

                ) : (

                    <NoProductFallback />

                )}

            </main>

        </div>
    );
};

export default ProductListing;