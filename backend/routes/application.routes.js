import express from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {applyJob,getApplications,getAppliedJobs,updateStatus} from "../controllers/application.controller.js"

const router = express.Router();

router.route("/apply/:id").get(verifyJWT, applyJob);
router.route("/get").get(verifyJWT, getAppliedJobs);
router.route("/:id/applicants").get(verifyJWT, getApplications);
router.route("/status/:id/update").post(verifyJWT, updateStatus);
 

export default router;
