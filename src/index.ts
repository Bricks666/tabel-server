import * as dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { ORIGIN_URL, HOST, PORT } from './consts/server';
import { client } from './repositories/core';
import { dataRepository } from './repositories/data';
import { appRoute } from './routes';
import { errorHandler } from './middlewares/errorHandler';
dotenv.config({
	path: '.env',
});
console.log(process.env);
const app = express();

app.use(
	json(),
	cors({
		origin: ORIGIN_URL,
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
