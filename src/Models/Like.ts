import User from "./User";
import Tuit from "./Tuit";

export default class Like {
    private tuit: string;
    private likedBy: string;
 
 
    constructor(tuit: string, likedBy: string) {
            this.tuit = tuit;
            this.likedBy = likedBy;
    }
 }