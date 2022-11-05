import Tuit from "../Models/Tuit";

export default interface LikeDao {
    userLikesTuit(tid: string, uid: string): Promise<any>;
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
    findAllUsersWhoLikedTuit(tid: string): Promise<any>;
    findAllTuitsLikedByUser(uid: string): Promise<any>;

}