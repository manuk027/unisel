import { type CartItemType } from "../features/cart/cartTypes";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { type AppDispatch } from "../app/store";
import { removeItemFromCart } from "../features/cart/cartSlice";

const CartItem = ({ item }: { item: CartItemType }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showModal, setShowModal] = useState(false);
    const product = item.productId;

    const handleRemove = async () => {
        try {
            await dispatch(removeItemFromCart(product._id));
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 border-b border-gray-100 last:border-0">
                <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product?.images?.[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-grow space-y-1 text-center sm:text-left">
                    <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
                    <p className="text-blue-600 font-bold">Rs.{product?.price?.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-5">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-400">Quantity</span>
                        <div className="border border-gray-200 rounded-md px-3 py-1 bg-white"><span className="font-medium">1</span></div>
                    </div>
                    <div className="text-right min-w-[90px]">
                        <p className="font-bold text-gray-900">Rs.{product?.price?.toLocaleString()}</p>
                    </div>
                    <button onClick={() => setShowModal(true)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Remove Item</h2>
                        <p className="text-gray-500 mb-6">Are you sure you want to remove this item from your cart?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium">Cancel</button>
                            <button onClick={handleRemove} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium">Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartItem;