import {
	CreateDataParams,
	DataModel,
	dataRepository,
	DataRepository,
	DeleteDataParams,
	GetDataParams,
	GetOneDataParams,
	UpdateDataParams,
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
	async getOneData(params: GetOneDataParams): Promise<DataModel> {
		return await this.#dataRepository.getOneData(params);
	}
	async createData(params: CreateDataParams): Promise<DataModel> {
		return await this.#dataRepository.createData(params);
	}
	async updateData(params: UpdateDataParams): Promise<DataModel> {
		return await this.#dataRepository.updateData(params);
	}
	async deleteData(params: DeleteDataParams): Promise<void> {
		return await this.#dataRepository.deleteData(params);
	}
}

export const dataService = new DataService(dataRepository);
