import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useUser from "@/store/user";
import { Link, Outlet } from "react-router";

export default function AppLayout() {
  const { user } = useUser();
  return (
    <div>
      <header className="p-1 flex justify-between items-center pr-5 border-b">
        <Link to="/app">
          <Button variant={"ghost"}>
            <img src="logo.svg" className="w-5 h-5" />
            MyCoverLetter
          </Button>
        </Link>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link to={"/app/profile"}>
            <Button
              variant={"secondary"}
              className="rounded-full"
              size={"icon"}
            >
              {user?.name.charAt(0).toUpperCase()}
            </Button>
          </Link>
        </div>
      </header>
      <div className="px-10 py-4">
        <Outlet />
      </div>
    </div>
  );
}
