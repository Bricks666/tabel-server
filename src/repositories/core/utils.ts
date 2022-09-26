import { AllowedType, Filter, FilterType } from './types';

const sightMap: Record<FilterType, string> = {
	contain: 'like',
	equal: '=',
	great: '>',
	less: '<',
};

export const parseFieldValue = (
	field: string,
	value: AllowedType,
	separator: string
): string => {
	return `${field} ${separator} ${prepareValue(value)}`;
};

export const parseFilter = (filter?: Filter): string => {
	if (!filter) {
		return '';
	}
	const sight = sightMap[filter.type];
	const value = sight === 'like' ? `%${filter.value}%` : filter.value;
	return `where ${parseFieldValue(filter.column, value, sight)}`;
};

export const prepareValue = (value: AllowedType): string => {
	if (typeof value === 'string') {
		return JSON.stringify(value).replace(/"/g, '\'');
	}

	return value.toString();
};
