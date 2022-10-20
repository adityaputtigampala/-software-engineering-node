import FollowModel from "../mongoose/FollowModel";
import UserModel from "../mongoose/UserModel"
import FollowControllerI from "../interfaces/FollowController";
import FollowDaoI from "../interfaces/FollowDao";

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
    follower: string, followed: string) => {
        const follows = await FollowModel.create({
            follower,
            followed,
        });
        return follows;
    }

    public userUnfollowsUser = async (
    follower: string, followed: string) => {
        const status = await FollowModel.deleteOne({follower, followed});
        return status;
    };

    public findWhoIamFollowing =async (me: string) => {
    const who = await FollowModel.find({follower: me});
    return who;
}

    public findWhoIsFollowingMe = async(me: string) => {
    const who = await FollowModel
    .find({followed: me})
    .populate('follower', 'username')
    .exec()
    return who;
}

//TODO: 1). Put in a class
//TODO: 2) implement singleton pattern
//TODO: 3). map to higher level classes 

}