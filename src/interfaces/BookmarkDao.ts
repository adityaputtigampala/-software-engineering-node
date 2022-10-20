import Tuit from "../Models/Tuit";
import Bookmark from "../Models/Bookmark";

export default interface BookmarkDao {
    userBookmarksTuit(tid: string, uid: string): Promise<any>;
    userUnbookmarksTuit(tid: string, uid: string): Promise<any>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<any>;

}