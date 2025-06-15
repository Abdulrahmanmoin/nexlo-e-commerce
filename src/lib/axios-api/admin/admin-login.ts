import api from "@/lib/axios-api/api";
import { signIn } from "next-auth/react"
import { toast } from "sonner"

export const adminLogin = async (email: string, password: string) => {
    try {

        // await api.post("/api/auth/signin/credentials", {
        //     email,
        //     password,
        //     redirect: false
        // });

        const response = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password
        })

        return response;

        // if (response?.error) {
        //     console.error("Admin login failed:", response.error);

        //     toast.error("Admin Login failed.", {
        //         description: response.error,
        //     })
        // }

        // if(response?.ok) {

        //     // toast.success("Admin Login Sucessfully.")
        //     redirect('/admin/dashboard')
        // }


    } catch (error) {
        // console.error("Error during admin login:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}