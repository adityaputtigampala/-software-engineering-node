import Tuit from "../Models/Tuit";
import User from "../Models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class TuitDao implements TuitDao {
    async findAllTuits(): Promise<Tuit[]> {
        return await UserModel.find();
    }
    async findTuitsByUser(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    async createUser(user: User): Promise<any> {
        return await UserModel.create(user);
    }
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: User});
    }
}