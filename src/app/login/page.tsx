import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Login } from "@/views/login";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("innovation_auth_token")?.value;

  if (token) {
    redirect("/produtos");
  }

  return <Login />;
}
