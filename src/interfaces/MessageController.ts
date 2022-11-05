import {Request, Response} from "express";

export default interface MessageController {
   userMessagesUser(req: Request, res: Response): void;
   findAllMessagesSentByUser(req: Request, res: Response): void;
   findAllMessagesSentByUserCount(req: Request, res: Response): void;
   findAllMessagesReceivedByUser(req: Request, res: Response): void;
   findAllMessagesReceivedByUserCount(req: Request, res: Response): void;
   userdeletesMessage(req: Request, res: Response): void;
   
}