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
    client.release();
    return user.rows;
  } catch {
    return 'User already exists';
  }
};

export const findByEmail = async userEmail => {
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT email, password, username FROM "Users"."Users" WHERE email = $1', [userEmail]);
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
}
