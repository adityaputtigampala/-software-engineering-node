import Tuit from "../Models/Tuit";
import Message from "../Models/Message";

export default interface TuitDao {
    userMessagesUser(uidTo: string, uidFrom: string, message: Message): Promise<Message>;
    findAllMessagesSentByUser(uid: string): Promise<Message[]>;
    findAllMessagesSentByUserCount(uid: string): Promise<any>;
    findAllMessagesReceivedByUser(uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUserCount(uid: string): Promise<any>;
    userdeletesMessage(uid: string, message: Message): Promise<any>;
}