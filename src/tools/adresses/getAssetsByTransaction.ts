import { fetchDetails, TAssetDetails } from '../../api-node/assets';
import getAssetIdListByTx from './getAssetIdListByTx';
import {Transaction, TransactionFromNode} from '@waves/ts-types';
import { indexBy, prop } from '../utils';


export default function (base: string, tx: Array<Transaction> | Transaction | TransactionFromNode | TransactionFromNode[]): Promise<Record<string, TAssetDetails>> {
    return fetchDetails(base, getAssetIdListByTx(tx))
        .then(list => indexBy(prop('assetId'), list));
}
