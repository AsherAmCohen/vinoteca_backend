import { Router } from "express";
import { MarksController } from "../controller/controller-mark";

const router: Router = Router();

router.get('/marks', MarksController)

export default router