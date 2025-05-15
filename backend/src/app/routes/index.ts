import { Router } from "express";
import { CategoryRoutes } from "../modules/products/categoryRoute";

const router = Router();
const modulesRoute = [
  {
    path: "/category",
    route: CategoryRoutes,
  },
];
modulesRoute.filter(mR => router.use(mR.path, mR.route));
export default router;
