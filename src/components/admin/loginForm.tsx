"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"

import { adminLogin } from "@/lib/axios-api/admin/admin-login"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { loginSchema } from "@/zodSchemas/loginSchema"

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null) // State for error messages

    const router = useRouter()

    // Initialize the form
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // Handle form submission
    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true)
        setErrorMessage(null) // Reset error message

        try {

            const response = await adminLogin(data.email, data.password)

            console.log("admin login response: ", response?.ok);

            if (response?.error) {
                // console.error("Admin login failed:", response.error);
                setErrorMessage(response.error);

                toast.error("Admin Login failed.", {
                    description: response.error,
                })

            }

            if (response?.ok) {

                toast.success("Admin Login Sucessfully.")
                router.push("/admin/dashboard")
            }


        } catch (error: any) {

            if (error.response?.status === 401) {
                setErrorMessage(error.response?.data?.message || "Invalid email or password. Please try again.") // Display error message
            } else {
                setErrorMessage("An unexpected error occurred. Please try again later.")
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {errorMessage && (
                    <div className="text-red-500 text-sm font-medium">{errorMessage}</div> // Display error message
                )}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="admin@example.com"
                                    type="email"
                                    autoComplete="email"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                        <span className="sr-only cursor-pointer">{showPassword ? "Hide password" : "Show password"}</span>
                                        {showPassword ? (
                                            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                                        ) : (
                                            <EyeIcon className="h-4 w-4" aria-hidden="true" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <Link href="#" className="font-medium text-primary hover:text-primary/90">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </Button>
            </form>
        </Form>
    )
}
