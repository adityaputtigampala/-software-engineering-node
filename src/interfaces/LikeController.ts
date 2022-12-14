import {Request, Response} from "express";

export default interface LikeController {
   userLikesTuit(req: Request, res: Response): void;
   userUnlikesTuit(req: Request, res: Response): void;
   findAllUsersWhoLikedTuit(req: Request, res: Response): void;
   findAllTuitsLikedByUser(req: Request, res: Response): void;
   
}