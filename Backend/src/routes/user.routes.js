import { Router } from "express";
import { registeredUser } from "../controllers/user.controller.js";
import { Upload } from "../middleware/multer.middleware.js";
const router = Router();

// router.route("/register").post(Upload.single("avatar"),registeredUser);
router.route("/register").post(registeredUser);

export default router;