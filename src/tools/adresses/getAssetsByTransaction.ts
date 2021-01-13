import { fetchDetails, TAssetDetails } from '../../api-node/assets';
import getAssetIdListByTx from './getAssetIdListByTx';
import { Transaction } from '@waves/ts-types';
import { TLong } from '../../interface';
import { indexBy, prop } from '../utils';


export default function(base: string, tx: Transaction<TLong> | Array<Transaction<TLong>>): Promise<Record<string, TAssetDetails>> {
    return fetchDetails(base, getAssetIdListByTx(tx))
        .then(list => indexBy(prop('assetId'), list));
}
