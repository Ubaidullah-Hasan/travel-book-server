import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { categoryController } from "./category.controller";

const router = Router();

router.post("/", 
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