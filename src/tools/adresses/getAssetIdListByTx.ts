import { TTransaction } from '@waves/ts-types';
import { TLong } from '../../interface';
import { filter, pipe, prop, switchTransactionByType, toArray, uniq } from '../utils';
import { NAME_MAP } from '../../constants';


const getAssetIdList = switchTransactionByType({
    [NAME_MAP.transfer]: tx => [tx.assetId, tx.feeAssetId],
    [NAME_MAP.burn]: tx => [tx.assetId],
    [NAME_MAP.reissue]: tx => [tx.assetId],
    [NAME_MAP.exchange]: tx => [tx.order1.assetPair.amountAsset, tx.order1.assetPair.priceAsset, tx.order1.matcherFeeAssetId, tx.order2.matcherFeeAssetId],
    [NAME_MAP.massTransfer]: tx => [tx.assetId],
    [NAME_MAP.setAssetScript]: tx => [tx.assetId],
    [NAME_MAP.sponsorship]: tx => [tx.assetId],
    [NAME_MAP.invoke]: tx => [...(tx.payment || []).map(prop('assetId')), tx.feeAssetId]
});

export default function (tx: TTransaction<TLong> | Array<TTransaction<TLong>>): Array<string> {
    const idList = toArray(tx).reduce((acc, tx) => acc.concat(getAssetIdList(tx) || []), []);
    return pipe<Array<string | null>, Array<string>, Array<string>>(
        filter<string | null, string>(Boolean as any),
        uniq
    )(idList);
}
