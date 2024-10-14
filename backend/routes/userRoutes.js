import express from "express";
import { loginUser, myProfile } from "../controllers/userControlllers.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/loginUser", loginUser);
router.get("/myProfile",isAuth,myProfile)


export default router;