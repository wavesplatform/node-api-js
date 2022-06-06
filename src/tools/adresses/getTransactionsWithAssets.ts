import { TAssetDetails } from '../../api-node/assets';
import { fetchTransactions } from '../../api-node/transactions';
import getAssetsByTransaction from './getAssetsByTransaction';
import { TransactionFromNode } from '@waves/ts-types';
import { TLong } from '../../interface';


export default function (base: string, address: string, limit: number, after?: string): Promise<{ transactions: Array<TransactionFromNode>; assets: Record<string, TAssetDetails> }> {
    return fetchTransactions(base, address, limit, after)
        .then(transactions => getAssetsByTransaction(base, transactions).then(assets => ({ transactions, assets })));
}
