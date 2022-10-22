import FollowModel from "../mongoose/FollowModel";
import UserModel from "../mongoose/UserModel"
import FollowControllerI from "../interfaces/FollowController";
import FollowDaoI from "../interfaces/FollowDao";
import MessageDaoI from "../interfaces/MessageDao"
import MessageModel from "../mongoose/MessageModel";
import Message from "../Models/Message";

export default class MessageDao implements MessageDaoI {
    public static MessageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    }
    public constructor() {}

    public userMessagesUser = async(
    uidTo: string, uidFrom: string, message: any) => {
        const msg = await MessageModel.create({
            message: message.message,
            to: uidTo,
            from: uidFrom,
            sentOn: new Date(),
        });
        return msg;
    }

    public findAllMessagesSentByUser = async (
    uid: string) => {
        const msg = await MessageModel.find({from: uid});
        return msg;
    };

    public findAllMessagesSentByUserCount = async (
        uid: string) => {
            const msg = await MessageModel
            .find({from: uid})
            .count();
            return msg;
        };

    public findAllMessagesReceivedByUser =async (
    uid: string) => {
    const msg = await MessageModel.find({to: uid});
    return msg;
}

    public findAllMessagesReceivedByUserCount =async (
    uid: string) => {
    const msg = await MessageModel
    .find({to: uid})
    .count();
    return msg;
}

    public userdeletesMessage = async(
        uid: string, message: Message) => {
    const msg = await MessageModel
    .deleteOne({_id: Message})
    return msg;
}

//TODO: 1). Put in a class
//TODO: 2) implement singleton pattern
//TODO: 3). map to higher level classes 

}