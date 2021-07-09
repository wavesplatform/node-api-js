import { DataTransactionEntry, ExchangeTransactionOrder, TransactionMap } from '@waves/ts-types';

type TGetLongKeys<T> = {
    [Key in keyof T]: T[Key] extends 'LONG' | ('LONG' | null) ? Key : T[Key] extends Record<'string', any> ? TGetLongKeys<T[Key]> : never;
}[keyof T];

type TFieldsToReplace = TGetLongKeys<DataTransactionEntry<'LONG'>> | TGetLongKeys<ExchangeTransactionOrder<'LONG'>> | {
    [Type in keyof TransactionMap<'LONG'>]: {
        [Key in keyof TransactionMap<'LONG'>[Type]]: TGetLongKeys<TransactionMap<'LONG'>[Type]>;
    }[keyof TransactionMap<'LONG'>[Type]]
}[keyof TransactionMap<'LONG'>] extends infer A ? A extends undefined ? never : A : never;

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
    }, 0).replace(/"\!(-?\d+)\!"/g, '$1');
}
