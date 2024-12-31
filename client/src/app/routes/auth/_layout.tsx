import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full md:w-1/2">
        <CardHeader className="flex justify-center items-center">
          <Link
            to={"/"}
            className="flex gap-2 items-center hover:underline underline-offset-4"
          >
            <Logo className="h-8" />
            MyCoverLetter
          </Link>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}
