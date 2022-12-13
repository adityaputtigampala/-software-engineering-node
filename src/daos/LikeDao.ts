import FollowModel from "../mongoose/FollowModel";
import UserModel from "../mongoose/UserModel"
import BookmarkControllerI from "../interfaces/BookmarkController";
import LikeDaoI from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";
import TuitModel from "../mongoose/TuitModel";
import Like from "../Models/Like";

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
        tid: string, uid: string) => {
        const liked = await LikeModel.create({
            tuit: tid,
            likedBy: uid,
        });
        const username = await UserModel.findById(uid)
        const tuit = await TuitModel.findById(tid)
        const response = {
            _id:liked.id,
            likedBy: username?.username,
            tuit: tuit?.tuit
        }
        return response;
    }

    
    public userUnlikesTuit = async (
        tid: string, uid: string) => {
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
        .populate("likedBy")
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
public countHowManyLikedTuit =
  async (tid: string) =>
    LikeModel.count({tuit: tid});

}