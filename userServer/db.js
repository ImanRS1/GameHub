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
});

export const addUser = async userData => {
  try {
    const client = await pool.connect();
    const user = await client.query('INSERT INTO "Users"."Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *', [userData.username, userData.email, userData.password]);

    await client.query(`CREATE TABLE "Users"."${userData.username}" (id serial PRIMARY KEY, gameId INT UNIQUE NOT NULL, gameName VARCHAR (255) NOT NULL, status VARCHAR (50) NOT NULL)`);

    client.release();
    return user.rows;
  } catch {
    return 'User already exists';
  }
};

export const findByEmail = async userEmail => {
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM "Users"."Users" WHERE email = $1', [userEmail]);
    client.release();
    return user.rows;
  } catch {
    return 'User not found';
  }
}

export const getProfileData = async username => {
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT email, username, avatar FROM "Users"."Users" WHERE username = $1', [username]);
    client.release();
    return user.rows;
  } catch {
    return 'Ooops, something went wrong';
  }
};

export const fetchGameList = async username => {
  try {
    const client = await pool.connect();

    const games = await client.query(`SELECT * FROM "Users"."${username}"`);
    if (!games.rows) {
      console.log('no games');
    }
    client.release();
    return user.rows;
  } catch {
    return 'Ooops, something went REALLY wrong';
  }
};

export const updateGameList = async (username, gameId, gameName, status) => {
  try {
    const client = await pool.connect();
    const updatedGame = await client.query(`SELECT * FROM "Users"."${username}" WHERE gameid = $1`, [gameId]);
    if (updatedGame.rows.length === 0) {
      await client.query(`INSERT INTO "Users"."${username}" (gameid, gamename, status) VALUES ($1, $2, $3)`, [gameId, gameName, status]);
      client.release();
      return;
    }
    await client.query(`UPDATE "Users"."${username}" SET status = $1`, [status]);
    client.release();
    return;
  } catch {
    return 'Ooops, something went SUPER wrong';
  }
}

export const getGameStatus = async (username, gameId) => {
  try {
    const client = await pool.connect();
    const gameStatus = await client.query(`SELECT * FROM "Users"."${username}" WHERE gameid = $1`, [gameId]);
    if (gameStatus.rows.length === 0) {
      client.release();
      return;
    }
    client.release();
    return gameStatus.rows[0].status;
  } catch {
    return 'Ooops, something went very very wrong';
  }
}
