import { authMiddleware } from "@/router/middlewares/auth";
import { titleMiddleware } from "@/router/middlewares/title";
import { routes } from "@/router/routes";
import { createRouter, createWebHistory, Router } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authMiddleware);
router.afterEach(titleMiddleware);

export default router;
