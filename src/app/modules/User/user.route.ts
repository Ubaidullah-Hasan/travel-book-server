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
    auth(USER_ROLE.ADMIN),
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
    '/user-follow',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    validateRequest(userValidation.followingUserValidationSchema),
    userController.followingUser
)

router.patch(
    '/user-payment/:userId',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    // validateRequest(userValidation.followingUserValidationSchema),
    userController.premiumUser
)

router.get(
    '/user-follow/:userId',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    userController.getUserFollowingAndFollowers
)

router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN),
    userController.deleteUser
)

router.patch(
    '/role/:id',
    auth(USER_ROLE.ADMIN),
    userController.editUser
)

export const userRoutes = router;