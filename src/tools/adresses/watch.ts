import { transactions } from '../../api-node/transactions';
import { TTransactionFromAPI } from '@waves/ts-types';
import { TLong } from '../../interface';
import { indexBy, keys, prop } from '../utils';
import { EventEmitter } from 'typed-ts-events';


export class Watch {

    public readonly address: string;
    private readonly _base: string;
    private readonly _interval: number;
    private readonly _emitter: EventEmitter<IEvents> = new EventEmitter();
    private _lastBlock: ILastBlockInfo;
    private _timer: ReturnType<typeof setTimeout> | null = null;


    constructor(base: string, address: string, tx: TTransactionFromAPI<TLong> | null, interval?: number) {
        this.address = address;
        this._interval = interval || 1000;
        this._base = base;
        this._lastBlock = {
            lastId: tx?.id || '',
            height: tx?.height || 0,
            transactions: tx ? [tx] : []
        };

        this._addTimeout();
    }

    public on<K extends keyof IEvents>(event: K, handler: EventEmitter.IHandler<IEvents[K], any>): void {
        this._emitter.on(event, handler);
    }

    public once<K extends keyof IEvents>(event: K, handler: EventEmitter.IHandler<IEvents[K], any>): void {
        this._emitter.once(event, handler);
    }

    public off(event?: keyof IEvents, handler?: EventEmitter.IHandler<IEvents[keyof IEvents], any>): void {
        this._emitter.off(event, handler);
    }

    private _run() {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        const onError = () => this._addTimeout();

        transactions(this._base, this.address, 1)
            .then(([tx]) => {

                if (!tx) {
                    this._addTimeout();
                    return null;
                }

                this.getTransactionsInHeight(tx, 310)
                    .then(list => {

                        const hash = Watch._groupByHeight(list);
                        const heightList = keys(hash)
                            .map(Number)
                            .sort((a, b) => b - a);
                        const [last, prev] = heightList;

                        if (!this._lastBlock.height) {
                            this._lastBlock = {
                                height: last,
                                lastId: hash[prev] && hash[prev].length ? hash[prev][0].id : '',
                                transactions: hash[last]
                            };
                            this._emitter.trigger('change-state', list);
                        } else {
                            const wasDispatchHash = indexBy(prop('id'), this._lastBlock.transactions);
                            const toDispatch = Watch._getTransactionsToDispatch([...hash[last], ...(hash[prev] || [])], wasDispatchHash, this._lastBlock.lastId);

                            if (this._lastBlock.height !== last) {
                                this._lastBlock = {
                                    height: last,
                                    lastId: hash[prev] && hash[prev].length ? hash[prev][0].id : '',
                                    transactions: hash[last]
                                };
                            } else {
                                this._lastBlock.transactions.push(...toDispatch);
                            }

                            if (toDispatch.length) {
                                this._emitter.trigger('change-state', toDispatch);
                            }
                        }
                        this._addTimeout();
                    }, onError);

            })
            .catch(onError);
    }

    private getTransactionsInHeight(from: TTransactionFromAPI<TLong>, limit: number): Promise<Array<TTransactionFromAPI<TLong>>> {
        const height = from.height as number;

        const loop = (downloaded: Array<TTransactionFromAPI<TLong>>): Promise<Array<TTransactionFromAPI<TLong>>> => {

            if (downloaded.length >= limit) {
                return Promise.resolve(downloaded);
            }

            return transactions(this._base, this.address, downloaded.length + 100).then(list => {
                if (downloaded.length === list.length) {
                    return downloaded;
                }
                const hash = Watch._groupByHeight(list);
                const heightList = keys(hash)
                    .map(Number)
                    .sort((a, b) => b - a);
                const [last, prev] = heightList;

                if (last === height) {
                    return prev ? [...hash[last], hash[prev][0]] : loop(list);
                } else {
                    return loop(list);
                }
            });
        };

        return loop([from]);
    }

    private _addTimeout(): void {
        this._timer = setTimeout(() => {
            this._run();
        }, this._interval);
    }

    private static _groupByHeight(list: Array<TTransactionFromAPI<TLong>>): Record<number, Array<TTransactionFromAPI<TLong>>> {
        return list.reduce((hash, tx) => {
            if (!hash[tx.height as number]) {
                hash[tx.height as number] = [tx];
            } else {
                hash[tx.height as number].push(tx);
            }
            return hash;
        }, Object.create(null));
    }

    private static _getTransactionsToDispatch(list: Array<TTransactionFromAPI<TLong>>, dispatched: Record<string, TTransactionFromAPI<TLong>>, lastId: string): Array<TTransactionFromAPI<TLong>> {
        const result = [];
        for (let i = 0; i < list.length; i++) {
            const tx = list[i];
            if (tx.id === lastId) {
                break;
            }
            if (!dispatched[tx.id]) {
                result.push(tx);
            }
        }
        return result;
    }

}

interface ILastBlockInfo {
    height: number;
    lastId: string;
    transactions: Array<TTransactionFromAPI<TLong>>;
}

export interface IEvents {
    'change-state': Array<TTransactionFromAPI<TLong>>;
}

export default function (base: string, address: string, interval?: number) {
    return transactions(base, address, 1)
        .then(([tx]) => new Watch(base, address, tx, interval));
}

