import User from "../Models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
  static getInstance(): UserDao {
    throw new Error("Method not implemented.");
  }
   async findAllUsers(): Promise<User[]> {
       const userMongooseModels = await UserModel.find();
       const userModels = userMongooseModels
           .map((userMongooseModel) => {
                return new User(
                    userMongooseModel?._id.toString()??'',
                    userMongooseModel?.username??'',
                    userMongooseModel?.password??'',
                    userMongooseModel?.firstName??'',
                    userMongooseModel?.lastName??'',
                    userMongooseModel?.email??''
                );
       });
       return userModels;
   }
   async findUserById(uid: string): Promise<User> {
    const userMongooseModel = await UserModel.findById(uid);
    return new User(
        userMongooseModel?._id.toString()??'',
                    userMongooseModel?.username??'',
                    userMongooseModel?.password??'',
                    userMongooseModel?.firstName??'',
                    userMongooseModel?.lastName??'',
                    userMongooseModel?.email??''
    );
}

async findUserByUsername(username: string): Promise<any> {
const userMongooseModel = await UserModel.findOne({username});
}


async createUser(user: User): Promise<User> {
    const userMongooseModel = await UserModel.create(user);
    return new User(
        userMongooseModel?._id.toString() || '',
        userMongooseModel?.username??'',
        userMongooseModel?.password??'',
        userMongooseModel?.firstName??'',
        userMongooseModel?.lastName??'',
        userMongooseModel?.email??''
    );
}
async deleteUser(uid: string):  Promise<any> {
    return await UserModel.deleteOne({_id: uid});
}
async updateUser(uid: string, user: User): Promise<any> {
    const updatingUser = await UserModel.findByIdAndUpdate(uid,user)
    const newUpdateInfo  = await UserModel.findById(uid)
    return newUpdateInfo
    };
   
}

