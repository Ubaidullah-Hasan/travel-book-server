import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

router.post(
    '/create-user',
    validateRequest(userValidation.createUserValidationSchema),
    userController.createUser
)
router.get(
    '/',
    userController.getAllUsers
)

router.get(
    '/:id',
    userController.getSingleUser
)

router.patch(
    '/update-user/:email',
    validateRequest(userValidation.updateUserValidationSchema),
    userController.updateUser
)

router.patch(
    '/following',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    validateRequest(userValidation.followingUserValidationSchema),
    userController.followingUser
)

export const userRoutes = router;