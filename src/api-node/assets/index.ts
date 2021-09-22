import {TLong} from '../../interface';
import {AssetDecimals, IssueTransaction, SignedTransaction, TRANSACTION_TYPE, WithApiMixin} from '@waves/ts-types';
import request from '../../tools/request';
import {toArray} from '../../tools/utils';

/**
 * GET /assets/details/{assetId}
 * Information about an asset
 */
export function fetchDetails(base: string, assetId: string, options?: RequestInit): Promise<TAssetDetails>;
export function fetchDetails(base: string, assetId: Array<string>, options?: RequestInit): Promise<Array<TAssetDetails>>;
export function fetchDetails<T extends string | Array<string>>(base: string, assetId: T, options: RequestInit = Object.create(null)): Promise<TAssetDetails | Array<TAssetDetails>> {
    const isOnce = !Array.isArray(assetId);
    return Promise.all(toArray(assetId).map(id => request<TAssetDetails>({
        base,
        url: `/assets/details/${id}`,
        options
    })))
        .then(list => isOnce ? list[0] : list);
}

/**
 * GET /assets/details
 * Provides detailed information about the given assets
 */
export function fetchAssetsDetails(base: string, assetIds: Array<string>, options: RequestInit = Object.create(null)): Promise<Array<TAssetDetails | TErrorResponse>> {
    const params = assetIds
        .map(assetId => `id=${assetId}`)
        .join('&');

    const query = assetIds.length ? `?${params}` : '';

    return request<Array<TAssetDetails | TErrorResponse>>({base, url: `/assets/details${query}`, options});
}

export function fetchAssetDistribution(
    base: string,
    assetId: string,
    height: number,
    limit: number,
    options: RequestInit = Object.create(null)
): Promise<IAssetDistribution> {
    return request({base, url: `/assets/${assetId}/distribution/${height}/limit/${limit}`, options});
}

/**
 * TODO
 * GET /assets/{assetId}/distribution
 * Asset balance distribution
 */

export function fetchAssetsAddressLimit(base: string, address: string, limit: number, options: RequestInit = Object.create(null)): Promise<Array<TAssetDetails>> {
    return request({base, url: `assets/nft/${address}/limit/${limit}`, options});
}

export async function fetchAssetsBalance(base: string, address: string, options: RequestInit = Object.create(null)): Promise<TAssetsBalance> {
    const balancesResponse = await request<TAssetsBalance>({base, url: `/assets/balance/${address}`, options});

    const assetsWithoutIssueTransaction = balancesResponse.balances.reduce<Record<string, number>>(
        (acc, balance, index) => {
            if (!balance.issueTransaction) {
                acc[balance.assetId] = index;
            }

            return acc;
        }, {}
    );

    const assetsDetailsResponse = await fetchAssetsDetails(base, Object.keys(assetsWithoutIssueTransaction), options);

    assetsDetailsResponse.forEach((assetDetails) => {
        if ('error' in assetDetails) {
            return;
        }

        const assetIndex = assetsWithoutIssueTransaction[assetDetails.assetId];
        const assetBalance = balancesResponse.balances[assetIndex];

        if (!assetBalance) {
            return;
        }

        assetBalance.issueTransaction = {
            id: assetDetails.originTransactionId,
            name: assetDetails.name,
            decimals: assetDetails.decimals,
            description: assetDetails.description,
            quantity: assetDetails.quantity,
            reissuable: assetDetails.reissuable,
            sender: assetDetails.issuer,
            senderPublicKey: assetDetails.issuerPublicKey,
            timestamp: assetDetails.issueTimestamp,
            height: assetDetails.issueHeight,
            script: assetDetails.scripted ? '-' : null,
            proofs: [],
            fee: 10 ** 8,
            feeAssetId: null,
            version: 3,
            type: TRANSACTION_TYPE.ISSUE,
            chainId: 0
        };
    });

    return balancesResponse;
}

export function fetchBalanceAddressAssetId(base: string, address: string, assetId: string, options: RequestInit = Object.create(null)): Promise<IBalanceAddressAssetId> {
    return request({base, url: `/assets/balance/${address}/${assetId}`, options});
}

export function convertEthToWaves(base: string, ethAsset: string): Promise<string> {
    return request({base, url: `/assets/${ethAsset}`})
}

export interface IAssetDistribution {
    hasNext: boolean;
    lastItem: string | null;
    items: Record<string, number>;
}

export interface IBalanceAddressAssetId<LONG = TLong> {
    address: string;
    assetId: string;
    balance: LONG;
}

export type TAssetsBalance = {
    'address': string;
    'balances': Array<TAssetBalance>
}

export type TAssetBalance<LONG = TLong> = {
    'assetId': string;
    'balance': LONG;
    'reissuable': true;
    'minSponsoredAssetFee': LONG | null;
    'sponsorBalance': LONG | null;
    'quantity': LONG;
    'issueTransaction': SignedTransaction<IssueTransaction & WithApiMixin>;
}

export type TAssetDetails<LONG = TLong> = {
    assetId: string;
    issueHeight: number;
    issueTimestamp: number;
    issuer: string;
    issuerPublicKey: string;
    name: string;
    description: string;
    decimals: AssetDecimals;
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
