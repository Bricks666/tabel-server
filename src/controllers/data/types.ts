import { FilterType } from '@/repositories/core';
import { DataModel, UpdateDataParams } from '@/repositories/data';

export interface GetDataResponseBody {
	readonly data: DataModel[];
	readonly onPageCount: number;
	readonly totalCount: number;
}

export interface GetDataQuery {
	readonly count?: number;
	readonly page?: number;
	readonly filterBy?: string;
	readonly filterType?: FilterType;
	readonly filterValue?: string;
}

export interface CreateOrUpdateDataResponseBody {
	readonly data: DataModel;
}

export interface UpdateDataRequestBody extends Omit<UpdateDataParams, 'id'> {}

export interface UpdateOrDeleteDataParams {
	readonly id: number;
}
