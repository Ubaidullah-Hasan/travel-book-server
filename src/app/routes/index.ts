import { Router } from "express";
import { userRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { categoryRoutes } from "../modules/category/category.route";
import { commentRoutes } from "../modules/comment/comment.route";
import { postRoutes } from "../modules/post/post.route";

const router = Router();
const modulesRoutes = [
    {
        path: "/users",
        route: userRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/categories",
        route: categoryRoutes,
    },
    {
        path: "/comments",
        route: commentRoutes,
    },
    {
        path: "/posts",
        route: postRoutes,
    },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
