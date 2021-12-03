import express from 'express';
import { config } from 'dotenv';
import { addUser, findByEmail, getProfileData } from './db.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const hash = async password => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

const generateAccessToken = email => jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  })
};

app.post('/users/join', async (req, res) => {
  const newUser = req.body;
  try {
    newUser.password = await hash(newUser.password);
    const user = await addUser(newUser);
    if(user === 'User already exists') {
      res.status(400).send();
    }
    res.status(201).json(user);
  } catch {
    res.status(500).send();
  }
});

app.post('/users/login', async (req, res) => {
  const user = req.body;

  const dbUser = await findByEmail(user.email);
  if (dbUser.length < 1) {
    return res.status(400).send();
  }
  try {
    const validate = await bcrypt.compare(user.password, dbUser[0].password);
    if (!validate) {
      return res.status(401).send();
    }
    const accessToken = generateAccessToken({email: user.email});
    res.status(200).json({ accessToken, username: dbUser[0].username });
  } catch {
    res.status(500).send();
  }
});

app.get('/users/:name', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const userData = await getProfileData(name);
    res.status(200).send(userData);
  } catch {
    res.status(500).send();
  }
});

app.listen(5000, () => console.log('App is running on port 5000'));
