import express from 'express';
import { getGames, getHomeData, getGenres, getGameByGenre, getGameInfo } from './api.js';
import { getOneGame, getProfileGames, updateRating, updateReview } from './mongo.js';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const corsCaller = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
};

app.get('/api/games/:searchQuery', getGames);
app.get('/api/home', getHomeData);
app.get('/api/genres', getGenres);
app.get('/api/genre/:id', getGameByGenre);
app.get('/api/game/:id', corsCaller, getOneGame);
app.put('/api/game/:id', updateRating);
app.put('/api/review/:id', updateReview);
app.post('/api/profile-games', getProfileGames);

app.listen(process.env.PORT || 4123, () => console.log('App is running on port 4123'));
