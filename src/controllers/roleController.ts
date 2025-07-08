import { Request, Response } from "express";

import Role from "../models/Role";

const registerRole = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const roleExists = await Role.findOne({ title });

    if (roleExists) {
        res.status(400).json({ message: "Role already exists" });
        return;
    }

    const role = await Role.create({ title, description });

    if (role) {
        res.status(201).json({
            _id: role._id,
            title: role.title.trim(),
            description: role.description.trim(),
        });
    } else {
        res.status(400).json({ message: "An error occurred" });
    }
};

const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
};

const getRoleById = async (req: Request, res: Response) => {
    const { roleId } = req.body;

    if (!roleId) {
        res.status(400).json({ message: "RoleID is required" });
        return;
    }

    try {
        const role = await Role.findById(roleId);

        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
};

const deleteRole = async (req: Request, res: Response) => {
    const { roleId } = req.body;

    if (!roleId) {
        res.status(400).json({ message: "RoleID is required" });
        return;
    }

    try {
        const role = await Role.findById(roleId);

        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }

        await role.deleteOne();

        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
};

export { deleteRole, getRoleById, getRoles, registerRole };
