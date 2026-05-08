import { Pencil, Trash2 } from 'lucide-react';
import { type ProductData } from '../features/products/productAPI';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

type Props = {
    product: ProductData;
    onDelete: (id: string) => void;
}

const MyProductCard = ({ product, onDelete }: Props) => {

    return (
        <>

            <div className="flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full">

                {/* IMAGE SECTION */}
                <div className="relative bg-gray-50 h-52 flex items-center justify-center overflow-hidden">
                    <Link
                        to={`/product/${product._id}`}
                        className="w-full h-full flex items-center justify-center p-4"
                    >
                        <img
                            src={product?.images[0]}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </Link>
                </div>

                {/* CONTENT SECTION */}
                <div className="p-4 bg-white flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                            {product.name}
                        </h3>

                        <p className="text-[10px] text-gray-500 mb-1">
                            {product.category}
                        </p>

                        <div className="text-blue-600 font-extrabold text-base">
                            Rs.{product.price.toLocaleString()}
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-1.5 shrink-0">
                        <button
                            onClick={() => { }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>

                        <button
                            onClick={() => onDelete(product._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProductCard;