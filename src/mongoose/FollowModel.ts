import mongoose, { mongo } from "mongoose";
import FollowSchema from "./FollowSchema";

const FollowModel = mongoose.model('FollowModel', FollowSchema);

export default FollowModel;