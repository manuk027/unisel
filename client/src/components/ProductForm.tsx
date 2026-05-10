import { Upload, ChevronDown, Tag, X, LoaderCircle, } from "lucide-react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { useState, useMemo, useEffect, } from "react";
import uploadImageToCloudinary from "../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormType = {
    name: string;
    price: number;
    category: | "Electronics" | "Books" | "Fashion" | "Pets" | "Cars" | "Bikes" | "Properties" | "Mobile" | "Vehicle Spares" | "Furniture";
    description: string;
};

type ProductFormProps = {
    initialData?: FormType & { images?: string[]; };
    isEdit?: boolean;
    onSubmitHandler: (productData: {
        name: string;
        price: number;
        category: FormType["category"];
        description: string;
        images: string[];
    }) => Promise<void>;
};

const ProductForm = ({ initialData, isEdit = false, onSubmitHandler, }: ProductFormProps) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
    const [imageError, setImageError] = useState("");
    const { register, handleSubmit, formState: { errors }, } = useForm<FormType>({ defaultValues: initialData, });

    useEffect(() => {
        if (initialData?.images) {
            setExistingImages(initialData.images);
        }
    }, [initialData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        setImageError("");
        const newFiles = Array.from(files);
        if (existingImages.length + selectedImages.length + newFiles.length > 4) {
            setImageError("Maximum 4 images allowed");
            return;
        }
        const validTypes = ["image/jpeg", "image/png", "image/webp",];
        const invalidType = newFiles.some((file) => !validTypes.includes(file.type)
        );
        if (invalidType) {
            setImageError("Only JPG, PNG, WEBP allowed");
            return;
        }
        const invalidSize = newFiles.some((file) => file.size > 5_000_000);
        if (invalidSize) {
            setImageError("Each image must be under 5MB");
            return;
        }
        setSelectedImages((prev) => [...prev, ...newFiles,]);
        e.target.value = "";
    };

    const removeImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const imagePreviews = useMemo(() => {
        return selectedImages.map((file) => URL.createObjectURL(file));
    }, [selectedImages]);

    useEffect(() => {
        return () => { imagePreviews.forEach((url) => URL.revokeObjectURL(url)); };
    }, [imagePreviews]);


    const onSubmit = async (data: FormType) => {
        try {
            setUploading(true);
            if (existingImages.length === 0 && selectedImages.length === 0) {
                setUploading(false);
                setImageError("Please upload at least one image");
                return;
            }
            const uploadedImageUrls = await Promise.all(selectedImages.map((file) => uploadImageToCloudinary(file)));
            const productData = { name: data.name, price: data.price, category: data.category, description: data.description, images: [...existingImages, ...uploadedImageUrls], };
            await onSubmitHandler(productData);
            navigate("/");
            toast.success("Product listed successfully", { containerId: "productToast", });
        } catch (error) {
            toast.error("Product listing Failed", { containerId: "productToast", });
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 pb-32 md:pb-12 md:py-12">
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3">{isEdit ? "Edit Product" : "Add a product for sale"}</h1>
                    <p className="text-xs text-slate-400">(Fill in the details below to listyour product on Unisel.)</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-12">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                            <div className="flex-1 space-y-5 md:space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-800 ml-1">Product Name</label>
                                    <input
                                        {...register("name", {
                                            required: "Name is required.",
                                            minLength: {
                                                value: 3,
                                                message: "Name should have atleast 3 characters.",
                                            },
                                        })}
                                        type="text" placeholder="Enter product name" className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all" />
                                    {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-800 ml-1">Price (Rs.)</label>
                                    <input
                                        {...register("price", {
                                            required: "Price is required.",
                                            valueAsNumber: true,
                                            min: {
                                                value: 1,
                                                message: "Price must be greater than 0.",
                                            },
                                        })}
                                        type="number" placeholder="Enter price" className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all" />
                                    {errors.price && (<p className="text-red-500 text-sm mt-1">{errors.price.message}</p>)}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-800 ml-1">Category</label>
                                    <div className="relative">
                                        <select
                                            {...register("category",
                                                {
                                                    required: "Please select a category",
                                                }
                                            )}
                                            className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all text-slate-500 cursor-pointer">
                                            <option value="">Select a category</option>
                                            <option value="Cars">Cars</option>
                                            <option value="Bikes">Bikes</option>
                                            <option value="Properties">Properties</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Vehicle Spares">Vehicle Spares</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Pets">Pets</option>
                                            <option value="Books">Books</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    </div>
                                    {errors.category && (<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>)}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-800 ml-1">Description</label>
                                    <textarea
                                        {...register("description",
                                            {
                                                required: "Description is required.",
                                                validate: (desc) => desc.trim().length > 50 || "Description must contain atleast 50 characters.",
                                            }
                                        )}
                                        rows={4} placeholder="Describe your product, its condition, features, etc." className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all resize-none" />
                                    {errors.description && (<p className="text-red-500 text-sm mt-1">{errors.description.message}</p>)}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="text-sm font-bold text-slate-800 ml-1">Product Images</label>
                                <p className="text-xs text-slate-400 mt-1 mb-4">Upload clear images of yourproduct</p>
                                <input type="file" id="productImages" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                <label htmlFor="productImages" className={`flex-grow border-2 border-dashed rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 bg-[#F9FBFF] flex flex-col items-center justify-center text-center transition-all group ${uploading ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-blue-50/50 cursor-pointer"}`}>
                                    {uploading ? (
                                        <>
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                                                <LoaderCircle size={30} className="text-blue-600 animate-spin" />
                                            </div>
                                            <p className="font-bold text-blue-700 text-base md:text-lg">Uploading Images...</p>
                                            <p className="text-sm text-slate-500 mt-2">Please wait while your images are being uploaded</p>
                                            <div className="w-full max-w-xs h-2 bg-blue-100 rounded-full mt-6 overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full animate-pulse w-3/4"></div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#E8F0FF] text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Upload size={24} className="md:w-7 md:h-7" />
                                            </div>
                                            <p className="font-bold text-slate-800 text-sm md:text-base">Upload product images</p>
                                            <p className="text-xs md:text-sm text-slate-500 mt-1">Drag & drop or click to browse</p>
                                            <p className="text-[10px] text-slate-400 mt-3 font-semibold uppercase tracking-tighter">JPG, PNG, WEBP • Max 5MB • Up to 4 Images</p>
                                        </>
                                    )}
                                </label>
                                {imageError && (<p className="text-red-500 text-sm mt-2">{imageError}</p>)}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                                    {existingImages.length > 0 || imagePreviews.length > 0 ? (
                                        <>
                                            {existingImages.map((image, index) => (
                                                <div key={image} className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
                                                    <img src={image} alt={`Existing ${index + 1}`} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => removeExistingImage(index)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {imagePreviews.map((preview, index) => (
                                                <div key={preview} className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
                                                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        [1, 2, 3, 4].map((i) => (
                                            <div key={i} className="aspect-square rounded-xl md:rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-sm">
                                                {i}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                        <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-100 transition-all transform active:scale-95">
                            <Tag size={18} />
                            {isEdit ? "Update Product" : "List Product"}
                        </button>
                        <button onClick={() => navigate("/")} type="button" className="text-slate-400 font-bold hover:text-slate-800 transition-colors">Cancel</button>
                    </div>
                </form>
            </main>
        </div >
    );
};

export default ProductForm;