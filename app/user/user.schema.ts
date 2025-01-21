
import mongoose, { model } from "mongoose";
import { type IUser } from "./user.dto";
import * as authService from "../auth/auth.service"

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true, enum: ["USER", "MANAGER", "ADMIN"], default: "USER" },
        password: { type: String, required: true },
        refreshToken: { type: String },
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
        if (this.password) {
                this.password = await authService.hashPassword(this.password);
        }
        next();
});


// Exporting models
const User = model<IUser>("User", UserSchema);

export { User };
