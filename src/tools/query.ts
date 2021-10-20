import {toArray} from "./utils";

export default function <T extends Record<string, any>>(params: T, evolver: TEvolver<T> = Object.create(null)): string {

    const query = Object.keys(params)
        .map<[keyof T, T[keyof T]]>(key => [key as keyof T, params[key] as T[keyof T]])
        .map(([key, value]) => [key, Object.prototype.hasOwnProperty.call(evolver, key) ? (evolver[key] as (data: T[keyof T]) => string | undefined)(value) : value])
        .filter(([key, value]) => value != null)
        .map(([key, value]) => toArray(value).map(v => `${key}=${v}`).join('&'))
        .join('&');
    return query.length ? `?${query}` : '';
};

export type TEvolver<T extends Record<string, any>> = {
    [Key in keyof T]?: (value: T[Key]) => string | undefined;
}
