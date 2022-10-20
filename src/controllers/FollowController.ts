import {Express, Request, Response} from "express";
import FollowDao, * as followsDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

export default class FollowController implements FollowControllerI {
  app: Express;
  followDao: FollowDao;

  constructor(app: Express, followDao: FollowDao) { 
      this.app = app;
      this.followDao = followDao;
      this.app.post('/api/users/:follower/follows/:followed', this.userFollowsUser);
      this.app.delete('/api/users/:follower/follows/:followed', this.userUnfollowsUser);
      this.app.get('/api/users/:me/following', this.findWhoIamFollowing);
      this.app.get('/api/users/:who/following', this.findWhoIsFollowingMe);
      
      
      
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
  const me = req.params.followed;
  const who = await this.followDao.findWhoIsFollowingMe(me);
  res.json(me);
}

 findWhoIsFollowingMe = async(req: Request, res: Response) => {
    const me = req.params.followed;
    const who = await this.followDao.findWhoIsFollowingMe(me);
    res.json(who);
}
}