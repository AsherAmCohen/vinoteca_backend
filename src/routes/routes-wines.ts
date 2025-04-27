import { Router } from "express";
import { StoreWineController, WineImageController, WinesController } from "../controller/controller-wine";
import { storage } from "../storage/storage";
import multer from "multer";

const router: Router = Router();

// Configuración para cargar archivos
const uploads = multer({ storage })

router.post('/storeWine', uploads.single('image'), StoreWineController)
router.get('/wines', WinesController)
router.get('/image', WineImageController)

export default router