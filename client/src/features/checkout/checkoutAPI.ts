import api from "../../api/axios";


export const validateCheckoutApi = async () => {
    const response = await api.post("/checkout/validate");
    return response.data;
};

export const checkoutApi = async () => {
    const response = await api.post("/checkout");
    return response.data;
}