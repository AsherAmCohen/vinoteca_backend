import { Router } from "express";
import { CreateMarkController, MarksAllController, MarksController } from "../controllers/controllers-mark";

const router: Router = Router();

router.post('/create', CreateMarkController)
router.get('/all', MarksAllController)
router.get('/marks', MarksController)

export default router