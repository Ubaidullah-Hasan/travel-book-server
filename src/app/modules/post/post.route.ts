import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { postController } from "./post.controller";
import { postValidation } from "./post.validation";

const router = Router();

router.post("/", 
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