import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import { imagekit } from "@/lib/ImageKitInstance";
import ShoeModel from "@/Models/ShoeSchema";
import { NextRequest } from "next/server";


export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const { productName } = await req.json();

        const product = await ShoeModel.findOne({ name: productName });

        if (!product) {
            return ApiResponseHandler.notFound(`No Product found with this name "${productName}"`);
        }

        // Delete the product from the database
        const deletedProduct = await ShoeModel.findOneAndDelete({ name: productName });

        if (!deletedProduct) {
            return ApiResponseHandler.notFound(`No Product found with this name "${productName}"`);
        }

        // Delete the image from ImageKit using the fileId
        deletedProduct.imageFileIds?.forEach((fileId: string) => {
            imagekit.deleteFile(fileId, (error, result) => {
                if (error) {
                    console.error(`Failed to delete image with fileId ${fileId}:`, error);
                    return ApiResponseHandler.error(error as Error, `Failed to delete image with fileId ${fileId}`);
                } else {
                    console.log(`Successfully deleted image with fileId ${fileId}:`, result);
                }
            });
        })

        return ApiResponseHandler.success(`Product and associated images deleted with name "${productName}"`);
    } catch (error) {
        console.error("Error in Product delete route: ", error);
        return ApiResponseHandler.error(error as Error, "Failed to delete product and associated images.");
    }
}