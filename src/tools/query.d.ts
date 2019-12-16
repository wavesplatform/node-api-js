export default function <T extends Record<string, any>>(params: T, evolver?: TEvolver<T>): string;
export declare type TEvolver<T extends Record<string, any>> = {
    [Key in keyof T]?: (value: T[Key]) => string | undefined;
};
