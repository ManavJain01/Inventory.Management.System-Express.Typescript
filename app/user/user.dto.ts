import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        role: "USER" | "MANAGER" | "ADMIN";
        password: string,
        refreshToken: string | undefined
}

export const userEnum: ("USER" | "MANAGER" | "ADMIN")[] = ["USER", "MANAGER"];