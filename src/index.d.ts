import * as addressesModule from './api-node/addresses';
import * as blocksModule from './api-node/blocks';
import * as transactionsModule from './api-node/transactions';
import * as leasingModule from './api-node/leasing';
import query from './tools/query';
import resolve from './tools/resolve';
import request from './tools/request';
import { IOptions, TMap, TMapTuple } from './tools/transactions/broadcast';
import getAssetIdListByTx from './tools/adresses/getAssetIdListByTx';
import parse from './tools/parse';
import * as toolsUtilsModule from './tools/utils';
import { TTransactionFromAPIMap, TTransactionWithProofs } from '@waves/ts-types';
import { TLong } from './interface';
declare function broadcastWrapped<T extends Array<TTransactionWithProofs<TLong>>>(list: T, options?: Partial<IOptions>): Promise<TMapTuple<T, TTransactionFromAPIMap<TLong>, 'type'>>;
declare function broadcastWrapped<T extends TTransactionWithProofs<TLong>>(tx: T, options?: Partial<IOptions>): Promise<TMap<TTransactionFromAPIMap<TLong>, T['type']>>;
declare type TWrapRecord<T extends Record<string, (base: string, ...args: Array<any>) => any>> = {
    [Key in keyof T]: TWrapApi<T[Key]>;
};
declare type TWrapApi<T extends (base: string, ...args: Array<any>) => any> = T extends (base: string, ...args: infer NEXT) => any ? (...args: NEXT) => ReturnType<T> : never;
export declare function create(base: string): {
    addresses: TWrapRecord<typeof addressesModule>;
    blocks: TWrapRecord<typeof blocksModule>;
    transactions: TWrapRecord<typeof transactionsModule>;
    leasing: TWrapRecord<typeof leasingModule>;
    tools: {
        transactions: {
            broadcast: typeof broadcastWrapped;
            wait: (tx: (import("@waves/ts-types").IIssueTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ITransferTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IReissueTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IBurnTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ILeaseTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ICancelLeaseTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IAliasTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IMassTransferTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IDataTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ISetScriptTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ISponsorshipTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IExchangeTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ISetAssetScriptTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IInvokeScriptTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | import("@waves/ts-types").TTransactionFromAPI<TLong>[], options?: import("./tools/transactions/wait").IWaitOptions | undefined) => Promise<(import("@waves/ts-types").IIssueTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ITransferTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IReissueTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IBurnTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ILeaseTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ICancelLeaseTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IAliasTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IMassTransferTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IDataTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ISetScriptTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ISponsorshipTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IExchangeTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").ISetAssetScriptTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | (import("@waves/ts-types").IInvokeScriptTransaction<TLong> & import("@waves/ts-types").IWithApiMixin) | import("@waves/ts-types").TTransactionFromAPI<TLong>[]>;
        };
        blocks: {
            getNetworkByte: () => Promise<number>;
            getNetworkCode: () => Promise<string>;
        };
        addresses: {
            createWatch: (address: string, interval?: number | undefined) => Promise<import("./tools/adresses/watch").Watch>;
            getAssetsByTransaction: (tx: import("@waves/ts-types").IIssueTransaction<TLong> | import("@waves/ts-types").ITransferTransaction<TLong> | import("@waves/ts-types").IReissueTransaction<TLong> | import("@waves/ts-types").IBurnTransaction<TLong> | import("@waves/ts-types").ILeaseTransaction<TLong> | import("@waves/ts-types").ICancelLeaseTransaction<TLong> | import("@waves/ts-types").IAliasTransaction<TLong> | import("@waves/ts-types").IMassTransferTransaction<TLong> | import("@waves/ts-types").IDataTransaction<TLong> | import("@waves/ts-types").ISetScriptTransaction<TLong> | import("@waves/ts-types").ISponsorshipTransaction<TLong> | import("@waves/ts-types").IExchangeTransaction<TLong> | import("@waves/ts-types").ISetAssetScriptTransaction<TLong> | import("@waves/ts-types").IInvokeScriptTransaction<TLong> | import("@waves/ts-types").TTransaction<TLong>[]) => Promise<Record<string, import("./api-node/assets").TAssetDetails<TLong>>>;
            getAssetIdListByTx: typeof getAssetIdListByTx;
            getTransactionsWithAssets: (address: string, limit: number, after?: string | undefined) => Promise<{
                transactions: import("@waves/ts-types").TTransactionFromAPI<TLong>[];
                assets: Record<string, import("./api-node/assets").TAssetDetails<TLong>>;
            }>;
            availableSponsoredBalances: (address: string, wavesFee: TLong) => Promise<import("./tools/adresses/availableSponsoredBalances").TAssetFeeInfo[]>;
        };
        utils: typeof toolsUtilsModule;
        query: typeof query;
        resolve: typeof resolve;
        request: typeof request;
        parse: typeof parse;
    };
};
export default create;
