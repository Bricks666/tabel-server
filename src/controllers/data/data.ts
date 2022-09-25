import { RequestHandler } from 'express';
import { DataService, dataService } from '@/services/data';
import {
	CreateOrUpdateDataResponseBody,
	GetDataQuery,
	GetDataResponseBody,
	UpdateDataRequestBody,
	UpdateOrDeleteDataParams,
} from './types';
import { Filter } from '@/repositories/core';
import { CreateDataParams } from '@/repositories/data';

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

	createData: RequestHandler<
		undefined,
		CreateOrUpdateDataResponseBody,
		CreateDataParams
	> = async (req, res) => {
		const result = await this.#dataService.createData(req.body);
		res.json({
			data: result,
		});
	};
	updateData: RequestHandler<
		UpdateOrDeleteDataParams,
		CreateOrUpdateDataResponseBody,
		UpdateDataRequestBody
	> = async (req, res) => {
		const { id } = req.params;
		const result = await this.#dataService.updateData({ id, ...req.body });

		res.json({
			data: result,
		});
	};

	deleteData: RequestHandler<UpdateOrDeleteDataParams> = async (req, res) => {
		const { id } = req.params;
		await this.#dataService.deleteData({ id });
		res.end();
	};
}

export const dataController = new DataController(dataService);
