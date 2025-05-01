import { Router } from "express";
import { CategorysController, CreateCategoryController, searchCategorysController } from "../controller/controller-category";

const router: Router = Router();

router.post('/create', CreateCategoryController)
router.post('/search', searchCategorysController)
router.get('/categorys', CategorysController)

export default router