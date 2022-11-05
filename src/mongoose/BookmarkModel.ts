import mongoose, { mongo } from "mongoose";
import FollowSchema from "./FollowSchema";
import BookmarkSchema from "./BookmarkSchema";

const BookmarkModel = mongoose.model('BookmarkModel', BookmarkSchema);

export default BookmarkModel;