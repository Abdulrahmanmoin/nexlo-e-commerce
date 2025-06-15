import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getAuthSession = () => getServerSession();

export const requireAuth = async () => {
  const session = await getAuthSession();
  
  if (!session) {
    redirect("/login");
  }

  return session;
};
