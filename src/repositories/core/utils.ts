import { Filter, FilterType } from './types';

const sightMap: Record<FilterType, string> = {
	contain: 'like',
	equal: '=',
	great: '>',
	less: '<',
};

export const parseFieldValue = (
	field: string,
	value: string,
	separator: string
): string => {
	return `${JSON.stringify(field)} ${separator} ${value}`;
};

export const parseFilter = (filter?: Filter): string => {
	if (!filter) {
		return '';
	}

	return `where ${parseFieldValue(
		filter.column,
		filter.value,
		sightMap[filter.type]
	)}`;
};
