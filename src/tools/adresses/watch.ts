import { fetchTransactions } from '../../api-node/transactions';
import { Transaction, WithApiMixin } from '@waves/ts-types';
import { TLong } from '../../interface';
import { indexBy, keys, prop } from '../utils';
import { EventEmitter } from 'typed-ts-events';


class WatchEventEmitter extends EventEmitter<IEvents> {
    emitChangeState(list: Array<Transaction<TLong> & WithApiMixin>): void {
        this.trigger('change-state', list);
    }
}


export class Watch {

    public readonly address: string;
    private readonly _base: string;
    private readonly _interval: number;
    private readonly _emitter: WatchEventEmitter = new WatchEventEmitter();
    private _lastBlock: ILastBlockInfo;
    private _timer: ReturnType<typeof setTimeout> | null = null;
    private _stopped: boolean = false;


    constructor(base: string, address: string, tx: Transaction<TLong> & WithApiMixin | null, interval?: number) {
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

    public on<K extends keyof IEvents>(event: K, handler: IHandler<IEvents[K]>): void {
        this._emitter.on(event, handler);
    }

    public once<K extends keyof IEvents>(event: K, handler: IHandler<IEvents[K]>): void {
        this._emitter.once(event, handler);
    }

    public off(event?: keyof IEvents, handler?: IHandler<IEvents[keyof IEvents]>): void {
        this._emitter.off(event, handler);
    }

    public stop(): void {
        this._stopped = true;
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    private _run() {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        const onError = () => this._addTimeout();

        fetchTransactions(this._base, this.address, 1)
            .then(([tx ]) => {
                if (!tx) {
                    this._addTimeout();
                    return null;
                }

                this.getTransactionsInHeight(tx as Transaction<TLong> & WithApiMixin, 310)
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
                            this._emitter.emitChangeState(list);
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
                                this._emitter.emitChangeState(toDispatch);
                            }
                        }
                        this._addTimeout();
                    }, onError);

            })
            .catch(onError);
    }

    private getTransactionsInHeight(from: Transaction<TLong> & WithApiMixin, limit: number): Promise<Array<Transaction<TLong> & WithApiMixin>> {
        const height = from.height as number;

        const loop = (downloaded: Array<Transaction<TLong> & WithApiMixin>): Promise<Array<Transaction<TLong> & WithApiMixin>> => {

            if (downloaded.length >= limit) {
                return Promise.resolve(downloaded);
            }

            return fetchTransactions(this._base, this.address, downloaded.length + 100).then(list => {
                if (downloaded.length === list.length) {
                    return downloaded;
                }
                const hash = Watch._groupByHeight(list as Array<Transaction<TLong> & WithApiMixin>);
                const heightList = keys(hash)
                    .map(Number)
                    .sort((a, b) => b - a);
                const [last, prev] = heightList;

                if (last === height) {
                    return prev ? [...hash[last], hash[prev][0]] : loop(list as Array<Transaction<TLong> & WithApiMixin>);
                } else {
                    return loop(list as Array<Transaction<TLong> & WithApiMixin>);
                }
            });
        };

        return loop([from]);
    }

    private _addTimeout(): void {
        if (this._stopped) return;
        this._timer = setTimeout(() => {
            this._run();
        }, this._interval);
    }

    private static _groupByHeight(list: Array<Transaction<TLong> & WithApiMixin>): Record<number, Array<Transaction<TLong> & WithApiMixin>> {
        return list.reduce((hash, tx) => {
            if (!hash[tx.height]) {
                hash[tx.height] = [tx];
            } else {
                hash[tx.height].push(tx);
            }
            return hash;
        }, Object.create(null));
    }

    private static _getTransactionsToDispatch(list: Array<Transaction<TLong> & WithApiMixin>, dispatched: Record<string, Transaction<TLong> & WithApiMixin>, lastId: string): Array<Transaction<TLong> & WithApiMixin> {
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
    transactions: Array<Transaction<TLong> & WithApiMixin>;
}

export interface IEvents {
    'change-state': Array<Transaction<TLong> & WithApiMixin>;
}

type IHandler<T> = (data: T) => any;

export default function (base: string, address: string, interval?: number) {
    return fetchTransactions(base, address, 1)
        .then(([tx]) => new Watch(base, address, tx as Transaction<TLong> & WithApiMixin, interval));
}

