import { Router } from "express";
import { getLogin, getRegister, getForgot, postLogin, postRegister, postLogout, postForgot } from "../controllers/authController.js";

const router = Router();
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/forgot", getForgot);
router.post("/forgot", postForgot);
router.post("/logout", postLogout);

export default router;