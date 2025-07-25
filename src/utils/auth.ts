import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (res: Response, userId: string) => {
    const jwtSecret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
    });
};

const clearToken = (res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
};

export { clearToken, generateToken };
