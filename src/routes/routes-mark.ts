import { Router } from "express";
import { CreateMarkController, MarksController, SearchMarksController } from "../controller/controller-mark";

const router: Router = Router();

router.post('/create', CreateMarkController)
router.get('/search', SearchMarksController)
router.get('/marks', MarksController)

export default router