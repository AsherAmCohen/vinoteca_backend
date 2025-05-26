import multer from "multer"
import path from "path"
import fs from 'fs'

export const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads');
        if(!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath)
        }
        cb(null, uploadPath)
    },
    filename: (request, file, cb) => {
        cb(null, file.originalname)
    }
})