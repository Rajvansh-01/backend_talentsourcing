import express from 'express';
import personalInfoController from '../controller/personalInfo.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post("/personalInfo", upload, (personalInfoController.addPersonalInfo))
.put("/personalInfo/:personalInfoID", upload, (personalInfoController.updatePersonalInfo))
.get("/personalInfo/:personalInfoID", (personalInfoController.getPersonalInfo))
.get("/personalInfo", (personalInfoController.getAllUsers))
.delete("/personalInfo/:personalInfoID", upload, (personalInfoController.deletePersonalInfo))

export default router;

 
