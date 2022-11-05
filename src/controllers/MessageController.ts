/**
 * @file Controller RESTful Web service API for Message resource
 */
import {Request, Response, Express} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uidTo/messages/sent/:uidFrom to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /users/:uid/messages/sent/:message to delete all a tuit liked by a user
 *     </li> 
 *     <li>GET /users/:uid/messages/sent
 *     </li> 
 *     <li>GET /users/:uid/messages/received
 *     </li> 
 *     <li>GET /users/:uid/messagecount/sent
 *     </li> 
 *     <li>GET /users/:uid/messagescount/received</li>
 * </ul>
 * @property {app} Express Express implementation of the application
 * @property {messageDao} messageDao message DAO implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
   app: Express;
   messageDao: MessageDao;
   constructor(app: Express, messageDao: MessageDao) {
       this.app = app;
       this.messageDao = messageDao;
       this.app.post('/api/users/:uidTo/messages/sent/:uidFrom', this.userMessagesUser);
       this.app.delete('/api/users/:uid/messages/sent/:message', this.userdeletesMessage);
       this.app.get('/api/users/:uid/messages/sent', this.findAllMessagesSentByUser);
       this.app.get('/api/users/:uid/messages/received', this.findAllMessagesReceivedByUser);
       this.app.get('/api/users/:uid/messagecount/sent', this.findAllMessagesSentByUserCount);
       this.app.get('/api/users/:uid/messagescount/received', this.findAllMessagesReceivedByUserCount);
   }

   /**
    * Action performed to create a message from one user to another 
    * @param req Represents request from client, including the path parameters uidto and uidfrom 
    * @param res Represents response to client, including a created message object
    */
   userMessagesUser = (req: Request, res: Response) =>
       this.messageDao.userMessagesUser(req.params.uidTo, req.params.uidFrom, req.body)
           .then(message => res.json(message));

    /**
    * Action performed to filter messages sent by one user 
    * @param req Represents request from client, including the path parameters userid from and message
    * @param res Represents response to client, including a created message object
    */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
       this.messageDao.findAllMessagesSentByUser(req.params.uid)
           .then(message => res.json(message));

    /**
    * Action performed to find the count of all message sent by a user 
    * @param req Represents request from client, including the path parameters userid from 
    * @param res Represents response to client, including a created message object
    */
    findAllMessagesSentByUserCount = (req: Request, res: Response) =>
    this.messageDao.findAllMessagesSentByUser(req.params.uid)
        .then(message => res.json(message));

    /**
    * Action performed to find all messages received by one user 
    * @param req Represents request from client, including the path parameters userid 
    * @param res Represents response to client, including a created message object
    */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
       this.messageDao.findAllMessagesReceivedByUser(req.params.uid)
           .then(message => res.json(message));

    /**
    * Action performed to find all messages received by a user count
    * @param req Represents request from client, including the path parameters userid
    * @param res Represents response to client, including a created message object
    */
    findAllMessagesReceivedByUserCount = (req: Request, res: Response) =>
    this.messageDao.findAllMessagesReceivedByUser(req.params.uid)
        .then(message => res.json(message));

    /**
    * Action performed to delete a message
    * @param req Represents request from client, including the path parameters userid 
    * @param res Represents response to client, including a created message object
    */
    userdeletesMessage = (req: Request, res: Response) =>
    this.messageDao.userdeletesMessage(req.params.uid, req.body)
        .then(message => res.json(message));
}
