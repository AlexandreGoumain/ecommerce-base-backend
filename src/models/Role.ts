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
    },
    description: {
        type: String,
        required: true,
    },
});

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
