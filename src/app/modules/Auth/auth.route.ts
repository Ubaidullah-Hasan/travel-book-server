import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post(
    '/register',
    validateRequest(AuthValidation.registerValidationSchema),
    AuthControllers.registerUser
);
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.userlogin
);

router.post(
    '/change-password',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
);

router.post(
    '/forgot-password',
    validateRequest(AuthValidation.forgotPasswordValidationSchema),
    AuthControllers.forgotPassword
);

export const AuthRoutes = router;