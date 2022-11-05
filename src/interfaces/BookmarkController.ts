import {Request, Response} from "express";

export default interface BookmarkController {
   userBookmarksTuit(req: Request, res: Response): void;
   userUnbookmarksTuit(req: Request, res: Response): void;
   findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
   findAllTuitsBookmarkedByUserCount(req: Request, res: Response): void;
}