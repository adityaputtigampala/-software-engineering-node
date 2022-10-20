import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {type: mongoose.Schema.Types.ObjectId, required: true},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    sentOn: {type: mongoose.Schema.Types.ObjectId, default: Date.now}
}, {collection: 'messages'});

export default MessageSchema;

