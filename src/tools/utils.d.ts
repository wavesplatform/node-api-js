import { TTransaction, TTransactionMap } from '@waves/ts-types';
import { TLong } from '../interface';
export declare function toArray<T>(data: T | Array<T>): Array<T>;
export declare function head<T>(data: Array<T>): T | undefined;
export declare function wait(time: number): Promise<void>;
export declare function prop<T extends Record<string, any>, P extends keyof T>(key: P): (data: T) => T[P];
export declare const keys: <T extends Record<TLong, any>>(obj: T) => (keyof T)[];
export declare const entries: <T extends Record<TLong, any>>(obj: T) => [keyof T, T[keyof T]][];
export declare const values: <T extends Record<TLong, any>>(obj: T) => T[keyof T][];
export declare const assign: <T extends Record<TLong, any>, R extends Record<TLong, any>>(target: T, merge: R) => T & R;
export declare function map<T, U>(process: (data: T, index: number) => U): (list: Array<T>) => Array<U>;
export declare function filter<T>(process: (data: T, index: number) => boolean): (list: Array<T>) => Array<T>;
export declare function filter<T, S extends T>(process: (data: T, index: number) => data is S): (list: Array<T>) => Array<S>;
export declare function indexBy<T extends Record<string, any>, P extends (data: T) => string | number>(process: (data: T) => T[keyof T], data: Array<T>): Record<ReturnType<P>, T>;
export declare const uniq: (list: string[]) => string[];
declare type TChoices = {
    [Key in keyof TTransactionMap<TLong>]?: (data: TTransactionMap<TLong>[Key]) => any;
};
export interface ISwitchTransactionResult<R extends TChoices> {
    <T extends TTransaction<TLong>>(tx: T): R[T['type']] extends (data: TTransactionMap<TLong>[T['type']]) => infer A ? A : undefined;
}
export declare function switchTransactionByType<R extends TChoices>(choices: R): ISwitchTransactionResult<R>;
export declare const pipe: IPipe;
export interface IPipe {
    <A, B, R>(a: (data: A) => B, b: (data: B) => R): (a: A) => R;
    <A, B, C, R>(a: (data: A) => B, b: (data: B) => C, c: (data: C) => R): (a: A) => R;
    <A, B, C, D, R>(a: (data: A) => B, b: (data: B) => C, c: (data: C) => D, d: (data: D) => R): (a: A) => R;
}
export {};
