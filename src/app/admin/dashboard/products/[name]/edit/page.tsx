import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import EditProductForm from "@/components/admin/EditProductForm"
import { getProductByName } from "@/lib/axios-api/admin/adminGetProductByName"

export const metadata: Metadata = {
  title: "Edit Product | Admin Dashboard",
  description: "Edit product details",
}

type EditProductPageProps = {
  params: Promise<{ name: string }>
}


async function getProduct(name: string) {
  const product = await getProductByName(name)
  return product;
}

export default async function EditProductPage(props: EditProductPageProps) {

  const params  = await props.params;
  const productName = decodeURIComponent(params.name);

  const product = await getProduct(productName);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6 mt-20 md:mt-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/dashboard/products">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">Update product details</p>
        </div>
      </div>
      <EditProductForm product={product} />
    </div>
  )
}
