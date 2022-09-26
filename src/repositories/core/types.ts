export type FilterType = 'equal' | 'contain' | 'great' | 'less';
export interface Filter {
	readonly column: string;
	readonly type: FilterType;
	readonly value: AllowedType;
}

export interface Limit {
	readonly count: number;
	readonly page: number;
}

export type AllowedType = string | number | boolean;
