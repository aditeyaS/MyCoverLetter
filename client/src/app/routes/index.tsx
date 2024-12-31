import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./not-found";
import Landing from "./landing";

import AuthLayout from "./auth/_layout";
import Login from "./auth/login";
import ForgotPassword from "./auth/forgot-password";
import Register from "./auth/register";
import AppLayout from "./app/_layout";
import Dashboard from "./app/dashboard";
import New from "./app/new";
import Profile from "./app/profile";
import View from "./app/[templateId]";
import Edit from "./app/[templateId]/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "new", element: <New /> },
      { path: ":templateId", element: <View /> },
      { path: ":templateId/edit", element: <Edit /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
