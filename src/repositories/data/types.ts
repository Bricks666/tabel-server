import { Filter, Limit } from '../core';

export interface DataModel {
	readonly id: number;
	readonly name: string;
	readonly count: number;
	readonly distance: string;
	readonly date: string;
}

export interface GetDataParams {
	readonly limit: Limit;
	readonly filter?: Filter;
}

export interface UpdateDataParams extends Partial<DataModel> {
	readonly id: number;
}

export interface DeleteDataParams {
	readonly id: number;
}

export interface CreateDataParams extends Omit<DataModel, 'id'> {}

export interface GetTotalCountParams {
	readonly filter?: Filter;
}
