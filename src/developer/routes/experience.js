import express from 'express';
import Experience from '../controller/experience.js';
const router = express.Router();

router.post("/experience/:personalInfoID", (Experience.addExperience))
.put("/experience/:personalInfoID", (Experience.updateExperience))
.get("/experience/:personalInfoID", (Experience.getExperience))
.delete("/experience/:personalInfoID", (Experience.deleteExperience))

export default router;

