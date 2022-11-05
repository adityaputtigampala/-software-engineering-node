/**
 * @file Controller RESTful Web service API for Follow resource
 */
import {Express, Request, Response} from "express";
import { request } from "http";
import FollowDao, * as followsDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:follower/follows/:followed to record that a user follows another user
 *     </li>
 *     <li>DELETE /users/:follower/follows/:followed to capture a user unfollowing another user 
 *     </li> 
 *     <li>GET /users/:me/following to get all users I am following
 *     </li>
 *     <li>GET /users/:who/following to get all users following me(current user)
 *     </li>
 *     <li>GET /users/:me/following/count to get the count of users I am following
 *     </li>
 *     <li>GET //users/:who/follower/count to get the count of users who are following me</li>
 * </ul>
 * @property {app} Express Express implementation of the application
 * @property {bookmarkDao} BookmarkDao Bookmark DAO implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
  app: Express;
  followDao: FollowDao;

  /**
    * Follow controller class implemented using express and Follw DAO
    * @param app the express implementation of the app 
    * @param followDao logic where the follow implementation is defined 
    */
  constructor(app: Express, followDao: FollowDao) { 
      this.app = app;
      this.followDao = followDao;
      this.app.post('/api/users/:follower/follows/:followed', this.userFollowsUser);
      this.app.delete('/api/users/:follower/follows/:followed', this.userUnfollowsUser);
      this.app.get('/api/users/:me/following', this.findWhoIamFollowing);
      this.app.get('/api/users/:who/following', this.findWhoIsFollowingMe);
      this.app.get('/api/users/:me/following/count', this.findWhoIamFollowingCount);
      this.app.get('/api/users/:who/follower/count', this.findWhoIsFollowingMeCount);
      
      
      
  }
  
/**
    * Action performed when a user follows another user 
    * @param req Represents request from client, including the path parameters follower and followed 
    * @param res Represents response to client, including a created follow object
    */
 userFollowsUser = async (req: Request, res: Response) => {
    const follower = req.params.follower;
    const followed = req.params.followed;
    const follow = await this.followDao.userFollowsUser(
      follower, followed  
    );
    res.json(follow);
}

/**
    * Action performed when a user unfollows another user 
    * @param req Represents request from client, including the path parameters follower and followed 
    * @param res Represents response to client, including a removed follow object
    */
 userUnfollowsUser = async (req: Request, res: Response) => {
    const follower = req.params.follower;
    const followed = req.params.followed;
    const status = await this.followDao.userUnfollowsUser(
      follower, followed  
    );
    res.json(status);
}

/**
    * Action performed to find users who I am following 
    * @param req Represents request from client, including the path parameters follower and followed 
    * @param res Represents response to client, including a created follow object
    */
findWhoIamFollowing = async(req: Request, res: Response) => {
  const me = req.params.me;
  const who = await this.followDao.findWhoIamFollowing(me);
  res.json(who);
}

/**
    * Action performed to find users who are following me
    * @param req Represents request from client, including the path parameters followed
    * @param res Represents response to client, including a created follow object
    */
 findWhoIsFollowingMe = async(req: Request, res: Response) => {
    const me = req.params.followed;
    const who = await this.followDao.findWhoIsFollowingMe(me);
    res.json(who);
}

/**
    * Action performed to find count of users I am following 
    * @param req Represents request from client, including the path parameters me
    * @param res Represents response to client, including a created follow object
    */
findWhoIamFollowingCount = async(req: Request, res: Response) => {
  const me = req.params.me;
  const who = await this.followDao.findWhoIamFollowingCount(me);
  res.json(who);
}

/**
    * Action performed to find count of users who are following me 
    * @param req Represents request from client, including the path parameters me
    * @param res Represents response to client, including a created follow object
    */
findWhoIsFollowingMeCount = async(req: Request, res: Response) => {
  const me = req.params.who;
  const who = await this.followDao.findWhoIsFollowingMeCount(me);
  console.log(who, "who")
  res.json(who);
}
}