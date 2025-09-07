import { LoadingSpinner } from "@/components/loading";
import { useGetMeQuery } from "@/redux/features/users/user.api";
import type { TRole } from "@/types";
import { useEffect, type ComponentType } from "react";
import { useNavigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole[]) => {
  return function AuthWrapper() {
    const navigate = useNavigate();
    const { data, isLoading } = useGetMeQuery(null);


    useEffect(() => {
      if (!data?.data.email && !isLoading) {
        navigate("/");
        return;
      }

      if (
        requiredRole &&
        !isLoading &&
        data?.data.role &&
        !requiredRole.includes(data?.data.role as TRole)
      ) {
        navigate("/unauthorized", { state: true });
        return;
      }
    }, [isLoading, data, navigate]);

    if (isLoading) {
      return <LoadingSpinner />;
    }


    return <Component />;
  };
};
