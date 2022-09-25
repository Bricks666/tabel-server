import * as dotenv from 'dotenv';
import express, { json } from 'express';
import { HOST, PORT } from './consts/server';
import { client } from './repositories/core';
import { dataRepository } from './repositories/data';
import { appRoute } from './routes';
dotenv.config({
	path: '.env.local',
});

const app = express();

app.use(json());

app.use('/', appRoute);

app.listen(PORT, HOST, async () => {
	await client.connect();
	await dataRepository.init();
});
