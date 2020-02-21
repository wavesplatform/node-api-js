import { IExchangeTransactionOrder, TDataTransactionEntry, TTransactionMap } from '@waves/ts-types';

type TGetLongKeys<T> = {
    [Key in keyof T]: T[Key] extends 'LONG' ? Key : T[Key] extends Record<'string', any> ? TGetLongKeys<T[Key]> : never;
}[keyof T];

type TFieldsToReplace = TGetLongKeys<TDataTransactionEntry<'LONG'>> | TGetLongKeys<IExchangeTransactionOrder<'LONG'>> | {
    [Type in keyof TTransactionMap<'LONG'>]: {
        [Key in keyof TTransactionMap<'LONG'>[Type]]: TGetLongKeys<TTransactionMap<'LONG'>[Type]>;
    }[keyof TTransactionMap<'LONG'>[Type]]
}[keyof TTransactionMap<'LONG'>] extends infer A ? A extends undefined ? never : A : never;

const FIELDS: Array<TFieldsToReplace> = ['amount', 'matcherFee', 'price', 'fee', 'minSponsoredAssetFee', 'quantity', 'sellMatcherFee', 'buyMatcherFee'];

export default function <T extends Record<string, any>>(data: T): string {
    return JSON.stringify(data, function (key, value) {
        if (FIELDS.includes(key as TFieldsToReplace)) {
            return `!${value}!`;
        } else if (key === 'value' && this['type'] === 'integer') {
            return `!${value}!`;
        } else {
            return value;
        }
    }, 0).replace(/"\!(\d+)\!"/g, '$1');
}
