import { DefaultSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/Models/UserSchema";
import connectDB from "@/lib/connectDB";
import { JWT } from "next-auth/jwt";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                await connectDB();

                const user = await UserModel.findOne({ email: credentials.email }) as { _id: string, email: string, fullName: string, password: string, role: string };

                if (!user || !user.password) {
                    throw new Error("User not found or password not set");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.fullName,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                return {
                    ...token,
                    ...user, // Spread the user object, including the role, into the token
                };
            }
            return token;
        },
        async session({ session, token }: { session: DefaultSession; token: JWT }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id, // Pass the user ID from the token
                    role: token.role, // Pass the user role from the token
                },
            };
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
};