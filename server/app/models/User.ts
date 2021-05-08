import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
    email: string;
    firstName: string;
    lastName: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

export default mongoose.model<UserInterface>("User", UserSchema);
