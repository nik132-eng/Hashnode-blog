import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import Router from './routes/routes.js'

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({
  extended: true,
  })
 );
app.use(cors());

Connection();

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.use('/', Router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
