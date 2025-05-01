import { Router } from "express";
import { CategorysAllController, CategorysController, CreateCategoryController } from "../controller/controller-category";

const router: Router = Router();

router.post('/create', CreateCategoryController)
router.get('/all', CategorysAllController)
router.get('/categorys', CategorysController)

export default router