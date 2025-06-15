import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import ShoeModel from "@/Models/ShoeSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {

        await connectDB();

        const { name, brand, sizes, price, stock, description, images, category, style, imageFileIds } = await req.json();
      
        // Validate required fields
        if (!name || !brand || !sizes || !price || !stock || !images || !category || !style || !imageFileIds) {
            return ApiResponseHandler.badRequest("All fields are required.");
        }
        
        // Validate price and stock
        if (typeof price !== 'number' || price <= 0) {
            return ApiResponseHandler.badRequest("Price must be a positive number.");
        }
        
        if (typeof stock !== 'number' || stock < 0) {
            return ApiResponseHandler.badRequest("Stock must be a non-negative number.");
        }
        
        // Validate sizes
        if (sizes.length === 0) {
            return ApiResponseHandler.badRequest("Sizes must be a non-empty array.");
        }

        // Validate images
        if (images.length < 3) {
            return ApiResponseHandler.badRequest("Images must be a non-empty array or 3 images are required.");
        }

        // Validate file IDs
        if (imageFileIds.length < 3) {
            return ApiResponseHandler.badRequest("At least 3 image file IDs are required.");
        }

        // Validate category
        if (!category) {
            return ApiResponseHandler.badRequest("Category is required.");
        }

         // Validate style
        if (!style) {
            return ApiResponseHandler.badRequest("Style is required.");
        }

        // Create the product
        const product = await ShoeModel.create({
            name,
            brand,
            sizes,
            price,
            stock,
            description,
            images,
            imageFileIds,
            category,
            style
        });

        // Return success response
        return ApiResponseHandler.success(product, "Product added successfully.");
    } catch(error) {
        console.error("Error adding product:", error);
        return ApiResponseHandler.error(error as Error, "Failed to add product.");
    }
} 