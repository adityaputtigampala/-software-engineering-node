import Tuit from "../Models/Tuit";
import Follow from "../Models/Follow";

export default interface FollowDao {
    userFollowsUser(follower: string, followed: string): Promise<Follow>;
    userUnfollowsUser(follower: string, followed: string): Promise<any>;
    findWhoIamFollowing(follower: string): Promise<Follow[]>;
    findWhoIsFollowingMe(follower: string): Promise<Follow[]>;
    findWhoIamFollowingCount(follower: string): Promise<any>;
    findWhoIsFollowingMeCount(follower: string): Promise<any>;

}