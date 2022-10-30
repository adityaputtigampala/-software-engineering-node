/**
 * @file Controller RESTful Web service API for Tuit resource
 */
import {Express, Request, Response} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../Models/Tuit";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /tuits/:tid to create a tuit 
 *     </li>
 *     <li>DELETE /tuits to delete a tuit
 *     </li> 
 *     <li>GET /tuits to find all tuits  
 *     </li> 
 *     <li>GET /tuits/:tid to find all tuits by tuit id 
 *     </li> 
 *     <li>GET /users/:uid/tuits to find tuits by user 
 *     </li> 
 *     <li>PUT /tuits/:tid to update a tuit 
 * </ul>
 * @property {app} Express Express implementation of the application
 * @property {tuitDao} tuitDao tuit DAO implementing
 * RESTful Web service API
 */

export default class TuitController implements TuitControllerI {
  app: Express;
  tuitDao: TuitDao;

  constructor(app: Express, tuitDao: TuitDao) {
      this.app = app;
      this.tuitDao = tuitDao;
      this.app.get('/tuits', this.findAllTuits);
      this.app.get('/tuits/:tid', this.findTuitById);
      this.app.get('/users/:uid/tuits', this.findTuitsByUser);
      this.app.post('/tuits', this.createTuit);
      this.app.delete('/tuits/:tid', this.deleteTuit);
      this.app.put('/tuits/:tid', this.updateTuit);
      
  }

 /**
    * Action performed to find all tuits 
    * @param req Represents request from client, including the path for tuits 
    * @param res Represents response to client, including a list of tuits 
    */ 
 findAllTuits = (req: Request, res: Response) => this.tuitDao
    .findAllTuits()
    .then(tuits => res.json(tuits));

  /**
    * Action performed to find tuits based on a tuid id 
    * @param req Represents request from client, including the path for a tuid id 
    * @param res Represents response to client, including a list of tuits 
    */ 
 findTuitById = (req: Request, res: Response) => this.tuitDao
    .findTuitById(req.params.tid)
    .then(tuits => res.json(tuits));

 /**
    * Action performed to find tuits based on a user id 
    * @param req Represents request from client, including the path for user id 
    * @param res Represents response to client, including a list of tuits 
    */ 
findTuitsByUser = (req: Request, res: Response) => this.tuitDao
    .findTuitsByUser(req.params.uid)
    .then(tuits => res.json(tuits));

 /**
    * Action performed to create a tuit 
    * @param req Represents request from client, including the path for tuits 
    * @param res Represents response to client, including a tuit object once created 
    */ 
createTuit = (req: Request, res: Response) =>
    this.tuitDao
      .createTuit(req.body)
      .then(actualTuit => res.json(actualTuit));
  
   /**
    * Action performed to find delete a tuit 
    * @param req Represents request from client, including the path for tuits 
    * @param res Represents response to client, including a response if tuit is deleted 
    */ 
  deleteTuit = (req: Request, res: Response) =>
    this.tuitDao
      .deleteTuit(req.params.tid)
      .then(status => res.json(status));
  
   /**
    * Action performed to update a tuit  
    * @param req Represents request from client, including the path for tuits 
    * @param res Represents response to client, including a new tuit object once updated 
    */ 
  updateTuit = (req: Request, res: Response) =>
    this.tuitDao
      .updateTuit(req.params.tid, req.body)
      .then(status => res.json(status));
}