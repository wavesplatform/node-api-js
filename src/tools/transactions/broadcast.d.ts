import { TTransactionFromAPIMap, TTransactionWithProofs } from '@waves/ts-types';
import { TLong } from '../../interface';
export declare type TMap<MAP extends Record<string | number, any>, Key extends keyof MAP> = MAP[Key];
export declare type TMapTuple<T extends Array<Record<string | number, any>>, TO_MAP extends Record<string | number, Record<string | number, any>>, KEY> = {
    [K in keyof T]: T[K] extends never ? never : KEY extends keyof T[K] ? T[K][KEY] extends infer R ? R extends keyof TO_MAP ? TO_MAP[R] : never : never : never;
};
export default function <T extends Array<TTransactionWithProofs<TLong>>>(base: string, list: T): Promise<TMapTuple<T, TTransactionFromAPIMap<TLong>, 'type'>>;
export default function <T extends TTransactionWithProofs<TLong>>(base: string, tx: T, options?: Partial<IOptions>): Promise<TMap<TTransactionFromAPIMap<TLong>, T['type']>>;
export interface IOptions {
    chain: boolean;
    confirmations: number;
    maxWaitTime: number;
    requestInterval: number;
}
