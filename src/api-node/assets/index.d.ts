import { TLong, TRANSACTION_NAME_MAP } from '../../interface';
import { TTransactionFromAPIMap } from '@waves/ts-types';
/**
 * GET /assets/details/{assetId}
 * Information about an asset
 */
export declare function details(base: string, assetId: string): Promise<TAssetDetails>;
export declare function details(base: string, assetId: Array<string>): Promise<Array<TAssetDetails>>;
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
export declare function assetsBalance(base: string, address: string): Promise<TAssetsBalance>;
/**
 * TODO
 * GET /assets/balance/{address}/{assetId}
 * Asset's balance
 */
export declare type TAssetsBalance = {
    'address': string;
    'balances': Array<TAssetBalance>;
};
export declare type TAssetBalance = {
    'assetId': string;
    'balance': number;
    'reissuable': true;
    'minSponsoredAssetFee': null | number;
    'sponsorBalance': null | number;
    'quantity': number;
    'issueTransaction': TTransactionFromAPIMap<TLong>[TRANSACTION_NAME_MAP['issue']];
};
export declare type TAssetDetails<LONG = TLong> = {
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
};
