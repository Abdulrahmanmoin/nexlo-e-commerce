import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import ShoeModel from "@/Models/ShoeSchema";

export async function GET() {
    try {

        await connectDB()
        
        const allShoes = await ShoeModel.find({})

        if (!allShoes) {
            return ApiResponseHandler.notFound("No products found.")
        }
        
        return ApiResponseHandler.success(allShoes, "Products fetched successfully.")
    } catch (error) {
        console.log("Error while getting the products for admin: ", error);
        return ApiResponseHandler.error(error as Error, "Error while getting the products for admin.")
    }
}