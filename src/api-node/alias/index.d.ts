export declare function byAlias(base: string, alias: string): Promise<IByAlias>;
export declare function byAddress(base: string, address: string): Promise<TByAddress>;
export interface IByAlias {
    address: string;
}
export declare type TByAddress = Array<string>;
