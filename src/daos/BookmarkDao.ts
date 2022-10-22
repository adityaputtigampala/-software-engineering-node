import FollowModel from "../mongoose/FollowModel";
import UserModel from "../mongoose/UserModel"
import BookmarkControllerI from "../interfaces/BookmarkController";
import BookmarkDaoI from "../interfaces/BookmarkDao";
import BookmarkModel from "../mongoose/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    public static BookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    }
    public constructor() {}

    public userBookmarksTuit = async( 
    uid: string, tid: string) => {
        console.log(uid, "uid")
        const bookmarked = await BookmarkModel.create({
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        });
        return bookmarked;
    }

    
    public userUnbookmarksTuit = async (
        uid: string, tid: string) => {
        const bookmarked = await BookmarkModel.deleteOne({
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        });
        return bookmarked;
    };

    public findAllTuitsBookmarkedByUser =async (
        uid: string) => {
        const bookmarked = await BookmarkModel
        .find({bookmarkedBy: uid})
        .populate("bookmarkedTuit")
        .exec();
        return bookmarked;
}

public findAllTuitsBookmarkedByUserCount =async (
    uid: string) => {
    const bookmarked = await BookmarkModel
    .find({bookmarkedBy: uid})
    .populate("bookmarkedTuit")
    .count()
    return bookmarked;
}

//TODO: 1). Put in a class
//TODO: 2) implement singleton pattern
//TODO: 3). map to higher level classes

}