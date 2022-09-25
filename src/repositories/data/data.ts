import { Client } from 'pg';
import { client, parseFieldValue, parseFilter, prepareValue } from '../core';
import {
	CreateDataParams,
	DataModel,
	DeleteDataParams,
	GetDataParams,
	GetTotalCountParams,
	GetTotalCountResponse,
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
		const query = `SELECT name, count, distance, date from ${
			this.#table
		} ${parseFilter(filter)} limit ${limit.count} OFFSET ${start};`;
		const result = await this.#client.query<DataModel>(query);
		console.log(result);
		return result.rows;
	}
	async createData(params: CreateDataParams): Promise<DataModel> {
		const { count, date, distance, name } = params;
		const query = `INSERT INTO ${
			this.#table
		}(name, count, distance, date) values(${prepareValue(name)}, ${prepareValue(
			count
		)}, ${prepareValue(distance)}, ${prepareValue(
			date
		)}) returning id, name, count, distance, date;`;
		const result = await this.#client.query(query);

		return result.rows[0];
	}
	async updateData(params: UpdateDataParams): Promise<DataModel> {
		const { id, ...rest } = params;
		const pairs = Object.entries(rest);
		const updateValues = pairs.map(([field, value]) =>
			parseFieldValue(field, value, '=')
		);
		const query = `UPDATE ${
			this.#table
		} SET ${updateValues.toString()} WHERE id = ${id} RETURNING id, name, count, distance, date;`;
		const result = await this.#client.query<DataModel>(query);
		return result.rows[0];
	}
	async deleteData(params: DeleteDataParams): Promise<number> {
		return params.id;
	}

	async getTotalCount(params: GetTotalCountParams): Promise<number> {
		const { filter } = params;
		const query = `SELECT count(id) as totalCount from ${
			this.#table
		} ${parseFilter(filter)};`;
		const result = await this.#client.query<GetTotalCountResponse>(query);

		return result.rows[0].totalCount;
	}
}

export const dataRepository = new DataRepository(client);
