import Tuit from "../Models/Tuit";
import User from "../Models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    public static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    public constructor() {}

    public async findTuitById(id: string): 
    Promise<Tuit> {
  const tuitMongooseModel = await TuitModel
    .findById(id).populate('postedBy').exec();
  const tuit = new Tuit(
    tuitMongooseModel?._id.toString() ?? '',
    tuitMongooseModel?.tuit ?? '',
    new Date(tuitMongooseModel?.postedOn ?? (new Date())), tuitMongooseModel?.postedBy);
  return tuit;
}
    public async findAllTuits(): Promise<Tuit[]> {
    const tuitMongooseModels =
          await TuitModel.find();

    const tuitModels = tuitMongooseModels
      .map((tuitMongooseModel) => {
        console.log(tuitMongooseModel, 'tuitmongoosemodel')
        return new Tuit(
          tuitMongooseModel?._id.toString() ?? '',
          tuitMongooseModel?.tuit ?? '',
          tuitMongooseModel?.postedOn ?? '',
          tuitMongooseModel?.postedBy ?? '');
      })
    return tuitModels;
  }

  public async findTuitsByUser(authorId: string): 
    Promise<Tuit[]> {const tuitMongooseModels = await TuitModel.find({postedBy: authorId});
    const tuitModels = tuitMongooseModels
    .map((tuitMongooseModel) => {
      return new Tuit(
        tuitMongooseModel?._id.toString() ?? '',
        tuitMongooseModel?.tuit ?? '',
        new Date(tuitMongooseModel?.postedOn ?? (new Date())), tuitMongooseModel?.postedBy);
    });
  return tuitModels;
}
    public async createTuit(tuit: Tuit): Promise<Tuit> {
    const tuitMongooseModel = await TuitModel.create(tuit);
    console.log(tuit, 'Tuit')
    return new Tuit(
      tuitMongooseModel?._id.toString() ?? '',
      tuitMongooseModel.tuit,
      new Date(tuitMongooseModel?.postedOn ?? (new Date())), tuitMongooseModel?.postedBy);
  }

    public async deleteTuit(tuitId: string): Promise<any> {
    return await TuitModel.deleteOne({_id: tuitId});
  }

    public async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
      const updatingTuit = await TuitModel.findByIdAndUpdate(tuitId, tuit)
      const newTuit = await TuitModel.findById(tuitId)
      return newTuit;

  }
  }
  
  
 