import { ApiResponseHandler } from "@/lib/api-response";
import connectDB from "@/lib/connectDB";
import { sendVerificationEmail } from "@/lib/emailService";
import UserModel from "@/Models/UserSchema";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { fullName, email, password, role } = await req.json();

        // Validate is email already exists
        const existedEmailUser = await UserModel.findOne({ email });

        if (existedEmailUser) {
            return ApiResponseHandler.badRequest("Email already exists, please use another email address.")
        }

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Set verification code expiry to 2 hours from now
        const verificationCodeExpiry = new Date(Date.now() + 2 * 60 * 60 * 1000);

        // Sending email
        sendVerificationEmail(email, fullName, verificationCode)

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // role.tolowerCase();

        // Save the user with the verification code and expiry
        const user = await UserModel.create({
            fullName,
            email,
            password: hashedPassword,
            role: role || "user",
            verificationCode,
            verificationCodeExpiry,
        });

        return ApiResponseHandler.success(user, "User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        return ApiResponseHandler.error(error as Error, "Error creating user");
    }
}