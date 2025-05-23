import { Router } from "express";
import { StoreWineController, WineImageController, WinesController } from "../controllers/controllers-wine";
import { storage } from "../storage/storage";
import multer from "multer";
import { authenticateToken } from "../middlewares/auth-middleware";

const router: Router = Router();

// Configuración para cargar archivos
const uploads = multer({ storage })

router.post('/storeWine', authenticateToken, uploads.single('image'), StoreWineController)
router.get('/wines', WinesController)
router.get('/image', WineImageController)

export default router