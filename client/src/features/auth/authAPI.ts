import api from "../../api/axios";

type LoginData = {
    email: string;
    password: string;
}

type RegisterData = {
    name: string;
    email: string;
    password: string;
}

export const loginUserAPI = async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const registerUserAPI = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const googleLoginAPI = async (data: { email: string, name: string, googleId: string, avatar: string }) => {
    const response = await api.post("/auth/google", data);
    return response.data;
};