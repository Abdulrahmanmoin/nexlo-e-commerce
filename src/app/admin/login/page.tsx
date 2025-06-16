import LoginForm from "@/components/admin/loginForm"
import { authOptions } from "@/lib/authOptions";
import { Session } from "@/types/session";
import { getServerSession} from "next-auth"
import { redirect } from "next/navigation";

export default async function LoginPage() {

  const session: Session = await getServerSession(authOptions);

  if(session && session?.user?.role == "admin" ){
    redirect("/admin/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* <div className="absolute right-4 top-4">
        <ModeToggle />
      </div> */}
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Login - Nexlo</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access your admin dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
