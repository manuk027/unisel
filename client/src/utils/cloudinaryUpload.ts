import axios from "axios";

const uploadImageToCloudinary = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
        return response.data.secure_url;
    } catch (error) {
        console.error(error);
        throw new Error("Image upload failed.");
    }
}

export default uploadImageToCloudinary;