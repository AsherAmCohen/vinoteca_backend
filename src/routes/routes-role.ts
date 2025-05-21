import { Router } from "express";
import { CreateRoleController, PermissionsController, RolesController, UpdatePermissionsRoleController } from "../controllers/controllers-role";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.get('/roles', authorize(['VIEW_ROLE']), RolesController)
router.get('/permissions', authorize(['VIEW_ROLE']), PermissionsController)
router.post('/create', authorize(['ADD_ROLE']), CreateRoleController)
router.put('/update', authorize(['EDIT_ROLE']), UpdatePermissionsRoleController)

export default router