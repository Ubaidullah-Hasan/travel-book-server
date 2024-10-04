import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = Router();

router.post("/", 
    validateRequest(commentValidation.createCommentValidationSchema),
    commentController.createComment
)
router.get("/", 
    commentController.getAllComment
)
router.get("/post/:postId", 
    commentController.getAllCommentOfPost
)

router.get("/:id", 
    commentController.getSingleComment
)

export const commentRoutes = router;