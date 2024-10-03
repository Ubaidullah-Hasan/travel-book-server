import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
    '/register',
    validateRequest(AuthValidation.registerValidationSchema),
    AuthControllers.registerUser
);

export const AuthRoutes = router;