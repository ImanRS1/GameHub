import express from 'express';
import { getGames, getHomeData, getGenres, getGameByGenre, getGameInfo } from './api.js';
import { getOneGame, getProfileGames, updateRating } from './mongo.js';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/api/games/:searchQuery', getGames);
app.get('/api/home', getHomeData);
app.get('/api/genres', getGenres);
app.get('/api/genre/:id', getGameByGenre);
app.get('/api/game/:id', getOneGame);
app.put('/api/game/:id', updateRating);
app.post('/api/profile-games', getProfileGames);

app.listen(process.env.PORT || 4123, () => console.log('App is running on port 4123'));
