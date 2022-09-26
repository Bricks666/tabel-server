import * as dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { HOST, PORT } from './consts/server';
import { client } from './repositories/core';
import { dataRepository } from './repositories/data';
import { appRoute } from './routes';
import { errorHandler } from './middlewares/errorHandler';
dotenv.config({
	path: '.env.local',
});

const app = express();

app.use(
	json(),
	cors({
		origin: /localhost/,
	})
);

app.use('/', appRoute);
app.use(errorHandler.handleError);

app.listen(PORT, HOST, async () => {
	await client.connect();
	await dataRepository.init();

	const totalCount = await dataRepository.getTotalCount({});
	if (!totalCount) {
		const requests: Promise<unknown>[] = [];
		for (let i = 0; i < 250; i++) {
			requests.push(
				dataRepository.createData({
					count: faker.datatype.number(),
					distance: faker.datatype.number(),
					date: faker.datatype.datetime().toISOString(),
					name: faker.internet.userName(),
				})
			);
		}

		await Promise.all(requests);
	}
});
