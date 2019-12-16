import { IRequestOptions, TLong } from '../../interface';
import { TDataTransactionEntry } from '@waves/ts-types';
import request from '../../tools/request';
import query from '../../tools/query';


export function dataKey(base: string, address: string, key: string, options?: IRequestOptions): Promise<TDataTransactionEntry<TLong>> {
    return request({
        base,
        url: `/addresses/data/${address}/${encodeURIComponent(key)}`
    });
}

export function scriptInfoMeta(base: string, address: string, options?: IRequestOptions): Promise<IScriptInfoMeta> {
    return request({
        base,
        url: `/addresses/scriptInfo/${address}/meta`
    });
}

export function balanceDetails(base: string, address: string, options?: IRequestOptions): Promise<IBalanceDetails<TLong>> {
    return request({
        base,
        url: `/addresses/balance/details/${address}`
    });
}

export function balanceConfirmations(base: string, address: string, confirmations: number, options?: IRequestOptions): Promise<IBalanceConfirmations<TLong>> {
    return request({
        base,
        url: `/addresses/balance/${address}/${confirmations}`
    });
}

// TODO effectiveBalanceConfirmations
export function scriptInfo(base: string, address: string, options?: IRequestOptions): Promise<IScriptInfo<TLong>> {
    return request({
        base,
        url: `/addresses/scriptInfo/${address}`
    });
}

export function data(base: string, address: string, params: IDataQueryParams = Object.create(null), options?: IRequestOptions): Promise<TDataTransactionEntry<TLong>> {
    return request({
        base,
        url: `/addresses/data/${address}${query(params)}`
    });
}

export function validate(base: string, address: string, options?: IRequestOptions): Promise<{ address: string; valid: boolean }> {
    return request({ base, url: `/addresses/validate/${address}` });
}

export function balance(base: string, address: string, options?: IRequestOptions): Promise<{ address: string; confirmations: number; balance: TLong }> {
    return request({ base, url: `/addresses/balance/${address}` });
}

export function buildAddress(base: string, publicKey: string, options?: IRequestOptions): Promise<{ address: string }> {
    return request({ base, url: `/addresses/publicKey/${publicKey}` });
}

// TODO effectiveBalance

export interface IBalanceConfirmations<LONG> {
    address: string;
    confirmations: number;
    balance: LONG;
}

export interface IScriptInfo<LONG = TLong> {
    address: string;
    complexity: number;
    extraFee: LONG;
    script?: string;
    scriptText?: string;
}

export interface IDataQueryParams {
    matches?: string;
    keys?: string | Array<string>;
}

export interface IBalanceDetails<LONG> {
    address: string;
    regular: LONG;
    generating: LONG;
    available: LONG;
    effective: LONG;
}

export interface IScriptInfoMeta {
    address: string;
    meta: {
        version: string;
        callableFuncTypes: Record<string, Record<string, 'Int' | 'String' | 'Binary'>>
    }
}