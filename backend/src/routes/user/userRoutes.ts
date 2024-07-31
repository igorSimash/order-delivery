import express from "express";
import { signUpController } from "../../controllers/user/signUpController";
import { signInController } from "../../controllers/user/singInController";
import { authorization } from "../../middlewares/checkAccess";
import { getUserDataController } from "../../controllers/user/getUserDataController";

const router = express.Router();

router.get("/", authorization, getUserDataController);

router.post("/signup", signUpController);
router.post("/signin", signInController);

export default router;
