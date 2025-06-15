import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await connectDB();

        // Parse the request body
        const { email, password } = await req.json();

        console.log("Admin email:", email);
        console.log("Admin password:", password);
        
          
        if (!email || !password) {
            return ApiResponseHandler.unauthorized("Admin email and password are required.");
        }

        // Validate admin credentials (this is a placeholder, implement your own logic)
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return ApiResponseHandler.unauthorized("Invalid admin credentials.");
        }

        // Return success response
        return ApiResponseHandler.success("Admin credentials are valid.");
    } catch (error) {
        console.error("Error checking admin credentials:", error);
        return ApiResponseHandler.error(error as Error, "An error occurred while checking admin credentials.");
    }
}