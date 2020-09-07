import { TLong, TRANSACTION_NAME_MAP } from '../../interface';
import { TTransactionFromAPIMap } from '@waves/ts-types';
import request from '../../tools/request';
import { toArray } from '../../tools/utils';

/**
 * GET /assets/details/{assetId}
 * Information about an asset
 */
export function fetchDetails(base: string, assetId: string): Promise<TAssetDetails>;
export function fetchDetails(base: string, assetId: Array<string>): Promise<Array<TAssetDetails>>;
export function fetchDetails<T extends string | Array<string>>(base: string, assetId: T): Promise<TAssetDetails | Array<TAssetDetails>> {
    const isOnce = !Array.isArray(assetId);
    return Promise.all(toArray(assetId).map(id => request<TAssetDetails>({ base, url: `/assets/details/${id}` })))
        .then(list => isOnce ? list[0] : list);
}
/**
 * GET /assets/details
 * Provides detailed information about the given assets
 */
export function fetchAssetsDetails(base: string, assetIds: Array<string>): Promise<Array<TAssetDetails | TErrorResponse>> {
    const params = assetIds
        .map(assetId => `id=${assetId}`)
        .join('&')

    const query = assetIds.length ? `?${params}` : ''

    return request<Array<TAssetDetails | TErrorResponse>>({ base, url: `/assets/details${query}` })
}

export function fetchAssetDistribution(base: string, assetId: string, height: number, limit: number): Promise<IAssetDistribution> {
    return request({ base, url: `/assets/${assetId}/distribution/${height}/limit/${limit}`});
}

/**
 * TODO
 * GET /assets/{assetId}/distribution
 * Asset balance distribution
 */

 export function fetchAssetsAddressLimit(base: string, address:string, limit: number): Promise<Array<IAssetsAddressLimit>> {
     return request({ base, url: `assets/nft/${address}/limit/${limit}`});
 }

export function fetchAssetsBalance(base: string, address: string): Promise<TAssetsBalance> {
    return request({ base, url: `/assets/balance/${address}` });
}

export function fetchBalanceAddressAssetId(base: string, address: string, assetId: string): Promise<IBalanceAddressAssetId> {
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
    assetId: string;
    issueHeight: number;
    issueTimestamp: number;
    issuer: string;
    issuerPublicKey: string;
    name: string;
    description: string;
    decimals: number;
    reissuable: boolean;
    quantity: number;
    scripted: boolean;
    minSponsoredAssetFee: number | null;
    originTransactionId: string
}

export type TAssetsBalance = {
    'address': string;
    'balances': Array<TAssetBalance>
}

export type TAssetBalance<LONG = TLong> = {
    'assetId': string;
    'balance': number;
    'reissuable': true;
    'minSponsoredAssetFee': LONG | null;
    'sponsorBalance': number | null;
    'quantity': LONG;
    'issueTransaction': TTransactionFromAPIMap<TLong>[TRANSACTION_NAME_MAP['issue']] | null
}

export type TAssetDetails<LONG = TLong> = {
    assetId: string;
    issueHeight: number;
    issueTimestamp: number;
    issuer: string;
    issuerPublicKey: string;
    name: string;
    description: string;
    decimals: number;
    reissuable: boolean;
    quantity: LONG;
    scripted: boolean;
    minSponsoredAssetFee: LONG | null;
    originTransactionId: string;
}

export type TErrorResponse = {
    error: number;
    message: string;
}