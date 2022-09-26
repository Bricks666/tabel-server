import { DataModel } from '@/repositories/data';

export interface GetDataResult {
	readonly data: DataModel[];
	readonly totalCount: number;
}
