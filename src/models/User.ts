import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";
import { IRole } from "./Role";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRole;
    comparePassword(enteredPassword: string): Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    this.updatedAt = new Date();

    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
