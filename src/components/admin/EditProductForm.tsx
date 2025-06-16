"use client"

import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { Combobox } from "@/components/ui/combobox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { productSchema } from "@/zodSchemas/productSchema"
import { ProductInterface } from "@/types/product"
import { authenticator } from "../file-upload/getFileUploadCredentials"
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { UploadResponse } from "imagekit/dist/libs/interfaces"
import { editProduct } from "@/lib/axios-api/admin/adminEditProduct"

// Shoe types for the dropdown
const styles = [
    { label: "Running", value: "running" },
    { label: "Casual", value: "casual" },
    { label: "Basketball", value: "basketball" },
    { label: "Training", value: "training" },
    { label: "Lifestyle", value: "lifestyle" },
    { label: "Skateboarding", value: "skateboarding" },
    { label: "Tennis", value: "tennis" },
    { label: "Soccer", value: "soccer" },
]

// Target audience options
const categorys = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Unisex", value: "unisex" },
    { label: "Kids", value: "kids" },
]

// Size ranges by audience
const sizeRanges = {
    men: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
    women: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    unisex: [
        "M 7 / W 8.5",
        "M 7.5 / W 9",
        "M 8 / W 9.5",
        "M 8.5 / W 10",
        "M 9 / W 10.5",
        "M 9.5 / W 11",
        "M 10 / W 11.5",
        "M 10.5 / W 12",
        "M 11 / W 12.5",
        "M 11.5 / W 13",
        "M 12 / W 13.5",
        "M 13 / W 14.5",
    ],
    kids: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5"],
}

// Brands for the dropdown
const brands = [
    { label: "Nike", value: "nike" },
    { label: "Adidas", value: "adidas" },
    { label: "Puma", value: "puma" },
    { label: "New Balance", value: "new-balance" },
    { label: "Reebok", value: "reebok" },
    { label: "Converse", value: "converse" },
    { label: "Vans", value: "vans" },
    { label: "Under Armour", value: "under-armour" },
]

// Infer the type from the schema
type ProductFormValues = z.infer<typeof productSchema>

interface EditProductFormProps {
    product: ProductInterface
}

export default function EditProductForm({ product }: EditProductFormProps) {

    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>(product.images)
    const [uploadProgress, setUploadProgress] = useState(0)

    // Initialize the form with existing product data
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product.name,
            brand: product.brand,
            sizes: product.sizes,
            price: product.price,
            stock: product.stock,
            description: product.description,
            style: product.style,
            category: product.category,
        },
    })

    // Get the current target audience value to determine size options
    const category = form.watch("category")
    const [availableSizes, setAvailableSizes] = useState<string[]>(
        sizeRanges[product.category as keyof typeof sizeRanges] || sizeRanges.unisex,
    )

    // Update available sizes when target audience changes
    useEffect(() => {
        if (category && sizeRanges[category as keyof typeof sizeRanges]) {
            setAvailableSizes(sizeRanges[category as keyof typeof sizeRanges])
            // Only reset sizes if the audience actually changed from the original
            if (category !== product.category) {
                form.setValue("sizes", [])
            }
        }
    }, [category, form, product.category])

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)

            // Check if adding these files would exceed the 3 image limit
            if (imageUrls.length + selectedFiles.length > 3) {
                toast.error("Error", {
                    description: "You can only have exactly 3 images",
                })
                return
            }

            // Create preview URLs for the new images
            const newImageUrls = selectedFiles.map((file) => URL.createObjectURL(file))

            setImages((prev) => [...prev, ...selectedFiles])
            setImageUrls((prev) => [...prev, ...newImageUrls])
        }
    }

    // Remove an image
    const removeImage = (index: number) => {
        const newImages = [...images]
        const newImageUrls = [...imageUrls]

        // If it's a new image (File object), revoke the object URL
        if (index >= product.images.length) {
            const fileIndex = index - product.images.length
            URL.revokeObjectURL(newImageUrls[index])
            newImages.splice(fileIndex, 1)
        }

        newImageUrls.splice(index, 1)
        setImages(newImages)
        setImageUrls(newImageUrls)
    }

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    const handleUpload = async (files: File[]) => {
        if (!files || files.length === 0) {
            alert("Please select files to upload");
            return;
        }

        try {
            const uploadPromises = files.map(async (file, index) => {

                const { signature, expire, token, publicKey } = await authenticator();

                return new Promise(async (resolve, reject) => {
                    try {
                        const uploadResponse = await upload({
                            expire,
                            token,
                            signature,
                            publicKey,
                            file,
                            fileName: `product-image-${index + 1}-${Date.now()}`,
                            folder: "/e-commerce-full-stack-project-nexlo",

                            onProgress: (event) => {
                                // Calculate overall progress across all files
                                const thisFileProgress = (event.loaded / event.total) * 100;
                                const overallProgress = (index * 100 + thisFileProgress) / files.length;
                                setUploadProgress(Math.round(overallProgress));
                            },
                            abortSignal: abortController.signal,
                        });
                        resolve(uploadResponse);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            // Wait for all uploads to complete
            const responses = await Promise.all(uploadPromises) as UploadResponse[];
            return responses; // Return all upload responses

        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
            throw error;
        }
    };

    // Modify onSubmit to handle both existing and new images
    async function onSubmit(data: ProductFormValues) {
        if (imageUrls.length !== 3) {
            toast.error("Error", {
                description: "You must have exactly 3 images",
            });
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        try {
            // Create File objects from existing image URLs
            const existingImagesPromises = product.images.map(async (url) => {
                if (imageUrls.includes(url)) {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new File([blob], `reupload-${Date.now()}.jpg`, { type: 'image/jpeg' });
                }
                return null;
            });

            const existingImageFiles = (await Promise.all(existingImagesPromises))
                .filter((file): file is File => file !== null);

            // Combine existing images with new images
            const allImages = [...existingImageFiles, ...images];

            // Upload all images (both existing and new)
            const uploadResponses = await handleUpload(allImages);

            if (!uploadResponses) {
                throw new Error('Failed to upload images');
            }

            // Get URLs and FileIDs from the upload responses
            const finalImageUrls = uploadResponses.map(response => response.url);
            const finalImageFileIds = uploadResponses.map(response => response.fileId);

            // Add image URLs and file IDs to the form data
            const updatedData = {
                ...data,
                images: finalImageUrls,
                imageFileIds: finalImageFileIds,
            };

            // Call API to update product
            await editProduct({ productName: product.name, updatedData });

            toast.success("Success", {
                description: "Product has been updated successfully",
                richColors: true
            });

            // Reset form and redirect
            router.push("/admin/dashboard/products");
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error", {
                description: "Failed to update product. Please try again.",
                richColors: true
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Air Max 270" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Combobox
                                                options={brands}
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="0" step="0.01" placeholder="99.99" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="0" step="1" placeholder="100" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="style"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shoe Type</FormLabel>
                                        <FormControl>
                                            <Combobox
                                                options={styles}
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Target Audience</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                {categorys.map((audience) => (
                                                    <div key={audience.value} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={audience.value} id={audience.value} />
                                                        <Label htmlFor={audience.value}>{audience.label}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Available Sizes</FormLabel>
                                    <div className="flex flex-wrap gap-2">
                                        {availableSizes.map((size) => (
                                            <Button
                                                type="button"
                                                key={size}
                                                variant={field.value.includes(size) ? "default" : "outline"}
                                                className="h-8 min-w-12 px-2"
                                                onClick={() => {
                                                    const updatedSizes = field.value.includes(size)
                                                        ? field.value.filter((s) => s !== size)
                                                        : [...field.value, size]
                                                    field.onChange(updatedSizes)
                                                }}
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter product description..." className="min-h-32 resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col space-y-2">
                                <h3 className="font-medium">Product Images</h3>
                                <p className="text-sm text-muted-foreground">You must have exactly 3 images</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {/* Image preview cards */}
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="relative rounded-lg border bg-background">
                                        <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                            <Image
                                                src={url || "/placeholder.svg"}
                                                alt={`Product image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <p className="text-xs text-muted-foreground">Image {index + 1}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full cursor-pointer"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-3 w-3 " />
                                        </Button>
                                    </div>
                                ))}

                                {/* Image upload placeholder */}
                                {imageUrls.length < 3 && (
                                    <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed bg-muted/50">
                                        <label
                                            htmlFor="image-upload"
                                            className="flex cursor-pointer flex-col items-center justify-center p-4 text-center"
                                        >
                                            <Plus className="mb-2 h-8 w-8 text-muted-foreground" />
                                            <span className="text-sm font-medium">Add Image</span>
                                            <span className="mt-1 text-xs text-muted-foreground">{3 - imageUrls.length} more required</span>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                disabled={isSubmitting}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            {imageUrls.length !== 3 && (
                                <p className="mt-2 text-sm text-destructive">You must have exactly 3 images</p>
                            )}
                        </div>

                        {isSubmitting && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Updating...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" disabled={isSubmitting} asChild className="cursor-pointer">
                                <Link href="/admin/dashboard/products">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitting || imageUrls.length !== 3} className="cursor-pointer">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating Product...
                                    </>
                                ) : (
                                    "Update Product"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
