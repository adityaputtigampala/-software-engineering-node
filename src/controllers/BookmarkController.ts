/**
 * @file Controller RESTful Web service API for Bookmark resource
 */

import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to delete all a tuit bookmarked by a user
 *     </li> 
 *     <li>GET /users/:uid/bookmarks to get all tuits bookmarked by a user</li>
 * </ul>
 * @property {app} Express Express implementation of the application
 * @property {bookmarkDao} BookmarkDao Bookmark DAO implementing
 * RESTful Web service API
 */

export default class BookmarkController implements BookmarkControllerI {
   app: Express;
   bookmarkDao: BookmarkDao;
   /**
    * Bookmark controller class implemented using express and Bookmark DAO
    * @param app the express implementation of the app 
    * @param bookmarkDao logic where the bookmark implementation is defined 
    */
   constructor(app: Express, bookmarkDao: BookmarkDao) {
       this.app = app;
       this.bookmarkDao = bookmarkDao;
       
       this.app.post('/users/:uid/bookmarks/:tid', this.userBookmarksTuit);
       this.app.delete('/users/:uid/bookmarks/:tid', this.userUnbookmarksTuit);
       this.app.get('/users/:uid/bookmarks', this.findAllTuitsBookmarkedByUser);
       this.app.get('/users/:uid/bookmarknum/count', this.findAllTuitsBookmarkedByUserCount);
   }
   /**
    * Action performed when a user bookmarks a Tuit 
    * @param req Represents request from client, including the path parameters uid and tid with uid
    * representing the user and tid representing the tuits id
    * @param res Represents response to client, including a created bookmark object
    */
   userBookmarksTuit = (req: Request, res: Response) =>
       this.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
           .then(bookmarks => res.json(bookmarks));
    /**
     * Action performed when a user unbookmarks a Tuit 
     * @param req Represents request from client, including the path parameters uid and tid with uid
    * representing the user and tid representing the tuits id
     * @param res Represents response to client, a success that bookmark was removed 
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
       this.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
           .then(bookmarks => res.json(bookmarks));

    /**
     * Action performed when a user searches for all tuits bookmarked by a user 
     * @param req Represents request from client, including the path parameters uid and tid with uid
    * representing the user 
     * @param res Represents response to client, including the body formatted as JSON arrays 
    * containing all the tuits bookmarked by user 
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
       this.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
           .then(bookmarks => res.json(bookmarks));

    /**
     * Action performed when a user searches for count of tuits bookmarked by a user 
     * @param req Represents request from client, including the path parameters uid and tid with uid
    * representing the user 
     * @param res Represents response to client, including the count of tuits 
     */
    findAllTuitsBookmarkedByUserCount = (req: Request, res: Response) =>
    this.bookmarkDao.findAllTuitsBookmarkedByUserCount(req.params.uid)
        .then(bookmarks => res.json(bookmarks));
}
