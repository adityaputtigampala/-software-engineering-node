import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

export default class BookmarkController implements BookmarkControllerI {
   app: Express;
   bookmarkDao: BookmarkDao;
   constructor(app: Express, bookmarkDao: BookmarkDao) {
       this.app = app;
       this.bookmarkDao = bookmarkDao;
       this.app.post('/users/:uid/bookmarks/:tid', this.userBookmarksTuit);
       this.app.delete('/users/:uid/bookmarks/:tid', this.userUnbookmarksTuit);
       this.app.get('/users/:uid/bookmarks', this.findAllTuitsBookmarkedByUser);
   }
   userBookmarksTuit = (req: Request, res: Response) =>
       this.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
           .then(bookmarks => res.json(bookmarks));
    userUnbookmarksTuit = (req: Request, res: Response) =>
       this.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
           .then(bookmarks => res.json(bookmarks));
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
       this.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
           .then(bookmarks => res.json(bookmarks));
}
