import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "../../features/products/productAPI";
import { type ProductData } from "../../features/products/productAPI";
import { useNavigate, Link } from "react-router-dom";

const ProductListing = () => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const navigate = useNavigate();

    const fetchProductDetails = async () => {
        try {
            const product = await getProducts();
            setProducts(product.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
            <Navbar />
            <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 py-4 overflow-hidden">
                <header className="flex items-center justify-between mb-4 shrink-0">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 leading-tight">All products</h1>
                    </div>
                    <button onClick={() => navigate("/sell")} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <span className="text-lg leading-none">+</span>Add Product
                    </button>
                </header>
                <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-4 min-h-0">
                    {products.slice(0, 8).map((product) => (<Link key={product._id} to={`/product/${product._id}`}><ProductCard product={product} /></Link>))}
                </div>
                {/* <div className="flex justify-center items-center gap-2 py-4 shrink-0">
                    <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-white hover:shadow-sm transition-all text-sm">&lt;</button>
                    <button className="w-9 h-9 bg-blue-600 text-white rounded-md font-bold text-sm shadow-lg shadow-blue-100">1</button>
                    <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-white hover:shadow-sm transition-all text-sm">2</button>
                    <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-white hover:shadow-sm transition-all text-sm">3</button>
                    <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-white hover:shadow-sm transition-all text-sm">&gt;</button>
                </div> */}
            </main>
        </div>
    );
};

export default ProductListing;