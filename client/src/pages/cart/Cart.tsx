import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { ChevronLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../app/store";
import { clearItemsFromCart } from "../../features/cart/cartSlice";
import { useState } from "react";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items);
    const [showClearModal, setShowClearModal] = useState(false);
    const totalAmount = items.reduce((total, item) => total + item.productId.price, 0);

    const handleClearCart = async () => {
        try {
            await dispatch(clearItemsFromCart());
            setShowClearModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-900">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold mb-2 text-slate-900">Your cart</h1>
                    <p className="text-gray-500 font-medium">{items.length} items in your cart</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        {items.length ? (
                            items.map((item) => (<CartItem key={item._id} item={item} />))
                        ) : (
                            <p className="text-gray-500">Your cart is empty</p>
                        )}
                    </div>
                    <div className="lg:col-span-1 lg:sticky lg:top-24">
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold mb-8">Order Summary</h2>
                            <div className="space-y-4 mb-8 text-sm sm:text-base">
                                <div className="flex justify-between text-gray-500">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="font-bold text-gray-900">Rs.{totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span className="text-lg font-bold">Platform Fee</span>
                                    <span className="font-bold text-gray-900">Rs.0</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-100 mb-8 flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-black text-blue-600">Rs.{totalAmount}</span>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-[0.98]">Proceed to Checkout</button>
                            {items.length > 0 && (
                                <button onClick={() => setShowClearModal(true)} className="w-full mt-4 border border-red-500 text-red-500 hover:bg-red-50 font-bold py-4 rounded-xl transition-all">Clear Cart</button>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate("/buy")} className="mt-10 flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
                    <ChevronLeft size={20} className="mr-1" />
                    Continue Shopping
                </button>
            </main>
            {showClearModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Clear Cart</h2>
                        <p className="text-gray-500 mb-6">Are you sure you want to remove all items from your cart?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowClearModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium">Cancel</button>
                            <button onClick={handleClearCart} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium">Clear</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;