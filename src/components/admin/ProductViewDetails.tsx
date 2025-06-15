import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Badge } from "../ui/badge"
import { ProductInterface } from "@/types/product"

interface ProductViewDetailsProps {
  product: ProductInterface
}

export default function ProductViewDetails({ product }: ProductViewDetailsProps) {
  const getAudienceBadgeColor = (audience: string) => {
    switch (audience) {
      case "men":
        return "bg-blue-100 text-blue-800"
      case "women":
        return "bg-pink-100 text-pink-800"
      case "kids":
        return "bg-green-100 text-green-800"
      case "unisex":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (stock <= 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    return { label: "In Stock", color: "bg-green-100 text-green-800" }
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <div className="grid gap-6 ">
      {/* Product Images */}
      <div >
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {product.images.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2">
                    <Badge className="text-xs rounded-xl bg-accent-foreground">
                      Image {index + 1}
                    </Badge>
                  </div>

                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Product Information</span>
              <Badge className={stockStatus.color}>{stockStatus.label}</Badge>

            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-lg text-muted-foreground capitalize">{product.brand}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            </div>

            <Separator />

              <div>
                <p className="font-medium text-muted-foreground">Stock Quantity</p>
                <p className="text-lg font-semibold">{product.stock} units</p>
              </div>
          </CardContent>
        </Card>

        {/* Categories and Style */}
        <Card>
          <CardHeader>
            <CardTitle>Shoe Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getAudienceBadgeColor(product.category)} capitalize`} >
                {product.category}
              </Badge>
              <Badge variant="outline" className="capitalize">{product.style}</Badge>

            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-2">Category</p>
              <p className="capitalize">{product.category}</p>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-2">Style</p>
              <p className="capitalize">{product.style}</p>
            </div>
          </CardContent>
        </Card>

        {/* Available Sizes */}
        {
          stockStatus.label !== "Out of Stock" && (
            <Card>
              <CardHeader>
                <CardTitle>Available Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="outline" className="px-3 py-1">
                      {size}
                    </Badge>
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{product.sizes.length} sizes available</p>
              </CardContent>
            </Card>
          )
        }

      </div>

      {/* Product Description */}
      <div >
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
