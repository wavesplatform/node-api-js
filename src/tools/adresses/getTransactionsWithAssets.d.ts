import { TAssetDetails } from '../../api-node/assets';
import { TTransactionFromAPI } from '@waves/ts-types';
import { TLong } from '../../interface';
export default function (base: string, address: string, limit: number, after?: string): Promise<{
    transactions: Array<TTransactionFromAPI<TLong>>;
    assets: Record<string, TAssetDetails>;
}>;
