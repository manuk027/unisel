import { Pencil, Trash2 } from "lucide-react";
import { type ProductData } from "../features/products/productAPI";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
    product: ProductData;
    onDelete: (id: string) => void;
};

const MyProductCard = ({
    product,
    onDelete,
}: Props) => {

    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const handleDelete = () => {
        onDelete(product._id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">

                <div className="relative bg-gray-50 aspect-square flex items-center justify-center overflow-hidden">

                    <Link
                        to={`/product/${product._id}`}
                        className="w-full h-full flex items-center justify-center p-3 md:p-4"
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </Link>

                </div>

                <div className="p-3 md:p-4 bg-white flex items-start justify-between gap-2 flex-1">

                    <div className="min-w-0 flex-1">

                        <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                            {product.name}
                        </h3>

                        <p className="text-[10px] md:text-xs text-gray-500 mt-1">
                            {product.category}
                        </p>

                        <div className="text-blue-600 font-extrabold text-sm md:text-lg mt-2">
                            Rs. {product.price.toLocaleString()}
                        </div>

                    </div>

                    <div className="flex gap-1.5 shrink-0">

                        <button
                            onClick={() => navigate(`/edit/${product._id}`)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>

                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>

                </div>

            </div>

            {showDeleteModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">

                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Delete Product
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Are you sure you want to delete this product?
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}
        </>
    );
};

export default MyProductCard;