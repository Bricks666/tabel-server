import {
	dataRepository,
	DataRepository,
	GetDataParams,
} from '@/repositories/data';
import { GetDataResult } from './types';

export class DataService {
	readonly #dataRepository: DataRepository;

	constructor(dataRepository: DataRepository) {
		this.#dataRepository = dataRepository;
	}

	async getData(params: GetDataParams): Promise<GetDataResult> {
		const data = await this.#dataRepository.getData(params);
		const totalCount = await this.#dataRepository.getTotalCount(params);

		return {
			data,
			totalCount,
		};
	}
	async createData() {}
	async updateData() {}
	async deleteData() {}
}

export const dataService = new DataService(dataRepository);