"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { signupSchema } from '@/zodSchemas/signupSchema'
import { signUp } from '@/lib/axios-api/app/signUp'
import { useRouter } from 'next/navigation'


export default function SignUpForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    // Define your form.
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "", // Added default value for fullName
            email: "",
            password: ""
        },
    })

    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof signupSchema>) {
        setIsLoading(true)
        await signUp(values.fullName, values.email, values.password)
        setIsLoading(false)
        router.push("/verify-email")
        form.reset() // Reset the form after submission 
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Akbar Rehan"
                                    autoComplete={'name'}
                                    type='text'
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="akbar@gmail.com"
                                    autoComplete={'email'}
                                    type='email'
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
                                <div className='relative'>
                                    <Input
                                        placeholder="••••••••"
                                        autoComplete={'current-password'}
                                        disabled={isLoading}
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                    />
                                    <Button
                                        variant={"ghost"}
                                        className='absolute hover:bg-transparent top-0 right-2 cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}
                                        type='button'
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex items-center justify-end'>
                    <Link
                        href="#"
                        className='text-sm font-semibold text-end'
                    >
                        Forgot your Password?
                    </Link>
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing up...
                        </>
                    ) : (
                        "Sign up"
                    )}
                </Button>
            </form>
        </Form>
    )
}



