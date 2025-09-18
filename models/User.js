import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    passwordHash: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.setPassword = async function(plain) {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(plain, salt);
};
userSchema.methods.checkPassword = function(plain) {
    return bcrypt.compare(plain, this.passwordHash);
};

export default mongoose.model("User", userSchema);