import { fetchDetails, TAssetDetails } from '../../api-node/assets';
import getAssetIdListByTx from './getAssetIdListByTx';
import { TTransaction } from '@waves/ts-types';
import { TLong } from '../../interface';
import { indexBy, prop } from '../utils';


export default function(base: string, tx: TTransaction<TLong> | Array<TTransaction<TLong>>): Promise<Record<string, TAssetDetails>> {
    return fetchDetails(base, getAssetIdListByTx(tx))
        .then(list => indexBy(prop('assetId'), list));
}
