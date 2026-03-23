import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { updateProfileSchema, changePasswordSchema } from "../types/user.types.js";
import {
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authenticate);

router.get("/me", getProfile);
router.put("/me", upload.single("avatar"), validate(updateProfileSchema), updateProfile);
router.put("/me/password", validate(changePasswordSchema), changePassword);
router.delete("/me", deleteAccount);

export default router;