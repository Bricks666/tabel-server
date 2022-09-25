import { Client } from 'pg';
import { client, parseFilter } from '../core';
import {
	CreateDataParams,
	DataModel,
	DeleteDataParams,
	GetDataParams,
	GetTotalCountParams,
	UpdateDataParams,
} from './types';

export class DataRepository {
	readonly #client: Client;
	readonly #table: string;

	constructor(client: Client) {
		this.#client = client;
		this.#table = 'data';
	}
	async init() {
		await this.#client.query(
			`CREATE TABLE IF NOT EXISTS ${this.#table} (
      id serial primary key,
      name text,
      count int,
      distance int,
      date timestamp
    );`
		);
	}

	async getData(params: GetDataParams): Promise<DataModel[]> {
		const { limit, filter } = params;
		const start = limit.count * (limit.page - 1);
		const result = await this.#client.query<DataModel>(
			`SELECT name, count, distance, date from ${this.#table} ${parseFilter(
				filter
			)} limit ${limit.count} OFFSET ${start};`
		);
		console.log(result);
		return result.rows;
	}
	async createData(params: CreateDataParams): Promise<void> {
		console.log(params);
	}
	async updateData(params: UpdateDataParams) {
		console.log(params);
	}
	async deleteData(params: DeleteDataParams) {
		console.log(params);
	}

	async getTotalCount(params: GetTotalCountParams): Promise<number> {
		const { filter } = params;
		const result = await this.#client.query<[number]>(
			`SELECT count(id) from ${this.#table} ${parseFilter(filter)};`
		);

		return result.rows[0][0];
	}
}

export const dataRepository = new DataRepository(client);
