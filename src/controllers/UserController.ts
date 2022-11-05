/**
 * @file Controller RESTful Web service API for User resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTful Web service API for user resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users to create a user 
 *     </li>
 *     <li>DELETE /users/:userid to delete a user 
 *     </li> 
 *     <li>GET /users to find all users   
 *     </li> 
 *     <li>GET /users/:userid to find all users by a user id 
 *     </li> 
 *     <li>PUT /users/:userid to update a user 
 * </ul>
 * @property {app} Express Express implementation of the application
 * @property {userDao} userDao user DAO implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
   app: Express;
   userDao: UserDao;
   constructor(app: Express, userDao: UserDao) {
       this.app = app;
       this.userDao = userDao;
       this.app.get('/api/users', this.findAllUsers);
       this.app.get('/api/users/:userid', this.findUserById);
       this.app.post('/api/users', this.createUser);
       this.app.delete('/api/users/:userid', this.deleteUser);
       this.app.put('/api/users/:userid', this.updateUser);
   }

   /**
    * Action performed to find all users 
    * @param req Represents request from client, including the path for users 
    * @param res Represents response to client, including a list of users 
    */ 
   findAllUsers = (req: Request, res: Response) =>
       this.userDao.findAllUsers()
           .then(users => res.json(users));

   /**
    * Action performed to find users based on used id 
    * @param req Represents request from client, including the path for users with a uid  
    * @param res Represents response to client, including a list of users 
    */ 
   findUserById = (req: Request, res: Response) =>
       this.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));

    /**
    * Action performed to create a user 
    * @param req Represents request from client, including the path for users
    * @param res Represents response to client, including a newly created user object 
    */ 
   createUser = (req: Request, res: Response) =>
       this.userDao.createUser(req.body)
           .then(user => res.json(user));

    /**
    * Action performed to delete a user 
    * @param req Represents request from client, including the path for users 
    * @param res Represents response to client, including an indication if a user is successfully deleted 
    */ 
   deleteUser = (req: Request, res: Response) =>
       this.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));

    /**
    * Action performed to update a user 
    * @param req Represents request from client, including the path for users 
    * @param res Represents response to client, including an updated user object
    */ 
   updateUser = (req: Request, res: Response) => {
        console.log(req.params)
       this.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));}
}
