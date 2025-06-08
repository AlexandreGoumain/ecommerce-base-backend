import { Request, Response } from "express";
import User from "../models/User";

const getUser = async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        res.status(400);
    }

    res.status(200).json(user);
};

const updateUser = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (user) {
        const { firstName, lastName, email } = req.body;

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        await user.save();

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
    }
};

const updatePassword = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (user) {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        if (!(await user.comparePassword(oldPassword))) {
            res.status(400).json({ message: "Invalid old password" });
            return;
        } else {
            user.password = newPassword;
            await user.save();
            res.status(200).json({ message: "Password updated successfully" });
        }
    } else {
        res.status(400).json({ message: "User not found" });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (user) {
        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    } else {
        res.status(400);
    }
};

export { deleteUser, getUser, updatePassword, updateUser };
