import { type BaseSchema } from "../common/dto/base.dto";

export const userEnum = ["USER", "MANAGER", "ADMIN"] as const;

// Use typeof to create a type that corresponds to the elements of the array
export type UserEnum = typeof userEnum[number];

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        role: UserEnum;
        password: string,
        refreshToken: string | undefined
}

