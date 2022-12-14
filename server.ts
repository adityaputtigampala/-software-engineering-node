/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import UserDao from './src/daos/UserDao';
import TuitController from './src/controllers/TuitController';
import TuitDao from './src/daos/TuitDao';
import UserController from './src/controllers/UserController';
import followsController from './src/controllers/FollowController';
import FollowController from './src/controllers/FollowController';
import FollowDao from './src/daos/FollowDao';
import BookmarkController from './src/controllers/BookmarkController';
import BookmarkDao from './src/daos/BookmarkDao';
import MessageController from './src/controllers/MessageController';
import MessageDao from './src/daos/MessageDao';
import LikeController from './src/controllers/LikeController';
import LikeDao from './src/daos/LikeDao';
import AuthenticationController from './src/controllers/auth-controller';

//import db from './src/db/db';
const cors = require('cors')
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const session = require("express-session");
let sess = {
  secret: process.env.SECRET,
  cookie: {
      secure: false
  }
}

if (process.env.ENV === 'PRODUCTION') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

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
  //mongoose.connect('mongodb://localhost:27017/FSD', options);
  
  const url:string | any = process.env.MONGOURL
  mongoose.connect(url, options)

const PORT = 4000;
app.listen(process.env.PORT || PORT);

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
const followController = new FollowController(app, new FollowDao());
const bookmarkController = new BookmarkController(app, new BookmarkDao());
const messageController = new MessageController(app, new MessageDao());
const likeController = new LikeController(app, new LikeDao(), new TuitDao);
AuthenticationController(app);