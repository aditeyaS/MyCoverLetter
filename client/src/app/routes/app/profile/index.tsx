import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useUser from "@/store/user";
import { LogOut } from "lucide-react";
import { useState } from "react";
import LogoutAlertDialog from "./logout-alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export default function Profile() {
  const { user, logoutUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      logoutUser();
      toast({ description: "Logout successful!" });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", description: error.message });
    },
  });

  return (
    user && (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Avatar>
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <Button variant={"destructive"}>Delete Account</Button>
            <Button variant={"secondary"} onClick={() => setOpen(true)}>
              <LogOut /> Logout
            </Button>
          </div>
        </div>
        <LogoutAlertDialog
          open={open}
          setOpen={setOpen}
          onLogout={() => mutate()}
        />
      </>
    )
  );
}
