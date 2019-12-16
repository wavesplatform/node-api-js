import { TTransactionFromAPI } from '@waves/ts-types';
import { TLong } from '../../interface';
import { EventEmitter } from 'typed-ts-events';
export declare class Watch {
    readonly address: string;
    private readonly _base;
    private readonly _interval;
    private readonly _emitter;
    private _lastBlock;
    private _timer;
    constructor(base: string, address: string, tx: TTransactionFromAPI<TLong> | null, interval?: number);
    on<K extends keyof IEvents>(event: K, handler: EventEmitter.IHandler<IEvents[K], any>): void;
    once<K extends keyof IEvents>(event: K, handler: EventEmitter.IHandler<IEvents[K], any>): void;
    off(event?: keyof IEvents, handler?: EventEmitter.IHandler<IEvents[keyof IEvents], any>): void;
    private _run;
    private getTransactionsInHeight;
    private _addTimeout;
    private static _groupByHeight;
    private static _getTransactionsToDispatch;
}
export interface IEvents {
    'change-state': Array<TTransactionFromAPI<TLong>>;
}
export default function (base: string, address: string, interval?: number): Promise<Watch>;
