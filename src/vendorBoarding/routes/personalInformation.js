import express from 'express';
const router = express.Router();
import {
    addInformation,
    getInformation,
    updateInformation,
    deleteInformation,
    getVendors
} from '../controllers/personalInformation.js';

router.post('/personalInformation', addInformation)
.get('/personalInformation/:informationId', getInformation)
.put('/personalInformation/:informationId', updateInformation)
.delete('/personalInformation/:informationId', deleteInformation)
.get('/personalInformation', getVendors)


export default router;
