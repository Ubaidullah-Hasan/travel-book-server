import { Router } from "express";
import { userRoutes } from "../modules/User/user.route";

const router = Router();
const modulesRoutes = [
    {
        path: "/users",
        route: userRoutes,
    }
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
