import Tuit from "../Models/Tuit";
import Message from "../Models/Message";

export default interface TuitDao {
    userMessagesUser(uidTo: string, uidFrom: string, message: Message): Promise<any>;
    findAllMessagesSentByUser(uid: string): Promise<any>;
    findAllMessagesReceivedByUser(uid: string): Promise<any>;
    userdeletesMessage(uid: string, message: Message): Promise<any>;
}