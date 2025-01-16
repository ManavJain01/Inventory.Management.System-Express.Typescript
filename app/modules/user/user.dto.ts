import { type BaseSchema } from "../../common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        role: "USER" | "ADMIN";
        password: string,
        isBlock: boolean,
        isActive: boolean,
        userId: object
        isOnboard: boolean,
        isKycComplete: boolean,
        twoFactorEnabled: boolean,
        documents: Array<string>
        refreshToken: string
}