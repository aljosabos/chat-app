import { createBrowserRouter } from "react-router-dom";
import { Home } from "@pages/Home/Home";
import { Register } from "@pages/Register/Register";
import { Login } from "@pages/Login/Login";
import { VerifyEmail } from "@pages/VerifyEmail/VerifyEmail";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  },

  {
    path: "*",
    element: <div>NOT FOUND FRONTEND ROUTE</div>,
  },
]);
