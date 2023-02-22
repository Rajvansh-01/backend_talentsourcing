import express from 'express';

import upload from '../middlewares/upload.js';
import {
    addCompanyInformation,
    updatedCompanyInformation
} from '../controllers/companyInformation.js';


const router = express.Router();

router.post('/company-information/:personalInformationId',upload.single('file'),addCompanyInformation)
.put('/company-information/:personalInformationId',upload.single('file'),updatedCompanyInformation);


export default router;