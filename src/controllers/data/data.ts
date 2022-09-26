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
	> = async (req, res, next) => {
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
		try {
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
		} catch (err) {
			next(err);
		}
	};

	createData: RequestHandler<
		undefined,
		CreateOrUpdateDataResponseBody,
		CreateDataParams
	> = async (req, res, next) => {
		try {
			const result = await this.#dataService.createData(req.body);
			res.json({
				data: result,
			});
		} catch (err) {
			next(err);
		}
	};
	updateData: RequestHandler<
		UpdateOrDeleteDataParams,
		CreateOrUpdateDataResponseBody,
		UpdateDataRequestBody
	> = async (req, res, next) => {
		const { id } = req.params;
		try {
			const result = await this.#dataService.updateData({ id, ...req.body });

			res.json({
				data: result,
			});
		} catch (err) {
			next(err);
		}
	};

	deleteData: RequestHandler<UpdateOrDeleteDataParams> = async (
		req,
		res,
		next
	) => {
		const { id } = req.params;
		try {
			await this.#dataService.deleteData({ id });
			res.end();
		} catch (err) {
			next(err);
		}
	};

	getOneData: RequestHandler<
		UpdateOrDeleteDataParams,
		CreateOrUpdateDataResponseBody
	> = async (req, res, next) => {
		const { id } = req.params;
		try {
			const result = await this.#dataService.getOneData({ id });
			res.json({
				data: result,
			});
		} catch (err) {
			next(err);
		}
	};
}

export const dataController = new DataController(dataService);
