import Tuit from "../Models/Tuit";

export default interface FollowDao {
    userFollowsUser(follower: string, followed: string): Promise<any>;
    userUnfollowsUser(follower: string, followed: string): Promise<any>;
    findWhoIamFollowing(me: string): Promise<any>;
    findWhoIsFollowingMe(me: string): Promise<any>;
    findWhoIamFollowingCount(me: string): Promise<any>;
    findWhoIsFollowingMeCount(me: string): Promise<any>;

}