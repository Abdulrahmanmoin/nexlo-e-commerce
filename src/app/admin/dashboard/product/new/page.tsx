"use client"

import Backward from "@/components/app/Backward"
import ProductForm from "@/components/admin/productForm"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useLoadingPage } from "@/context/LoadingPageContext"

export default function NewProductPage() {

  const { isPageLoading } = useLoadingPage()  

  return (
    <>
      <div className="space-y-6 mt-20 md:mt-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="cursor-pointer">
              <Backward />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        </div>
        <ProductForm />
      </div>

      {isPageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <Loader2 className="h-20 w-20 animate-spin text-black" />
        </div>
      )}
    </>
  )
}
