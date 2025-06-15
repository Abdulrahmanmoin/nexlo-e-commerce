import {ProductInterface} from "@/types/product";
import api from "../api";

export const createProduct = async ({ name, brand, sizes, price, stock, description, images, category, style, imageFileIds }: ProductInterface) => {
    try {
        const response = await api.post("/product-add", { name, brand, sizes, price, stock, description, images, category, style, imageFileIds });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
} 

