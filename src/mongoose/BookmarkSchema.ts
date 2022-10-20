import mongoose from "mongoose";
import Bookmark from "../Models/Bookmark";

const BookmarkSchema = new mongoose.Schema({
    bookmarkedTuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'bookmarks'});

export default BookmarkSchema;