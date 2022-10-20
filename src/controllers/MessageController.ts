import {Request, Response, Express} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

export default class MessageController implements MessageControllerI {
   app: Express;
   messageDao: MessageDao;
   constructor(app: Express, messageDao: MessageDao) {
       this.app = app;
       this.messageDao = messageDao;
       this.app.post('/users/:uidTo/messages/sent/:uidFrom', this.userMessagesUser);
       this.app.delete('/users/:uid/messages/sent/:message', this.userdeletesMessage);
       this.app.get('/users/:uid/messages/sent', this.findAllMessagesSentByUser);
       this.app.get('/users/:uid/messages/received', this.findAllMessagesReceivedByUser);
   }
   userMessagesUser = (req: Request, res: Response) =>
       this.messageDao.userMessagesUser(req.params.uidTo, req.params.uidFrom, req.body)
           .then(message => res.json(message));
    findAllMessagesSentByUser = (req: Request, res: Response) =>
       this.messageDao.findAllMessagesSentByUser(req.params.uid)
           .then(message => res.json(message));
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
       this.messageDao.findAllMessagesReceivedByUser(req.params.uid)
           .then(message => res.json(message));
    userdeletesMessage = (req: Request, res: Response) =>
    this.messageDao.userdeletesMessage(req.params.uid, req.body)
        .then(message => res.json(message));
}
