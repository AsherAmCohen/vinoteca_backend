import { Router } from "express";
import { SignUpController } from "../controller/controller-user";

const router: Router = Router();

router.post('/SignUp', SignUpController)

export default router