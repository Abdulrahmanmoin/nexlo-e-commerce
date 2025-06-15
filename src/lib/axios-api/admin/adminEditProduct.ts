import { ProductInterface } from "@/types/product";
import api from "../api";

export async function editProduct({ productName, updatedData }: { productName: string; updatedData: ProductInterface }) {
    try {

        const response = await api.patch("/edit-product", { productName, updatedData })
        return response.data;

    } catch (error) {
        console.error('Failed to edit product:', error);
        throw error;
    }

}