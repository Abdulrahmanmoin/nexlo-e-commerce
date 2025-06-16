"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Package, ShoppingCart, Users, Settings, LogOut, Menu, X, Home, PlusCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signOut } from "next-auth/react"

const routes = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/admin/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Products",
    icon: Package,
    href: "/admin/dashboard/products",
    color: "text-violet-500",
  },
  {
    label: "Add Product",
    icon: PlusCircle,
    href: "/admin/dashboard/product/new",
    color: "text-pink-700",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
    color: "text-orange-500",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/admin/customers",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [clickedRoute, setClickedRoute] = useState<string | null>(null)

  const [isLogoutLoading, setIsLogoutLoading] = useState(false)


  const setLoader = (href: string) => {
    setClickedRoute(href)
    setTimeout(() => {
      setClickedRoute(null)
    }, 2000)
  }

  const handleLogout = async () => {
    setIsLogoutLoading(true)
    signOut()
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex w-full items-center border-b bg-background p-4 md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-center">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            Nexlo Admin
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Link href="/admin/dashboard" className="text-xl font-bold" onClick={() => setIsOpen(false)}>
                Nexlo Admin
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Home className="h-5 w-5" />
                Back to Store
              </Link>
              <Button
                variant="ghost"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={handleLogout}
              >
                {isLogoutLoading ?
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>  Logging out... </span>
                  </>
                  :
                  <>
                    <LogOut className="h-5 w-5" />
                    <span>  Logout  </ span> 
                  </>
                }
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden w-64 flex-shrink-0 border-r bg-background md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold">
              <Package className="h-6 w-6" />
              <span>Nexlo Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setLoader(route.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  {route.label}
                  {clickedRoute === route.href && <Loader2 className="h-4 w-4 animate-spin" />}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10">
                  <span className="flex h-full w-full items-center justify-center text-sm font-medium text-primary">
                    A
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  {/* <p className="text-xs text-muted-foreground">admin@nexlo.com</p> */}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-1">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Home className="h-5 w-5" />
                Back to Store
              </Link>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={handleLogout}
              >
                {isLogoutLoading ?
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>  Logging out... </span>
                  </>
                  :
                  <>
                    <LogOut className="h-5 w-5" />
                    <span>  Logout  </ span> 
                  </>
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
