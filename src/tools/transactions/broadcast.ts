import { TTransactionFromAPI, TTransactionFromAPIMap, TTransactionWithProofs } from '@waves/ts-types';
import { TLong } from '../../interface';
import { fetchBroadcast } from '../../api-node/transactions';
import { head, toArray } from '../utils';
import wait from './wait';


const DEFAULT_BROADCAST_OPTIONS: IOptions = {
    chain: false,
    confirmations: -1,
    maxWaitTime: 0,
    requestInterval: 0
};

export type TMap<MAP extends Record<string | number, any>, Key extends keyof MAP> = MAP[Key];
export type TMapTuple<T extends Array<Record<string | number, any>>, TO_MAP extends Record<string | number, Record<string | number, any>>, KEY> = {
    [K in keyof T]: T[K] extends never ? never : KEY extends keyof T[K] ? T[K][KEY] extends infer R ? R extends keyof TO_MAP ? TO_MAP[R] : never : never : never;
}


export default function <T extends Array<TTransactionWithProofs<TLong>>>(base: string, list: T): Promise<TMapTuple<T, TTransactionFromAPIMap<TLong>, 'type'>>;
export default function <T extends TTransactionWithProofs<TLong>>(base: string, tx: T, options?: Partial<IOptions>): Promise<TMap<TTransactionFromAPIMap<TLong>, T['type']>>;
export default function (base: string, list: TTransactionWithProofs<TLong> | Array<TTransactionWithProofs<TLong>>, options?: Partial<IOptions>): Promise<TTransactionFromAPI<TLong> | Array<TTransactionFromAPI<TLong>>> {
    const opt = { ...DEFAULT_BROADCAST_OPTIONS, ...(options || {}) };
    const isOnce = !Array.isArray(list);
    const confirmations = opt.confirmations > 0 ? 1 : 0;

    return (opt.chain
        ? chainBroadcast(base, toArray(list), { ...opt, confirmations })
        : simpleBroadcast(base, toArray(list)))
        .then(list => opt.confirmations <= 0 ? list : wait(base, list, opt))
        .then(list => isOnce ? head(list) as TTransactionFromAPI<TLong> : list);
}

function simpleBroadcast(base: string, list: Array<TTransactionWithProofs<TLong>>): Promise<Array<TTransactionFromAPI<TLong>>> {
    return Promise.all(list.map(tx => fetchBroadcast(base, tx)));
}

function chainBroadcast(base: string, list: Array<TTransactionWithProofs<TLong>>, options: IOptions): Promise<Array<TTransactionFromAPI<TLong>>> {
    return new Promise<Array<TTransactionFromAPI<TLong>>>((resolve, reject) => {
        const toBroadcast = list.slice().reverse();
        const result: Array<TTransactionFromAPI<TLong>> = [];

        const loop = () => {
            if (!toBroadcast.length) {
                resolve(result);
                return null;
            }

            const tx = toBroadcast.pop() as TTransactionWithProofs<TLong>;
            fetchBroadcast(base, tx)
                .then(tx => wait(base, tx, options))
                .then(tx => {
                    result.push(tx);
                    loop();
                }, reject);
        };

        loop();
    });
}

export interface IOptions {
    chain: boolean;
    confirmations: number;
    maxWaitTime: number;
    requestInterval: number;
}