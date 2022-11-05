import User from "./User";
import Tuit from "./Tuit";

export default class Bookmark {
    private bookmarkedTuit: Tuit;
    private bookmarkedBy: string;
    private _id?: string
 
 
    constructor(_id: string, bookmarkedTuit: Tuit, bookmarkedBy: string) {
            this._id = _id
            this.bookmarkedTuit = bookmarkedTuit;
            this.bookmarkedBy = bookmarkedBy;
    }
 }