import {Express, Request, Response} from "express";
import { request } from "http";
import FollowDao, * as followsDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

export default class FollowController implements FollowControllerI {
  app: Express;
  followDao: FollowDao;

  constructor(app: Express, followDao: FollowDao) { 
      this.app = app;
      this.followDao = followDao;
      this.app.post('/users/:follower/follows/:followed', this.userFollowsUser);
      this.app.delete('/users/:follower/follows/:followed', this.userUnfollowsUser);
      this.app.get('/users/:me/following', this.findWhoIamFollowing);
      this.app.get('/users/:who/following', this.findWhoIsFollowingMe);
      this.app.get('/users/:me/following/count', this.findWhoIamFollowingCount);
      this.app.get('/users/:who/follower/count', this.findWhoIsFollowingMeCount);
      
      
      
  }

 userFollowsUser = async (req: Request, res: Response) => {
    const follower = req.params.follower;
    const followed = req.params.followed;
    const follow = await this.followDao.userFollowsUser(
      follower, followed  
    );
    res.json(follow);
}

 userUnfollowsUser = async (req: Request, res: Response) => {
    const follower = req.params.follower;
    const followed = req.params.followed;
    const status = await this.followDao.userUnfollowsUser(
      follower, followed  
    );
    res.json(status);
}

findWhoIamFollowing = async(req: Request, res: Response) => {
  const me = req.params.me;
  const who = await this.followDao.findWhoIamFollowing(me);
  res.json(who);
}

 findWhoIsFollowingMe = async(req: Request, res: Response) => {
    const me = req.params.followed;
    const who = await this.followDao.findWhoIsFollowingMe(me);
    res.json(who);
}

findWhoIamFollowingCount = async(req: Request, res: Response) => {
  const me = req.params.me;
  const who = await this.followDao.findWhoIamFollowingCount(me);
  res.json(who);
}

findWhoIsFollowingMeCount = async(req: Request, res: Response) => {
  const me = req.params.who;
  const who = await this.followDao.findWhoIsFollowingMeCount(me);
  console.log(who, "who")
  res.json(who);
}
}