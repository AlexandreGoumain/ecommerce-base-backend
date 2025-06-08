import express from "express";
import {
    deleteUser,
    getUser,
    updatePassword,
    updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.put("/update-password", updatePassword);

export default router;
