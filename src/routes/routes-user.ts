import { Router } from "express";
import { SignInController, SignUpController } from "../controller/controller-user";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)

export default router