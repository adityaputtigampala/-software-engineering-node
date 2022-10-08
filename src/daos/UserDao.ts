import User from "../Models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
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
    console.log(user, "user")
    console.log(uid, "uid")
    const id = uid
    const updatingUser = await UserModel.findByIdAndUpdate(id, user, {new: true}, (error,updateUser)=>{
        if(error){
            return error
        }
        if(!updateUser) {
            return "user not found"
        }
        return updateUser;
    });
    return updatingUser;
    // return await UserModel.updateOne({_id: uid}, {$set: {
    //         username: user.uName,
    //         password: user.pass,
    //         firstName: user.fName,
    //         lastName: user.lName,
    //         email: user.getEmail
    //     }});
}
}

