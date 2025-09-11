import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
