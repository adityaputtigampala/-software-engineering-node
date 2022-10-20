import User from "./User";
import Tuit from "./Tuit";

export default class Like {
    private tuit: Tuit;
    private likedBy: User;
 
 
    constructor(tuit: Tuit, likedBy: User) {
            this.tuit = tuit;
            this.likedBy = likedBy;
    }
 }