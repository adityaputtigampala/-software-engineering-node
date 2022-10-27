/**
 * @file Controller RESTful Web service API for Like resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";

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

export default class LikeController implements LikeControllerI {
  app: Express;
  likeDao: LikeDao;

  constructor(app: Express, likeDao: LikeDao) { 
      this.app = app;
      this.likeDao = likeDao;
      this.app.post('/users/:uid/likes/:tid', this.userLikesTuit);
      this.app.delete('/users/:uid/likes/:tid', this.userUnlikesTuit);
      this.app.get('/users/:tid/likes', this.findAllUsersWhoLikedTuit);
      this.app.get('/users/:uid/likesByUser', this.findAllTuitsLikedByUser);
      
  }

  userLikesTuit = async (req: Request, res: Response) => {
    this.likeDao.userLikesTuit(
      req.params.tid, req.params.uid)
      .then(likes=>res.json(likes)
      );
    
}

userUnlikesTuit = async (req: Request, res: Response) => {
    
    this.likeDao.userUnlikesTuit(
        req.params.tid, req.params.uid)
        .then(likes=>res.json(likes)
    );
  
}

findAllUsersWhoLikedTuit = async(req: Request, res: Response) => {
  this.likeDao.findAllUsersWhoLikedTuit(req.params.tid)
  .then(likes=>res.json(likes)
  );
}

findAllTuitsLikedByUser = async(req: Request, res: Response) => {
    this.likeDao.findAllTuitsLikedByUser(req.params.uid)
    .then(likes=>res.json(likes)
    );
}
}