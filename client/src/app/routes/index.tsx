import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import NotFound from "./not-found";
import AuthLayout from "./auth/_layout";
import AppLayout from "./app/_layout";

const Landing = lazy(() => import("./landing"));

const Login = lazy(() => import("./auth/login"));
const Register = lazy(() => import("./auth/register"));
const ForgotPassword = lazy(() => import("./auth/forgot-password"));

const Dashboard = lazy(() => import("./app/dashboard"));
const New = lazy(() => import("./app/new"));
const View = lazy(() => import("./app/[templateId]"));
const Edit = lazy(() => import("./app/[templateId]/edit"));

const Profile = lazy(() => import("./app/profile"));

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
