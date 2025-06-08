import express, { RequestHandler } from "express";

import {
    authenticateUser,
    logoutUser,
    registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser as RequestHandler);
router.post("/login", authenticateUser as RequestHandler);
router.post("/logout", logoutUser as RequestHandler);

export default router;
