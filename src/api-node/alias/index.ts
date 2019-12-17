import request from '../../tools/request';

export function byAlias(base: string, alias: string): Promise<IByAlias> {
	return request({
		base,
		url: `/alias/by-alias/${alias}`
	});
}

export function byAddress(base: string, address: string): Promise<IByAddress> {
	return request({
		base,
		url: `/alias/by-address/${address}`
	});
}

export interface IByAlias {
	address: string;
}

export type IByAddress = Array<string>;