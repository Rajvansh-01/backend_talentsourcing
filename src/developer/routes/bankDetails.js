import express from 'express';
import bankDetail from '../controller/bankDetails.js';
const router = express.Router();

router.post("/bankDetails/:personalInfoID", (bankDetail.addBankDetail))
.put("/bankDetails/:personalInfoID", bankDetail.updateBankDetail)
.get("/bankDetails/:personalInfoID", bankDetail.getBankDetail)
.delete("/bankDetails/:personalInfoID", bankDetail.deleteBankDetail)

export default router;

