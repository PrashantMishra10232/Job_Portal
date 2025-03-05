import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import {getCompany,getCompanyById,registerCompany,updateCompany} from "../controllers/company.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/register").post(verifyJWT,registerCompany);
router.route("/get").get(verifyJWT,getCompany);
router.route("/get/:id").get(verifyJWT,getCompanyById);
router.route("/update/:id").put(verifyJWT,upload.single("logo"), updateCompany);

export default router;
