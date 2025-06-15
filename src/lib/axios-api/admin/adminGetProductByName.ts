import api  from "@/lib/axios-api/api";

export async function getProductByName(name: string) {
    try {
        console.log("name in getProductByName function:", name);
        const response = await api.post("/get-product-by-name", { productName: name });
        console.log("product in api calling function:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching product by name:", error);
        throw error;
    }
}