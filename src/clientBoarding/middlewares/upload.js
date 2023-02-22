import multer from 'multer';
import path from 'path';
const pdfSize = 5 * 1024 * 1024; // 1MB
const imageSize = 1 * 1024 * 1024; // 1MB
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const multipleUpload = upload.fields([{ name: 'images',maxCount: 10 }]);

export default upload;
export { upload , multipleUpload };
