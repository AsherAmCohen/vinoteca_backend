import { Router } from "express";
import { CreateMarkController, MarksAllController, MarksController, UpdateMarkController } from "../controllers/controllers-mark";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.post('/create', authorize(['ADD_MARK']), CreateMarkController)
router.get('/all', authorize(['ADD_WINE', "EDIT_WINE"]), MarksAllController)
router.get('/marks', authorize(['VIEW_MARK']), MarksController)
router.put('/update', authorize(['EDIT_MARK']), UpdateMarkController)

export default router