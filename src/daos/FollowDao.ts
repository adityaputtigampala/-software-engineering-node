import FollowModel from "../mongoose/FollowModel";
import UserModel from "../mongoose/UserModel"
import FollowControllerI from "../interfaces/FollowController";
import FollowDaoI from "../interfaces/FollowDao";
import Follow from "../Models/Follow";
import User from "../Models/User";

export default class FollowDao implements FollowDaoI {
    public static FollowDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.FollowDao === null) {
            FollowDao.FollowDao = new FollowDao();
        }
        return FollowDao.FollowDao;
    }
    public constructor() {}

    public userFollowsUser = async(
    follower: string, followed: string): Promise<any> => {
        const follows = await FollowModel.create({
            follower,
            followed,
        });
        return follows;
    }

    public userUnfollowsUser = async (
    follower: string, followed: string): Promise<any> => {
        const status = await FollowModel.deleteOne({follower, followed});
        return status;
    };

    findWhoIamFollowing =async (me: string): Promise<any> => {
    const who = await FollowModel
    .find({follower: me})
    .populate("follower", "followed")
    .exec();
    return who;
}

    findWhoIsFollowingMe = async(me: string): Promise<any> => {
    
    //.exec();
    const userMongooseModel = await UserModel.findById(me);
    const who = await FollowModel
    .find({followed: me})
    .populate('follower', 'followed')
    return who;
}

public findWhoIamFollowingCount =async (me: string) => {
    const who = await FollowModel
    .find({follower: me})
    .count();
    return who;
}

public findWhoIsFollowingMeCount =async (me: string) => {
    const who = await FollowModel
    .find({followed: me})
    .count()
    return who;
}

}