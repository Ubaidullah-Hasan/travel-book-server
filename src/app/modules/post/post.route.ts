import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { postController } from "./post.controller";
import { postValidation } from "./post.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post("/", 
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    validateRequest(postValidation.createPostValidationSchema),
    postController.createPost
)
router.get("/", 
    postController.getAllPost
)
router.get("/:id", 
    postController.getSinglePost
)

export const postRoutes = router;