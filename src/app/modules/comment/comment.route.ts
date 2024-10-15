import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

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

router.delete("/:commentId",
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    commentController.deleteCommentById,
)

router.patch("/:commentId",
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(commentValidation.updateCommentValidationSchema),
    commentController.editCommentByCommentOwner,
)

export const commentRoutes = router;