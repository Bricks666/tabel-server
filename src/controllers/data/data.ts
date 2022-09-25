import { RequestHandler } from 'express';
import { DataService, dataService } from '@/services/data';
import { GetDataQuery, GetDataResponseBody } from './types';
import { Filter } from '@/repositories/core';

export class DataController {
	readonly #dataService: DataService;

	constructor(dataService: DataService) {
		this.#dataService = dataService;
	}

	getData: RequestHandler<
		undefined,
		GetDataResponseBody,
		undefined,
		GetDataQuery
	> = async (req, res) => {
		const {
			page = 1,
			count = 50,
			filterBy,
			filterType,
			filterValue,
		} = req.query;
		let filter: Filter | undefined = undefined;

		if (
			typeof filterBy !== 'undefined' &&
			typeof filterType !== 'undefined' &&
			typeof filterValue !== 'undefined'
		) {
			filter = {
				column: filterBy,
				type: filterType,
				value: filterValue,
			};
		}
		const result = await this.#dataService.getData({
			limit: {
				page,
				count,
			},
			filter,
		});
		res.json({
			...result,
			onPageCount: +count,
		});
	};
	async createData() {
		return undefined;
	}
	async deleteData() {
		return undefined;
	}
	async updateData() {
		return undefined;
	}
}

export const dataController = new DataController(dataService);
