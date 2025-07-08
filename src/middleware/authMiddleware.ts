import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

import { UserBasicInfo } from "..";
import User, { IUser } from "../models/User";
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

const isAdmin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser;
        if (user.role.includes(new Types.ObjectId(process.env.ADMIN_ROLE_ID))) {
            next();
        } else {
            res.status(401);
            throw new AuthenticationError("User not authorized");
        }
    }
);
export { authenticated, isAdmin };
