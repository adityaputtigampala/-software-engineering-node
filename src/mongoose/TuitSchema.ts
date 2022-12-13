import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
  tuit: {type: String, required: true},
  postedBy: {type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'},
  postedOn: {type: Date, default: Date.now},
  stats: {
    replies: {type: Number, default: 0},
    retuits: {type: Number, default: 0},
    likes: {type: Number, default: 0}
    }
  }, {collection: 'tuits'});
export default TuitSchema;
