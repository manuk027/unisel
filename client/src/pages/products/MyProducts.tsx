import MyProductCard from "../../components/MyProductCard";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getMyProducts } from "../../features/products/productAPI";
import { type ProductData } from "../../features/products/productAPI";
import { useNavigate, Link } from "react-router-dom";
import { deleteProduct } from "../../features/products/productAPI";
import { toast } from "react-toastify";
import NoProductFallback from "../../components/NoProductFallback";


const MyProducts = () => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const navigate = useNavigate();

    const fetchProductDetails = async () => {
        try {
            const product = await getMyProducts();

            setProducts(product.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
            toast.success("Product deleted successfully.", { containerId: "productToast", });
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
                        <h1 className="text-3xl font-black text-gray-900 leading-tight">My products</h1>
                    </div>
                    <button onClick={() => navigate("/sell")} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <span className="text-lg leading-none">+</span>Add Product
                    </button>
                </header>
                {products.length > 0 ? (
                    <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-4 min-h-0">
                        {products.slice(0, 8).map((product) => (
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


