import { useState } from "react";
import { AlertTriangle, ArrowLeft, ShoppingBag, X, } from "lucide-react";
import { Link, useNavigate, } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { type RootState } from "../app/store";
import { validateCheckoutApi, checkoutApi, } from "../features/checkout/checkoutAPI";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../app/store";
import { fetchCart } from "../features/cart/cartSlice";

const Checkout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const items = useSelector((state: RootState) => state.cart.items);
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const total = items.reduce((acc, item) => acc + item.productId.price, 0);

    const handleFinalCheckout = async () => {
        try {
            setLoadingCheckout(true);
            await validateCheckoutApi();
            const response = await checkoutApi();
            toast.success(response.data.message || "Checkout completed successfully", { containerId: "productToast", });
            await dispatch(fetchCart());
            navigate("/");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Some products are already sold. Remove them from cart.", { containerId: "productToast", });
            setOpenWarningModal(false);
            await dispatch(fetchCart());
            navigate("/");
        } finally {
            setLoadingCheckout(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            {openWarningModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
                        <div className="flex items-start justify-between p-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                                    <AlertTriangle className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Important Warning</h2>
                                    <p className="text-sm text-gray-500 mt-1">Please read before continuing</p>
                                </div>
                            </div>
                            <button onClick={() => setOpenWarningModal(false)} className="p-2 rounded-xl hover:bg-gray-100 transition">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                                <p className="text-sm text-yellow-800 leading-relaxed">This platform only connects buyers and sellers. All payments, meetings, and transactions are handled directly between users.</p>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex gap-3">
                                    <span className="font-bold text-red-500">•</span>
                                    <p>We do not guarantee product quality or seller credibility.</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-red-500">•</span>
                                    <p>Meet sellers in safe public locations.</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-red-500">•</span>
                                    <p>Avoid advance payments unless trusted.</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-red-500">•</span>
                                    <p>This platform is not responsible for fraud, scams, disputes, or losses.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t flex flex-col sm:flex-row gap-3">
                            <button onClick={() => setOpenWarningModal(false)} className="flex-1 py-3 rounded-xl border font-bold hover:bg-gray-50 transition">Cancel</button>
                            <button
                                onClick={handleFinalCheckout}
                                disabled={loadingCheckout}
                                className={`flex-1 py-3 rounded-xl text-white font-black transition
                                ${loadingCheckout ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                                {loadingCheckout ? "Processing..." : "I Understand, Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Link to="/cart" className="p-2 rounded-xl border bg-white hover:bg-gray-100 transition">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
                        <p className="text-sm text-gray-500 mt-1">Review your selected products</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <ShoppingBag size={20} className="text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-900">Selected Products</h2>
                            </div>
                            <div className="space-y-5">
                                {items.map((item) => (
                                    <div key={item._id} className="flex items-center justify-between gap-4 border-b pb-5 last:border-none">
                                        <div className="flex items-center gap-4">
                                            <img src={item.productId.images[0]} alt={item.productId.name} className="w-20 h-20 rounded-xl object-cover border" />
                                            <div>
                                                <h3 className="font-bold text-gray-900">{item.productId.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{item.productId.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-black text-blue-600">₹{item.productId.price.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                            <h2 className="text-2xl font-black text-gray-900 mb-6">Summary</h2>
                            <div className="flex items-center justify-between border-b pb-4">
                                <span className="text-gray-600">Total Items</span>
                                <span className="font-bold">{items.length}</span>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-black text-blue-600">₹{total.toLocaleString()}</span>
                            </div>
                            <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-4">
                                <p className="text-sm text-red-700 leading-relaxed">Buyers and sellers deal directly with each other. Please verify products and sellers carefully before making payments.</p>
                            </div>
                            <button onClick={() => setOpenWarningModal(true)}
                                disabled={items.length === 0}
                                className={`w-full mt-6 transition text-white py-3.5 rounded-xl font-black shadow-md active:scale-95
                                ${items.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                                {items.length === 0 ? "Cart is Empty" : "Confirm Purchase"}
                            </button>
                            <Link to="/cart" className="block text-center text-sm text-blue-600 mt-4 hover:underline">Back to Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Checkout;