import express from 'express';
const router = express.Router();

import { multipleUpload } from '../middlewares/upload.js';
import  {addImage,updatedImage,deleteImage}  from '../controllers/gallery.js';

router.post('/gallery/:personalInformationId',multipleUpload,addImage)
.put('/gallery/:personalInformationId',multipleUpload,updatedImage)
.delete('/gallery/:personalInformationId',multipleUpload,deleteImage);

export default router;