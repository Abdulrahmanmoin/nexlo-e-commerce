"use client"

import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Edit, Loader2, Package } from "lucide-react"
import { notFound, useParams } from "next/navigation"
import ProductViewDetails from "@/components/admin/ProductViewDetails"
import { getProductByName } from "@/lib/axios-api/admin/adminGetProductByName"
import { useLoadingPage } from "@/context/LoadingPageContext"
import { useEffect, useState, use } from "react"
import { ProductInterface } from "@/types/product"

// export const metadata: Metadata = {
//   title: "Product Details | Admin Dashboard",
//   description: "View product details",
// }

async function getProduct(name: string) {
  const product = await getProductByName(name)
  return product;
}

export default function ProductViewPage() {

  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { setIsPageLoading } = useLoadingPage()

  useEffect(() => {
    setIsPageLoading(false);
  }, [])

  const params = useParams<{ name: string }>();
  const productName = decodeURIComponent(params.name);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const product = await getProduct(productName);
        setProduct(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null); // Set to null if fetch fails
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productName]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-gray-500 h-[80vh] w-[70vw]">
        <Loader2 className="animate-spin" />
        <p>Loading products...</p>
      </div>
    )
  }


  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6 mt-20 md:mt-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/dashboard/products">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
            <p className="text-muted-foreground">View complete product information</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col lg:flex-row">
          <Button variant="outline" asChild>
            <Link href={`/admin/dashboard/products/${product.name}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/dashboard/products">
              <Package className="mr-2 h-4 w-4" />
              All Products
            </Link>
          </Button>
        </div>
      </div>

      <ProductViewDetails product={product} />
    </div>
  )
}
