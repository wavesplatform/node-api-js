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

export function assetDistribution(base: string, assetId: string, height: number, limit: number): Promise<IAssetDistribution> {
    return request({ base, url: `/assets/${assetId}/distribution/${height}/limit/${limit}`});
}

/**
 * TODO
 * GET /assets/{assetId}/distribution
 * Asset balance distribution
 */

 export function AssetsAddressLimit(base: string, address:string, limit: number): Promise<Array<IAssetsAddressLimit>> {
     return request({ base, url: `assets/nft/${address}/limit/${limit}`});
 }

export function assetsBalance(base: string, address: string): Promise<TAssetsBalance> {
    return request({ base, url: `/assets/balance/${address}` });
}

export function balanceAddressAssetId(base: string, address: string, assetId: string): Promise<IBalanceAddressAssetId> {
    return request({ base, url: `/assets/balance/${address}/${assetId}` });
}

export interface IAssetDistribution {
    hasNext: boolean;
    lastItem: string | null;
    items: Record<string, number>;
}

export interface IBalanceAddressAssetId {
    address: string;
    assetId: string;
    balance: number;
}

export interface IAssetsAddressLimit {
    senderPublicKey: string;
    quantity: number;
    fee: number;
    description: string;
    type: number;
    version: number;
    reissuable: boolean;
    script: string | null;
    sender: string;
    feeAssetId: string | null;
    chainId: number;
    proofs: Array<string>;
    assetId: string;
    decimals: number;
    name: string;
    id: string;
}

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