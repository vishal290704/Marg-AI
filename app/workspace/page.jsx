import { checkUser } from "@/lib/checkUser";

export default async function DashboardPage() {
  console.log("Dashboard page loaded");

  const user = await checkUser();

  console.log("Returned user:", user);

  return <div>Dashboard</div>;
}