import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const roleSchema = new Schema<IRole>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

roleSchema.pre("save", async function (next) {
    this.updatedAt = new Date();
    next();
});

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
