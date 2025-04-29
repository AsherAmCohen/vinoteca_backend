import { Router } from "express";
import { CategorysController, CreateCategoryController } from "../controller/controller-category";

const router: Router = Router();

router.post('/create', CreateCategoryController)
router.get('/categorys', CategorysController)

export default router