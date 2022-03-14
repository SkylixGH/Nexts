import NextsError from './NextsError';

/**
 * Make interface properties optional.
 */
type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export {
	DeepPartial,
	NextsError,
};
