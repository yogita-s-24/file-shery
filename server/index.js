import express from 'express';
import dotenv from "dotenv";
import routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

import path from 'path'

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({extended : true}));
app.use('/', routes);


if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')) }); }

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
