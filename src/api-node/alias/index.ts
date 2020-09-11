import request from '../../tools/request';

export function fetchByAlias(base: string, alias: string, options: RequestInit = Object.create(null)): Promise<IByAlias> {
	return request({
		base,
		url: `/alias/by-alias/${alias}`,
		options
	});
}

export function fetchByAddress(base: string, address: string, options: RequestInit = Object.create(null)): Promise<IByAddress> {
	return request({
		base,
		url: `/alias/by-address/${address}`,
		options
	});
}

export interface IByAlias {
	address: string;
}

export type IByAddress = Array<string>;