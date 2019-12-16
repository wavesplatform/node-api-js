import { TTransactionFromAPI } from '@waves/ts-types';
import { TLong } from '../../interface';
export default function <T extends TTransactionFromAPI<TLong>>(base: string, tx: T, options?: IWaitOptions): Promise<T>;
export default function <T extends TTransactionFromAPI<TLong>>(base: string, list: Array<T>, options?: IWaitOptions): Promise<Array<T>>;
export default function <T extends TTransactionFromAPI<TLong>>(base: string, tx: T | Array<T>, options?: IWaitOptions): Promise<T | Array<T>>;
export interface IWaitOptions {
    confirmations?: number;
    maxWaitTime?: number;
    requestInterval?: number;
}
