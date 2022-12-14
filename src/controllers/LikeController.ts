/**
 * @file Controller RESTful Web service API for Like resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /users/:uid/likes/:tid to delete all a tuit liked by a user
 *     </li> 
 *     <li>GET /users/:tid/likes to get all the users who like a tuit
 *     </li> 
 *     <li>GET /users/:uid/likesByUser to get all tuits liked by a user</li>
 * </ul>
 * @property {app} Express Express implementation of the application
 * @property {likeDao} likeDao like DAO implementing
 * RESTful Web service API
 */

export default class LikeController implements LikeControllerI {
  app: Express;
  likeDao: LikeDao;
  tuitDao: TuitDao;

  constructor(app: Express, likeDao: LikeDao, tuitDao: TuitDao) { 
      this.app = app;
      this.likeDao = likeDao;
      this.tuitDao = tuitDao;
      this.app.post('/api/users/:uid/likes/:tid', this.userLikesTuit);
      this.app.delete('/api/users/:uid/likes/:tid', this.userUnlikesTuit);
      this.app.get('/api/users/:tid/likes', this.findAllUsersWhoLikedTuit);
      this.app.get('/api/users/:uid/likesByUser', this.findAllTuitsLikedByUser);
      
  }

  /**
    * Action performed to find a user who likes a tuit 
    * @param req Represents request from client, including the path parameters me
    * @param res Represents response to client, including a created like object
    */
  userLikesTuit = async (req: Request, res: Response) => {
    this.likeDao.userLikesTuit(
      req.params.tid, req.params.uid)
      .then(likes=>res.json(likes)
      );
    
}

/**
    * Action performed to find a user who unlikes a tuit 
    * @param req Represents request from client, including the path parameters user id
    * @param res Represents response to client, including a created like object
    */
userUnlikesTuit = async (req: Request, res: Response) => {
    
    this.likeDao.userUnlikesTuit(
        req.params.tid, req.params.uid)
        .then(likes=>res.json(likes)
    );
  
}
/**
    * Action performed to find all users who like a tuit 
    * @param req Represents request from client, including the path parameters tuid id
    * @param res Represents response to client, including a created like object
    */
findAllUsersWhoLikedTuit = async(req: Request, res: Response) => {
  this.likeDao.findAllUsersWhoLikedTuit(req.params.tid)
  .then(likes=>res.json(likes)
  );
}

/**
    * Action performed to find all tuits like by a user 
    * @param req Represents request from client, including the path parameters user id
    * @param res Represents response to client, including a created like object
    */
findAllTuitsLikedByUser = (req: Request, res: Response) => {
  const uid = req.params.uid;
  // @ts-ignore
  const profile = req.session['profile'];
  const userId = uid === "me" && profile ?
    profile._id : uid;

  this.likeDao.findAllTuitsLikedByUser(userId)
    .then(likes => {
      const likesNonNullTuits =
        likes.filter(like => like.tuit);
      const tuitsFromLikes =
        likesNonNullTuits.map(like => like.tuit);
      res.json(tuitsFromLikes);
    });
}


userTogglesTuitLikes = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  const tid = req.params.tid;
  // @ts-ignore
  const profile = req.session['profile'];
  const userId = uid === "me" && profile ?
        profile._id : uid;
  try {
    const userAlreadyLikedTuit = await this.likeDao
        .userLikesTuit(userId, tid);
    const howManyLikedTuit = await this.likeDao
        .countHowManyLikedTuit(tid);
    let tuit = await this.tuitDao.findTuitById(tid);
    if (!userAlreadyLikedTuit) {
      await this.likeDao.userUnlikesTuit(userId, tid);
    } else {
      await this.likeDao.userLikesTuit(userId, tid);
    };
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
}

}