import mongoose from "mongoose";
import {ConnectOptions} from "mongoose";

let MONGODB_URI = 'mongodb://localhost:27017/FSD';

export interface MongoConnection{
    useUnifiedTopology: boolean,
    useNewUrlParser: boolean
};

mongoose.connect(MONGODB_URI, {MongoConnection: true , useNewUrlParser: true } as ConnectOptions).then(() => {
	console.log("Successfully connected to MongoDB.");
});

const db = mongoose.connection;

export default db;