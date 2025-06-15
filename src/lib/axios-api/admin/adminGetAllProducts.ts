import api from "../api"

export const getAllProducts = async () => {
    try {
        const response = await api.get("/get-all-products");
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }

}
