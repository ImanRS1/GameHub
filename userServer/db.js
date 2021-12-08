import { config } from 'dotenv';
import * as pg from 'pg'
const { Pool } = pg.default;

config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
});

export const addUser = async userData => {
  try {
    const client = await pool.connect();
    const user = await client.query('INSERT INTO "Users"."Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *', [userData.username, userData.email, userData.password]);

    await client.query(`CREATE TABLE "Users"."${userData.username}" (id serial PRIMARY KEY, gameId INT UNIQUE NOT NULL, gameName VARCHAR (255) NOT NULL, status VARCHAR (50) NOT NULL)`);

    client.release(true);
    return user.rows;
  } catch {
    client.release(true);
    return 'User already exists';
  }
};

export const findByEmail = async userEmail => {
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM "Users"."Users" WHERE email = $1', [userEmail]);
    client.release(true);
    return user.rows;
  } catch {
    client.release(true);
    return 'User not found';
  }
}

export const getProfileData = async username => {
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT email, username, avatar FROM "Users"."Users" WHERE username = $1', [username]);
    client.release(true);
    return user.rows;
  } catch {
    client.release(true);
    return 'Ooops, something went wrong';
  }
};

export const fetchGameList = async username => {
  try {
    const client = await pool.connect();
    const games = await client.query(`SELECT * FROM "Users"."${username}"`);
    if (!games.rows) {
      return 'No games';
    }
    client.release(true);
    return user.rows;
  } catch {
    client.release(true);
    return 'Ooops, something went REALLY wrong';
  }
};

export const updateGameList = async (username, gameId, gameName, status) => {
  try {
    const client = await pool.connect();
    const updatedGame = await client.query(`SELECT * FROM "Users"."${username}" WHERE gameid = $1`, [gameId]);
    if (updatedGame.rows.length === 0) {
      await client.query(`INSERT INTO "Users"."${username}" (gameid, gamename, status) VALUES ($1, $2, $3)`, [gameId, gameName, status]);
      client.release(true);
      return;
    }
    if (!updatedGame) {
      client.release(true);
      return;
    }
    await client.query(`UPDATE "Users"."${username}" SET status = $1 WHERE gameid = $2`, [status, gameId]);
    client.release(true);
    return;
  } catch {
    client.release(true);
    return 'Ooops, something went SUPER wrong';
  }
}

export const getGameStatus = async (username, gameId) => {
  try {
    const client = await pool.connect();
    const gameStatus = await client.query(`SELECT * FROM "Users"."${username}" WHERE gameid = $1`, [gameId]);
    if (gameStatus.rows.length === 0) {
      client.release(true);
      return;
    }
    if (!gameStatus) {
      client.release(true);
      return;
    }
    client.release(true);
    return gameStatus.rows[0].status;
  } catch {
    client.release(true);
    return 'Ooops, something went very very wrong';
  }
}

export const getUserGames = async (username) => {
  try {
    const client = await pool.connect();
    const userGames = await client.query(`SELECT gameid, status FROM "Users"."${username}"`);
    if (userGames.rows.length === 0) {
      client.release(true);
      return;
    }
    if (!userGames) {
      client.release(true);
      return;
    }
    client.release(true);
    return userGames.rows;
  } catch {
    client.release(true);
    return 'Ooops, something went very very very wrong';
  }
}
