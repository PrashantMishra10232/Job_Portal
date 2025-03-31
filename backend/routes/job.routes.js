import express from "express"
import {getAdminsJobs,getAllJobs,getJobById,postJob,deleteJobs} from "../controllers/job.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.route("/post").post(verifyJWT, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(verifyJWT, getAdminsJobs);
router.route("/get/:id").get(verifyJWT, getJobById);
router.route("/delete/:id").delete(verifyJWT, deleteJobs);

export default router;
