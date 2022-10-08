/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import UserDao from './src/daos/UserDao';
import TuitController from './src/controllers/TuitController';
import TuitDao from './src/daos/TuitDao';
import UserController from './src/controllers/UserController';

//import db from './src/db/db';
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
//require('dotenv').config()

//db.on("error", console.error.bind(console, "MongoDB connection error."));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */

 const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  }
  //const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/FSD', options);

const PORT = 4000;
app.listen(process.env.PORT || PORT);

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
