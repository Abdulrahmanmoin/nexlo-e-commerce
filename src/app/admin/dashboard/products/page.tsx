"use client"

import AddProductLink from "@/components/admin/AddProductLink"
import ProductTemplate from "@/components/admin/ProductCardTemplate"
import { useLoadingPage } from "@/context/LoadingPageContext"
import { getAllProducts } from "@/lib/axios-api/admin/adminGetAllProducts"
import { ProductInterface } from "@/types/product"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function ProductsAdminPage() {

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState(false)

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await getAllProducts();

                if (response.status !== 200) {
                    setIsError(true);
                    setLoading(false);
                    return;
                }

                setProducts(response.data.data);
            } catch (error) {
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const { isPageLoading } = useLoadingPage();

    if (isError) {
        return (
            <div className="flex justify-center items-center text-red-500 text-2xl h-[80vh] w-[70vw]">
                <p>Please try again later.</p>
            </div>
        )
    }


    return (
        <>
            <div className="mx-1 space-y-5 mt-20 md:mt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-4xl font-bold tracking-tight">Products</h3>
                        <p className="text-gray-600">Manage your product inventory</p>
                    </div>
                    <AddProductLink />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8">
                    {!loading ?
                        products.map((product) => (
                            <ProductTemplate
                                key={product.name}
                                name={product.name}
                                brand={product.brand}
                                sizes={product.sizes}
                                price={product.price}
                                stock={product.stock}
                                images={product.images}
                                category={product.category}
                                style={product.style}
                            />
                        )) :

                        <div className="flex justify-center items-center text-gray-500 h-[80vh] w-[70vw]">
                            <Loader2 className="animate-spin" />
                            <p>Loading products...</p>
                        </div>
                    }
                </div>
            </div>


            {isPageLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="h-20 w-20 animate-spin text-black" />
                </div>
            )}

            {
                !loading && products.length === 0 &&
                <div className="flex justify-center items-center text-gray-500 h-[80vh] w-[70vw]">
                    <p>No products found. Please add some products.</p>
                </div>
            }
        </>
    );
}