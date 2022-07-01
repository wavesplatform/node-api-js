import {Transaction, TransactionFromNode} from '@waves/ts-types';
import { TLong } from '../../interface';
import { prop, switchTransactionByType, toArray } from '../utils';
import { NAME_MAP } from '../../constants';


const getAssetIdList = switchTransactionByType({
    [NAME_MAP.transfer]: tx => [tx.assetId, tx.feeAssetId],
    [NAME_MAP.burn]: tx => [tx.assetId],
    [NAME_MAP.reissue]: tx => [tx.assetId],
    [NAME_MAP.exchange]: tx => Array.from(new Set([
        tx.order1.assetPair.amountAsset,
        tx.order1.assetPair.priceAsset,
        tx.order1.version === 3 ? tx.order1.matcherFeeAssetId : null,
        tx.order2.version === 3 ? tx.order2.matcherFeeAssetId : null
    ])),
    [NAME_MAP.massTransfer]: tx => [tx.assetId],
    [NAME_MAP.setAssetScript]: tx => [tx.assetId],
    [NAME_MAP.sponsorship]: tx => [tx.assetId],
    [NAME_MAP.invoke]: tx => [...(tx.payment || []).map(prop('assetId')), tx.feeAssetId],
    [NAME_MAP.updateAsset]: tx => [tx.assetId]
});

export default function (tx: Array<Transaction> | Transaction | TransactionFromNode | TransactionFromNode[]): Array<string> {
    // @ts-ignore
    const idList = toArray(tx).reduce((acc, tx) => acc.concat(getAssetIdList(tx) || []), []).filter(x => x != null);
    return idList;
}
