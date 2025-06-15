import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import ShoeModel from "@/Models/ShoeSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { productName } = await req.json();
        console.log("name in api route:", productName);


        const product = await ShoeModel.findOne({ name: productName });
        console.log("product in api route:", product);

        if (!product) {
            return ApiResponseHandler.notFound("Product not found");
        }

        return ApiResponseHandler.success(product, "Product found");
    } catch (error) {
        console.log("Error in get-product-by-name:", error);
        return ApiResponseHandler.error(error as Error, "Failed to get product by name");
    }
}