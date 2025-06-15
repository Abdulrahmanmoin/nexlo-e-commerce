import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import ShoeModel from "@/Models/ShoeSchema";
import { NextRequest } from "next/server";
import { imagekit } from "../product-delete/route";

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const { productName, updatedData } = await req.json();

        if (!updatedData) {
            return ApiResponseHandler.badRequest("No data provided for update.");
        }

        if (!productName) {
            return ApiResponseHandler.badRequest("Product name is required.");
        }

        const existingProduct = await ShoeModel.findOneAndUpdate(
            { name: productName },
            {
                name: updatedData.name,
                description: updatedData.description,
                price: updatedData.price,
                category: updatedData.category,
                images: updatedData.images,
                stock: updatedData.stock,
                brand: updatedData.brand,
                imageFileIds: updatedData.imageFileIds,
                sizes: updatedData.sizes,
                style: updatedData.style
            },
            { new: false, runValidators: true } // returns the old document before update
        );

        if (!existingProduct) {
            return ApiResponseHandler.notFound("Product not found.");
        }

        // Delete the image from ImageKit and purge the cache
        existingProduct.imageFileIds?.forEach((fileId: string, index: number) => {
            const imageUrl = existingProduct.images?.[index]; // Match index to get the correct URL

            imagekit.deleteFile(fileId, async (error, result) => {
                if (error) {
                    console.error(`Failed to delete image with fileId ${fileId}:`, error);
                    return; // Don't return ApiResponseHandler here in a loop
                } else {
                    console.log(`Successfully deleted image with fileId ${fileId}:`, result);

                    // Purge cache only if URL is available
                    if (imageUrl) {
                        try {
                            const purgeResult = await imagekit.purgeCache(imageUrl);
                            console.log(`Cache purged for: ${imageUrl}`, purgeResult);
                        } catch (purgeError) {
                            console.error(`Failed to purge cache for ${imageUrl}:`, purgeError);
                        }
                    }
                }
            });
        });


        // Get updated document: to send in response
        const updatedShoe = await ShoeModel.findOne({ name: updatedData.name });

        if (!updatedShoe) {
            return ApiResponseHandler.notFound("Product not found.");
        }

        return ApiResponseHandler.success(updatedShoe, "Product updated successfully.");
    } catch (error) {
        console.log("Error in edit product route: ", error);
        return ApiResponseHandler.error(error as Error, "Failed to edit product.");
    }
}