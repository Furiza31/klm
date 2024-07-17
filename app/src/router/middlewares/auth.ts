import { useAuth } from "@/services/Auth";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.meta.noAuth) {
    next();
    return;
  }
  const isAuthenticated = await useAuth().isAuthenticated();
  if (!isAuthenticated) {
    next({ name: "Login" });
    return;
  }
  next();
};
