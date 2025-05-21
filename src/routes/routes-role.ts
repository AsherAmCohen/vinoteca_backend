import { Router } from "express";
import { CreateRoleController, PermissionsController, RolesController, UpdatePermissionsRoleController } from "../controllers/controllers-role";

const router: Router = Router();

router.get('/roles', RolesController)
router.get('/permissions', PermissionsController)
router.post('/create', CreateRoleController)
router.put('/update', UpdatePermissionsRoleController)

export default router