import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserBasicInfo } from "..";
import User from "../models/User";
import { AuthenticationError } from "./errorMiddleware";

const authenticated = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.cookies.jwt;

            if (!token) {
                res.status(401);
                throw new AuthenticationError("token missing");
            }

            const jwtSecret = process.env.JWT_SECRET || "";
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            if (!decoded || !decoded.userId) {
                res.status(401);
                throw new AuthenticationError("User not found");
            }

            const user = await User.findById(decoded.userId).select(
                "-password"
            );

            if (!user) {
                res.status(401);
                throw new AuthenticationError("User not found");
            }

            req.user = user as UserBasicInfo;
            next();
        } catch (err) {
            res.status(401);
            throw new AuthenticationError("token failed");
        }
    }
);

export { authenticated };
