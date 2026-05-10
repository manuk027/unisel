import { useState, useEffect } from 'react';
import { Mail, Tag, MapPin, MessageCircle, ShoppingCart, Handshake, ShieldCheck, AlertTriangle, Phone, LayoutGrid, Clock } from 'lucide-react';
import Navbar from "../../components/Navbar";
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../features/products/productAPI';
import { type ProductDetailsType } from '../../types/Product';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../app/store';
import { addItemToCart, fetchCart } from '../../features/cart/cartSlice';

const ProductDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { items } = useSelector((state: RootState) => state.cart);
    const [selectedImg, setSelectedImg] = useState(0);
    const [productD, setProduct] = useState<ProductDetailsType | null>(null);
    const params = useParams();
    const productId = params.productId || "";

    const productDetails = async (productId: string) => {
        try {
            const productDetail = await getProductDetails(productId);
            setProduct(productDetail.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        productDetails(productId);
    }, [productId]);

    const handleAddToCart = async (productId: string) => {
        try {
            if (productD?.userId === user?.id) {
                toast.info("Seller cannot add the product to cart", { containerId: "productToast", });
                return;
            }
            if (items.some((item) => item.productId._id === productId)) {
                toast.info("Item already added to cart", { containerId: "productToast", });
                return;
            }
            const latestProduct = await getProductDetails(productId);
            if (latestProduct.data.isSold) {
                toast.error("This product has already been sold", { containerId: "productToast", });
                setProduct(latestProduct.data);
                return;
            }
            await dispatch(addItemToCart(productId));
            await dispatch(fetchCart());
            setIsAddedToCart(true);
            toast.success("Added to cart", { containerId: "productToast", });
        } catch (error) {
            console.error(error);
        }
    }

    const SafetyCard = ({ icon, title, desc, bgColor, borderColor }: any) => (
        <div className={`${bgColor} ${borderColor} p-4 rounded-xl border-2 flex items-center gap-4`}>
            <div className="shrink-0">{icon}</div>
            <div>
                <p className="text-sm font-black text-gray-900 tracking-tight">{title}</p>
                <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{desc}</p>
            </div>
        </div>
    );

    const StatItem = ({ icon, value, label }: { icon: any, value: any, label: any }) => (
        <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-blue-600">
                {icon}
                <span className="font-bold text-xs sm:text-sm text-gray-900 truncate max-w-[80px] sm:max-w-none">{value}</span>
            </div>
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">{label}</p>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 lg:pt-4 pb-24 lg:pb-12 w-full space-y-6 lg:space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="relative aspect-[4/3] bg-white rounded-2xl flex items-center justify-center p-6 sm:p-10 overflow-hidden shadow-sm border border-gray-100">
                            <img src={productD?.images[selectedImg]} alt="Main" className="max-h-full object-contain transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="flex gap-2 px-1 overflow-x-auto pb-2 no-scrollbar">
                            {productD?.images.map((img, i) => (
                                <button key={i} onClick={() => setSelectedImg(i)} className={`w-14 h-14 shrink-0 rounded-lg border-2 p-1 bg-white overflow-hidden transition-all ${selectedImg === i ? 'border-blue-600' : 'border-gray-100'}`}>
                                    <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-2">
                            <Tag size={12} />
                            <span className="text-[9px] uppercase tracking-widest">{productD?.category}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">{productD?.name}</h1>
                        <div className="text-2xl font-black text-blue-600 mt-2 tracking-tighter">Rs. {productD?.price}</div>
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                                <LayoutGrid size={16} className="text-blue-600" />
                                <div>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Condition</p>
                                    <p className="text-xs font-bold text-gray-800 tracking-tight">Like New</p>
                                </div>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                                <MapPin size={16} className="text-blue-600" />
                                <div>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Location</p>
                                    <p className="text-xs font-bold text-gray-800 tracking-tight">New York, USA</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm whitespace-pre-line line-clamp-4 lg:line-clamp-none py-2">{productD?.description}</p>
                        <div className="mt-8 lg:mt-auto">
                            <button
                                disabled={isAddedToCart || productD?.isSold}
                                onClick={() => { if (productD?._id && !productD?.isSold) { handleAddToCart(productD._id); } }}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm shadow-md transition-all active:scale-95 ${productD?.isSold ? "bg-red-500 cursor-not-allowed text-white" : isAddedToCart ? "bg-green-500 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
                                <ShoppingCart size={18} />
                                {productD?.isSold ? "Product Sold" : isAddedToCart ? "Added to Cart" : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SafetyCard icon={<Handshake size={20} className="text-orange-600" />} title="Meet in Public" desc="Safe, public place exchanges." bgColor="bg-orange-50" borderColor="border-orange-100" />
                    <SafetyCard icon={<ShieldCheck size={20} className="text-blue-600" />} title="Inspect Item" desc="Verify quality before buying." bgColor="bg-blue-50" borderColor="border-blue-100" />
                    <SafetyCard icon={<AlertTriangle size={20} className="text-gray-600" />} title="No Pre-payments" desc="Pay only after inspection." bgColor="bg-gray-100" borderColor="border-gray-200" />
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                        <div className="flex items-center gap-3 self-start lg:self-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" alt="Seller" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="text-sm font-black text-gray-900 leading-none">John Doe</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Verified Seller</p>
                            </div>
                        </div>
                        <div className="w-full lg:flex-1 flex justify-between sm:justify-around lg:border-x border-gray-100 lg:px-6 py-1">
                            <StatItem icon={<Mail size={14} />} value="user@gmail.com" label="Email" />
                            <StatItem icon={<Phone size={14} />} value="+91 828..." label="Phone" />
                            <StatItem icon={<Clock size={14} />} value="Active" label="Status" />
                        </div>
                        <div className="w-full lg:w-auto">
                            <a href="https://wa.me/918281337927" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#25D366] text-white text-xs font-black transition-transform active:scale-95">
                                <MessageCircle size={16} fill="currentColor" />
                                Chat Seller
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;