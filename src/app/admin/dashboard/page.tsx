import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Package, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/lib/axios-api/admin/adminGetAllProducts"
import AddProductLink from "@/components/admin/AddProductLink"
import DashboardLinks from "@/components/admin/DashboardLinks"

export default async function AdminDashboard() {


  // const [isLoading, setIsLoading] = useState(false)

  const getNumberOfAllProducts = async () => {
    const response = await getAllProducts()
    return response.data.data.length;
  }

  return (
    <div className="space-y-6  mt-20 md:mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <AddProductLink />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getNumberOfAllProducts()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DashboardLinks
            mainText="Add New Product"
            subText="Create a new product in your inventory"
            href="/admin/dashboard/product/new"
          />
          <DashboardLinks
            mainText="Manage Products"
            subText="View and edit your existing products"
            href="/admin/dashboard/products"
          />
          <DashboardLinks
            mainText="View Orders"
            subText="Check recent orders and their status"
            href="/admin/dashboard/orders"
          />
        </div>
      </div>
    </div>
  )
}
