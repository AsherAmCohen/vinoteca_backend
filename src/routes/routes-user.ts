import { Router } from "express";
import { CreateController } from "../controller/controller-user";

const router: Router = Router();

router.post('/create', CreateController)

export default router