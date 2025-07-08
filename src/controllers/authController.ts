import { Request, Response } from "express";
import { Types } from "mongoose";
import User, { IUser } from "../models/User";
import { clearToken, generateToken } from "../utils/auth";

const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, imageProfile } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = (await User.create({
        firstName,
        lastName,
        email,
        password,
        role: [new Types.ObjectId(process.env.DEFAULT_ROLE_ID)],
        isActive: true,
        imageProfile: imageProfile || "",
    })) as IUser;

    if (user) {
        generateToken(res, user._id as string);
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            imageProfile: user.imageProfile,
        });
    } else {
        res.status(400).json({ message: "An error occurred" });
    }
};

const authenticateUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as IUser;

    if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id as string);
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            imageProfile: user.imageProfile,
        });
    } else {
        res.status(401).json({
            message: "Mauvais identifiants, veuillez réessayer",
        });
    }
};

const logoutUser = (req: Request, res: Response) => {
    clearToken(res);
    res.status(200).json({ message: "Logged out successfully" });
};

export { authenticateUser, logoutUser, registerUser };
