import Tuit from "../Models/Tuit";
import Bookmark from "../Models/Bookmark";

export default interface BookmarkDao {
    userBookmarksTuit(tid: string, uid: string): Promise<Bookmark>;
    userUnbookmarksTuit(tid: string, uid: string): Promise<any>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark>;
    findAllTuitsBookmarkedByUserCount(uid: string): Promise<any>;

}