import {Express, Request, Response} from "express";
import TuitDaoI from "../daos/TuitDao";

export default class TuitController {
  private static tuitController: TuitController | null = null;
  private static tuitDao: TuitDaoI;
  public static getInstance = (app: Express, tuitDao: TuitDaoI): TuitController => {
    if (TuitController.tuitController === null) {
      TuitController.tuitController = new TuitController();
    }
    TuitController.tuitDao = tuitDao;
    app.get('/api/tuits', TuitController.tuitController.findAllTuits);
    app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
    app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByAuthor);
    app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuit);
    app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);

    return TuitController.tuitController;
  }
  private constructor() {}
