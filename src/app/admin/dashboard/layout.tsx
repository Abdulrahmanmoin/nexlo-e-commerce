import type React from "react"
import type { Metadata } from "next"
import AdminSidebar from "@/components/admin/sideBar"
import { Toaster } from "@/components/ui/sonner"
import { Session } from "@/types/session"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { redirect } from 'next/navigation'
import LoadingPageProviderWrapper from "@/components/LoadingPageProviderWrapper"

export const metadata: Metadata = {
  title: "Admin Dashboard | Nexlo",
  description: "Admin dashboard for Nexlo e-commerce platform",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session: Session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <LoadingPageProviderWrapper>
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </div>
      </div>
      <Toaster />
    </LoadingPageProviderWrapper>
  );
}
