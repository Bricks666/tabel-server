export type FilterType = 'equal' | 'contain' | 'great' | 'less';
export interface Filter {
	readonly column: string;
	readonly type: FilterType;
	readonly value: string;
}

export interface Limit {
	readonly count: number;
	readonly page: number;
}
