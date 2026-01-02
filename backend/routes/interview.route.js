import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { deleteInterview, getAllApplications, getApprovedApplications, getAllInterviews, reScheduleInterview, scheduleInterview } from "../controllers/interview.controller.js";

const router = Router();

router.route('/interview/applications/approved').get(verifyJWT,getApprovedApplications);
router.route('/interview/applications').get(verifyJWT,getAllApplications);
router.route('/interview/schedule').post(verifyJWT,scheduleInterview);
router.route('/interview/delete/:id').delete(verifyJWT,deleteInterview);
router.route('/interview/reschedule').patch(verifyJWT,reScheduleInterview);
router.route('/interview/get').get(verifyJWT,getAllInterviews);

export default router;