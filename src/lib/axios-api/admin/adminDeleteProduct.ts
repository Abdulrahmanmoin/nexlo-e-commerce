import api from "../api"

export const adminDeleteProduct = async (productName: string) => {
    try {
        const response = await api.delete("/product-delete", { data: { productName } })
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
}