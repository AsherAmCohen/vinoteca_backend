import { Router } from "express";
import { DeleteUserController, SignInController, SignUpController, UpdateRoleController, UserInformationController, UsersRegisterController, VerifiedUserController } from "../controllers/controllers-user";
import { authenticateToken } from "../middlewares/auth-middleware";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)
router.get('/Information', authenticateToken, UserInformationController)
router.get('/users', authenticateToken, UsersRegisterController)
router.put('/update/role', authenticateToken, authorize(['EDIT_USER']), UpdateRoleController)
router.delete('/delete', authenticateToken, authorize(['DELETE_USER']), DeleteUserController)
router.put('/verify', VerifiedUserController)

export default router