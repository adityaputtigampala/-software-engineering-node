import User from "./User";
import Tuit from "./Tuit";

export default class Message {
    private id: string = '';
    private message: string;
    private to: User;
    private from: User;
    private sentOn: Date;
 

    constructor(id: string, message: string, to: User,from: User, sentOn: Date ) {
            this.id = id;
            this.message = message;
            this.to = to;
            this.from = from;
            this.sentOn = sentOn;
    }
 }