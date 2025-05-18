import { Router } from "express";
import { SignInController, SignUpController, UserInformationController } from "../controllers/controllers-user";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)
router.get('/Information', UserInformationController)

export default router