import User from "./User";
import Tuit from "./Tuit";

export default class Bookmark {
    private bookmarkedTuit: Tuit;
    private bookmarkedBy: User;
 
 
    constructor(bookmarkedTuit: Tuit, bookmarkedBy: User) {
            this.bookmarkedTuit = bookmarkedTuit;
            this.bookmarkedBy = bookmarkedBy;
    }
 }