import { Router } from "express";
function userRoutes () {
    console.log("userRoutes")
}

const router = Router();
const modulesRoutes = [
    {
        path: "/users",
        route: userRoutes,
    }
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
