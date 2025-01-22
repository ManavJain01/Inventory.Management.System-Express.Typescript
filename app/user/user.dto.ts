export interface IUser {
        id: number;
        name: string;
        email: string;
        role: "USER" | "ADMIN" | "MANAGER";
        password: string;
        refreshToken: string | null;
        createdAt?: Date;
        updatedAt?: Date;
}

export const userEnum: ("USER" | "MANAGER" | "ADMIN")[] = ["USER", "MANAGER"];
