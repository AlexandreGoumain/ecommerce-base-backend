import { Types } from "mongoose";

const isValidRoleId = (role: string[]) => {
    return role.filter((id) => Types.ObjectId.isValid(id));
};

export default isValidRoleId;
