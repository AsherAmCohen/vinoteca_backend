import { Router } from "express";
import { SignInController, SignUpController, UserInformationController, UsersRegisterController } from "../controllers/controllers-user";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)
router.get('/Information', UserInformationController)
router.get('/users', UsersRegisterController)

export default router