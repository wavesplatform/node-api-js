import { TLong, TRANSACTION_NAME_MAP } from '../../interface';
import { TTransactionFromAPIMap } from '@waves/ts-types';
import request from '../../tools/request';
import { toArray } from '../../tools/utils';

/**
 * GET /assets/details/{assetId}
 * Information about an asset
 */
export function details(base: string, assetId: string): Promise<TAssetDetails>;
export function details(base: string, assetId: Array<string>): Promise<Array<TAssetDetails>>;
export function details(base: string, assetId: string | Array<string>): Promise<TAssetDetails | Array<TAssetDetails>> {
    const isOnce = !Array.isArray(assetId);
    return Promise.all(toArray(assetId).map(id => request<TAssetDetails>({ base, url: `/assets/details/${id}` })))
        .then(list => isOnce ? list[0] : list);
}

/**
 * TODO
 * GET /assets/{assetId}/distribution/{height}/limit/{limit}
 * Asset balance distribution at height
 */

/**
 * TODO
 * GET /assets/{assetId}/distribution
 * Asset balance distribution
 */

/**
 * TODO
 * GET /assets/nft/{address}/limit/{limit}
 * NFTs
 */

export function assetsBalance(base: string, address: string): Promise<TAssetsBalance> {
    return request({ base, url: `/assets/balance/${address}` });
}

/**
 * TODO
 * GET /assets/balance/{address}/{assetId}
 * Asset's balance
 */

export type TAssetsBalance = {
    'address': string;
    'balances': Array<TAssetBalance>
}

export type TAssetBalance = {
    'assetId': string;
    'balance': number;
    'reissuable': true;
    'minSponsoredAssetFee': null | number;
    'sponsorBalance': null | number;
    'quantity': number;
    'issueTransaction': TTransactionFromAPIMap<TLong>[TRANSACTION_NAME_MAP['issue']]
}

export type TAssetDetails<LONG = TLong> = {
    assetId: string;
    issueHeight: number;
    issueTimestamp: number;
    issuer: string;
    name: string;
    description: string;
    decimals: number;
    reissuable: boolean;
    quantity: LONG;
    scripted: boolean;
    minSponsoredAssetFee: LONG | null;
}