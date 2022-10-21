import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});

export default MessageSchema;

