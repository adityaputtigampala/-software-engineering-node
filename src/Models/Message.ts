import User from "./User";
import Tuit from "./Tuit";

export default class Message {
    private message: string;
    private to: User;
    private from: User;
    private sentOn: Date;
 
 
    constructor(message: string, to: User,from: User, sentOn: Date ) {
            this.message = message;
            this.to = to;
            this.from = from;
            this.sentOn = sentOn;
    }
 }