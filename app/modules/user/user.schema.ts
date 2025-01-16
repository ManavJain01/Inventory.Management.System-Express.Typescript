
import mongoose, { model } from "mongoose";
import { type IUser } from "./user.dto";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const hashPassword = async (password: string) => {
        const hash = await bcrypt.hash(password, 12);
        return hash;
};

const UserSchema = new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true, enum: ["USER", "ADMIN"], default: "USER" },
        password: { type: String, required: true },
        refreshToken: { type: String },
        isBlock: { type: Boolean, required: true, default: false },
        isActive: { type: Boolean, required: true, default: false },
        isOnboard: { type: Boolean, default: false },
        isKycComplete: { type: Boolean, default: false },
        twoFactorEnabled: { type: Boolean, default: false },
        documents: { type: [String] },
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
        // if (this.password) {
        //         this.password = await hashPassword(this.password);
        // }
        next();
});


// Exporting models
const User = model<IUser>("User", UserSchema);

export { User };
