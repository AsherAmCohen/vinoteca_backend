import { Router } from "express";
import { CategorysAllController, CategorysController, CreateCategoryController, UpdateCategoryController } from "../controllers/controllers-category";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.post('/create', authorize(['ADD_CATEGORY']), CreateCategoryController)
router.get('/all', authorize(['ADD_WINE', 'EDIT_WINE']), CategorysAllController)
router.get('/categorys', authorize(['VIEW_CATEGORY']), CategorysController)
router.put('/update', authorize(['EDIT_CATEGORY']), UpdateCategoryController)

export default router