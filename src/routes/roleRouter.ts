import express, { RequestHandler } from "express";

import {
    deleteRole,
    getRoles,
    getRoleById,
    registerRole,
} from "../controllers/roleController";

const router = express.Router();

router.post("/", registerRole as RequestHandler);
router.get("/", getRoles as RequestHandler);
router.get("/:id", getRoleById as RequestHandler);
router.delete("/", deleteRole as RequestHandler);

export default router;
