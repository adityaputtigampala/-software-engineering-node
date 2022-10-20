import Tuit from "../Models/Tuit";

export default interface LikeDao {
    userLikesTuit(uid: string, tid: string): Promise<any>;
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
    findAllUsersWhoLikedTuit(tid: string): Promise<any>;
    findAllTuitsLikedByUser(uid: string): Promise<any>;

}