import FollowModel from "../mongoose/FollowModel";
import UserModel from "../mongoose/UserModel"
import BookmarkControllerI from "../interfaces/BookmarkController";
import LikeDaoI from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";

export default class LikeDao implements LikeDaoI {
    public static LikeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.LikeDao === null) {
            LikeDao.LikeDao = new LikeDao();
        }
        return LikeDao.LikeDao;
    }
    public constructor() {}

    public userLikesTuit = async(
    uid: string, tid: string) => {
        const liked = await LikeModel.create({
            tuit: tid,
            likedBy: uid,
        });
        return liked;
    }

    
    public userUnlikesTuit = async (
        uid: string, tid: string) => {
        const liked = await LikeModel.deleteOne({
            tuit: tid,
            likedBy: uid,
        });
        return liked;
    };

    public findAllUsersWhoLikedTuit =async (
        tid: string) => {
        const liked = await LikeModel
        .find({tuit: tid})
        .populate("likedby")
        .exec();
        return liked;
}

public findAllTuitsLikedByUser =async (
    uid: string) => {
    const liked = await LikeModel
    .find({likedBy: uid})
    .populate("tuit")
    .exec();
    return liked;
}
//TODO: 1). Put in a class
//TODO: 2) implement singleton pattern
//TODO: 3). map to higher level classes

}