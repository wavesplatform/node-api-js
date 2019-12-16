import { IRequestOptions, TLong } from '../../interface';
import { TDataTransactionEntry } from '@waves/ts-types';
export declare function dataKey(base: string, address: string, key: string, options?: IRequestOptions): Promise<TDataTransactionEntry<TLong>>;
export declare function scriptInfoMeta(base: string, address: string, options?: IRequestOptions): Promise<IScriptInfoMeta>;
export declare function balanceDetails(base: string, address: string, options?: IRequestOptions): Promise<IBalanceDetails<TLong>>;
export declare function balanceConfirmations(base: string, address: string, confirmations: number, options?: IRequestOptions): Promise<IBalanceConfirmations<TLong>>;
export declare function scriptInfo(base: string, address: string, options?: IRequestOptions): Promise<IScriptInfo<TLong>>;
export declare function data(base: string, address: string, params?: IDataQueryParams, options?: IRequestOptions): Promise<TDataTransactionEntry<TLong>>;
export declare function validate(base: string, address: string, options?: IRequestOptions): Promise<{
    address: string;
    valid: boolean;
}>;
export declare function balance(base: string, address: string, options?: IRequestOptions): Promise<{
    address: string;
    confirmations: number;
    balance: TLong;
}>;
export declare function buildAddress(base: string, publicKey: string, options?: IRequestOptions): Promise<{
    address: string;
}>;
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
        callableFuncTypes: Record<string, Record<string, 'Int' | 'String' | 'Binary'>>;
    };
}
