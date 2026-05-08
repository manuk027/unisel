import { type ProductData } from '../features/products/productAPI';

const ProductCard = ({ product }: { product: ProductData }) => {
    return (
        <div className="flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
            <div className="relative flex-1 bg-gray-50 flex items-center justify-center p-4 min-h-0">
                <img src={product?.images[0]} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4 shrink-0 bg-white">
                <h3 className="font-bold text-gray-900 text-sm truncate">{product.name}</h3>
                <p className="text-[10px] text-gray-500 mb-1">{product.category}</p>
                <div className="text-blue-600 font-extrabold text-base">Rs.{product.price.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default ProductCard;