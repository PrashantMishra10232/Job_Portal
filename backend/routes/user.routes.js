import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    registerUser,
    loginUser,
    logOut,
    refreshAccessToken,
    updateProfile,
    updateProfilePhoto,
    handleLoginSuccess
} from "../controllers/user.controller.js"
import passport from "passport";

const router = Router();

router.route("/register").post(
    upload.single("profilePhoto"),registerUser
)
router.route("/login").post(loginUser)
router.route("/logOut").post(verifyJWT,logOut)
router.route("/refresh_token").post(refreshAccessToken)
router.route("/update_Account").patch(verifyJWT,upload.single("resume"),updateProfile)
router.route("/profilePhoto").patch(verifyJWT,upload.single("profilePhoto"),updateProfilePhoto)
// router.route("/auth/google").get(passport.authenticate("google",{scope: ["profile","email"]}))
router.get("/auth/google", (req, res, next) => {
    const { role } = req.query;
    const state = Buffer.from(JSON.stringify({ role })).toString("base64");
  
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state,
    })(req, res, next);
  });  
router.route("/auth/google/callback").get(passport.authenticate("google",{session: false, failureRedirect:"/login"}),
handleLoginSuccess
);

export default router;