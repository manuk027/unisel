import { Upload, ChevronDown, Tag } from "lucide-react";
import Navbar from "../components/navbar";

const SellPage = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3">Add a product for sale</h1>
                    <p className="text-xs text-slate-400">(Fill in the details below to list your product on Unisel.)</p>
                </div>
                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        <div className="flex-1 space-y-5 md:space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Price (Rs.)</label>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Category</label>
                                <div className="relative">
                                    <select className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all text-slate-500 cursor-pointer">
                                        <option>Select a category</option>
                                        <option>Electronics</option>
                                        <option>Books</option>
                                        <option>Fashion</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your product, its condition, features, etc."
                                    className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label className="text-sm font-bold text-slate-800 ml-1">Product Images</label>
                            <p className="text-xs text-slate-400 mt-1 mb-4">Upload a clear image of your product</p>
                            <div className="flex-grow border-2 border-dashed border-slate-200 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 bg-[#F9FBFF] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 transition-all group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#E8F0FF] text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Upload size={24} className="md:w-7 md:h-7" />
                                </div>
                                <p className="font-bold text-slate-800 text-sm md:text-base">Upload an image</p>
                                <p className="text-xs md:text-sm text-slate-500 mt-1">Drag & drop or click to browse</p>
                                <p className="text-[10px] text-slate-400 mt-3 font-semibold uppercase tracking-tighter">JPG, PNG up to 5MB</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2 md:gap-4 mt-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-square rounded-lg md:rounded-xl bg-slate-50 border border-slate-100 border-dashed hover:border-blue-200 transition-colors cursor-pointer"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                    <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-100 transition-all transform active:scale-95">
                        <Tag size={18} />
                        List Product
                    </button>
                    <button className="text-slate-400 font-bold hover:text-slate-800 transition-colors">
                        Cancel
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SellPage;