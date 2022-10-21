import User from "./User";
import Tuit from "./Tuit";

export default class Bookmark {
    private bookmarkedTuit: string;
    private bookmarkedBy: string;
 
 
    constructor(bookmarkedTuit: string, bookmarkedBy: string) {
            this.bookmarkedTuit = bookmarkedTuit;
            this.bookmarkedBy = bookmarkedBy;
    }
 }