import { TLong } from '../../interface';
import { broadcast } from '../../api-node/transactions';
import { head, toArray } from '../utils';
import wait from './wait';
import { Long, SignedTransaction, Transaction, TransactionMap, WithApiMixin } from '@waves/ts-types';


const DEFAULT_BROADCAST_OPTIONS: IOptions = {
    chain: false,
    confirmations: -1,
    maxWaitTime: 0,
    requestInterval: 0
};

export type TMap<MAP extends Record<string | number, any>, Key extends keyof MAP> = MAP[Key];
export type TMapTuple<T extends Array<Record<string | number, any>>,
    TO_MAP extends Record<string | number, Record<string | number, any>>, KEY> =
    {
        [K in keyof T]: KEY extends keyof T[K]
        ? T[K][KEY] extends infer R
            ? R extends keyof TO_MAP
                ? TO_MAP[R]
                : never
            : never
        : never;
    }


export default function <T extends Array<SignedTransaction<Transaction<TLong>>>>(base: string, list: T): Promise<TMapTuple<T, TransactionMap, 'type'> & WithApiMixin>;
export default function <T extends Transaction<TLong>>(base: string, tx: SignedTransaction<T>, options?: Partial<IOptions>): Promise<TMap<TransactionMap<TLong>, T['type']> & WithApiMixin>;
export default function (base: string, list: SignedTransaction<Transaction<TLong>> | Array<SignedTransaction<Transaction<TLong>>>, options?: Partial<IOptions>): Promise<any> {
    const opt = { ...DEFAULT_BROADCAST_OPTIONS, ...(options || {}) };
    const isOnce = !Array.isArray(list);
    const confirmations = opt.confirmations > 0 ? 1 : 0;

    return (
        opt.chain
            ? chainBroadcast(base, toArray(list), { ...opt, confirmations })
            : simpleBroadcast(base, toArray(list))
    )
        .then(list => opt.confirmations <= 0 ? list : wait(base, list, opt))
        .then(list => isOnce ? head(list) as Transaction & WithApiMixin : list);
}


type TWithApiMixinList<T> = T extends Array<Transaction<TLong>>
    ? { [Key in keyof T]: T[Key] & WithApiMixin }
    : never;

function simpleBroadcast<T extends Array<SignedTransaction<Transaction<TLong>>>>(base: string, list: T): Promise<TWithApiMixinList<T>> {
    return Promise.all(list.map(tx => broadcast(base, tx))) as Promise<TWithApiMixinList<T>>;
}

function chainBroadcast(base: string, list: Array<Transaction<TLong>>, options: IOptions): Promise<Array<Transaction<Long> & WithApiMixin>> {
    return new Promise<Array<Transaction & WithApiMixin>>((resolve, reject) => {
        const toBroadcast = list.slice().reverse();
        const result: Array<Transaction<Long> & WithApiMixin> = [];

        const loop = () => {
            if (!toBroadcast.length) {
                resolve(result);
                return null;
            }

            const tx = toBroadcast.pop() as SignedTransaction<Transaction<TLong>>;
            broadcast(base, tx)
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
