import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full md:w-1/2">
        <CardHeader>MyCoverLetter</CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}
