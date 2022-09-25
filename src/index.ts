import express, { json } from 'express';
import { HOST, PORT } from './consts/server';
import appRoute from './routes';

const app = express();

app.use(json());

app.use('/', appRoute)

app.listen(PORT, HOST);
