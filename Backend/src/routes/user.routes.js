import { Router } from "express";
import { loginUser, registeredUser } from "../controllers/user.controller.js";
import { Upload } from "../middleware/multer.middleware.js";
const router = Router();

// router.route("/register").post(Upload.single("avatar"),registeredUser);
router.route("/register").post(registeredUser);

router.route("/login").post(loginUser)

export default router;