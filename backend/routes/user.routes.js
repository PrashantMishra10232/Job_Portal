import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    registerUser,
    loginUser,
    logOut,
    refreshAccessToken,
    updateProfile,
    updateProfilePhoto
} from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(
    upload.single("profilePhoto"),registerUser
)
router.route("/login").post(loginUser)
router.route("/logOut").post(verifyJWT,logOut)
router.route("/refresh_token").post(refreshAccessToken)
router.route("/update_Account").patch(verifyJWT,updateProfile)
router.route("/profilePhoto").patch(verifyJWT,upload.single("profilePhoto"),updateProfilePhoto)

export default router;