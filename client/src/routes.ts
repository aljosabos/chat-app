import { createBrowserRouter } from "react-router";
import { Home } from "@pages/Home/Home";
import { Register } from "@pages/Register/Register";
import { Login } from "@pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
]);
