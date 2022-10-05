import mongoose from "mongoose";
import UserSchema from "../mongoose/UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;