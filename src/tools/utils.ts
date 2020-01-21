import { TTransaction, TTransactionMap } from '@waves/ts-types';
import { TLong } from '../interface';

export function toArray<T>(data: T | Array<T>): Array<T> {
    return Array.isArray(data) ? data : [data];
}

export function head<T>(data: Array<T>): T | undefined {
    return data[0];
}

export function wait(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

export function prop<T extends Record<string, any>, P extends keyof T>(key: P): (data: T) => T[P] {
    return data => data[key];
}

export const keys = <T extends Record<string | number, any>>(obj: T): Array<keyof T> =>
    Object.keys(obj);

export const entries = <T extends Record<string | number, any>>(obj: T): Array<[keyof T, T[keyof T]]> =>
    keys(obj).map(name => [name, obj[name]]);

export const values = <T extends Record<string | number, any>>(obj: T): Array<T[keyof T]> =>
    keys(obj).map(key => obj[key]);

export const assign = <T extends Record<string | number, any>, R extends Record<string | number, any>>(target: T, merge: R): T & R => {
    return entries(merge).reduce((acc, [key, value]: any) => {
        target[key] = value;
        return target;
    }, target) as any;
};

export function map<T, U>(process: (data: T, index: number) => U): (list: Array<T>) => Array<U> {
    return list => list.map(process);
}

export function filter<T>(process: (data: T, index: number) => boolean): (list: Array<T>) => Array<T>;
export function filter<T, S extends T>(process: (data: T, index: number) => data is S): (list: Array<T>) => Array<S>;
export function filter<T>(process: (data: T, index: number) => boolean): (list: Array<T>) => Array<T> {
    return list => list.filter(process);
}

export function indexBy<T extends Record<string, any>, P extends (data: T) => string | number>(process: (data: T) => T[keyof T], data: Array<T>): Record<ReturnType<P>, T> {
    return data.reduce<Record<ReturnType<P>, T>>((acc, item) => {
        acc[process(item)] = item;
        return acc;
    }, {} as any);
}

export const uniq = (list: Array<string>): Array<string> => {
    return keys(list.reduce<Record<string, string>>((acc, item) => {
        acc[item] = item;
        return acc;
    }, Object.create(null)));
};

type TChoices = { [Key in keyof TTransactionMap<TLong>]?: (data: TTransactionMap<TLong>[Key]) => any };

export interface ISwitchTransactionResult<R extends TChoices> {
    <T extends TTransaction<TLong>>(tx: T): R[T['type']] extends (data: TTransactionMap<TLong>[T['type']]) => infer A ? A : undefined;
}

export function switchTransactionByType<R extends TChoices>(choices: R): ISwitchTransactionResult<R> {
    return tx => choices[tx.type] && typeof choices[tx.type] === 'function' ? (choices as any)[tx.type]!(tx as any) : undefined;
}

export const pipe: IPipe = (...args: Array<(data: any) => any>): (data: any) => any => {
    return data => args.reduce((acc, item) => item(acc), data);
};

export interface IPipe {
    <A, B, R>(a: (data: A) => B, b: (data: B) => R): (a: A) => R;

    <A, B, C, R>(a: (data: A) => B, b: (data: B) => C, c: (data: C) => R): (a: A) => R;

    <A, B, C, D, R>(a: (data: A) => B, b: (data: B) => C, c: (data: C) => D, d: (data: D) => R): (a: A) => R;
}

