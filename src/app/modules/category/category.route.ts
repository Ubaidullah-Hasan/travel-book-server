import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post("/",
    auth(USER_ROLE.ADMIN),
    validateRequest(categoryValidation.createCategoryValidationSchema),
    categoryController.createCategory
)
router.get("/",
    categoryController.getAllCategory
)
router.get("/:id",
    categoryController.getSingleCategory
)

export const categoryRoutes = router;