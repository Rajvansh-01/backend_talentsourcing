import express from 'express';
import skills from '../controller/skills.js';
const router = express.Router();

router.post("/skills/:personalInfoID", (skills.addSkill))
.put("/skills/:personalInfoID", (skills.updateSkills))
.get("/skills/:personalInfoID", (skills.getSkills))
.delete("/skills/:personalInfoID", (skills.deleteSkills))

export default router;

