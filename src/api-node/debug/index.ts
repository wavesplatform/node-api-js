import request from '../../tools/request';
import { TLong } from '../../interface';
import query from '../../tools/query';
import { DataTransactionEntry, Transaction, WithId } from '@waves/ts-types';
import { IWithId } from '@waves/ts-types/dist';

/**
 * Waves balance history
 * @param base
 * @param address
 */
export function fetchBalanceHistory(base: string, address: string, options: RequestInit = Object.create(null)): Promise<Array<IBalanceHistory>> {
    return request({
        base,
        url: `/debug/balances/history/${address}`,
        options
    });
}

interface IBalanceHistory {
    height: number;
    balance: TLong;
}

interface IWithStateChanges {
    stateChanges: {
        data: DataTransactionEntry[],
        transfers: {
            address: string,
            amount: number,
            asset: string | null
        }[],
        issues: {
            assetId: string,
            name: string,
            description: string,
            quantity: number,
            decimals: number,
            isReissuable: boolean,
            compiledScript: null | string,
            nonce: number
        }[],
        reissues: {
            assetId: string,
            isReissuable: boolean,
            quantity: number
        }[],
        burns: {
            assetId: string,
            quantity: number
        }[],
        sponsorFees: {
            assetId: string,
            minSponsoredAssetFee: number
        }[],
        error?: {
            code: number,
            text: string
        }
    }
}

/**
 * Get list of transactions with state changes where specified address has been involved
 * @param base
 * @param address
 * @param limit
 * @param after
 */
export function fetchStateChangesByAddress(
    base: string,
    address: string,
    limit: number,
    after?: string,
    options: RequestInit = Object.create(null)
): Promise<Array<Transaction<TLong> & WithId & IWithStateChanges>> {
    return request({
        base,
        url: `/debug/stateChanges/address/${address}/limit/${limit}${query({ after })}`,
        options
    });
}


/**
 * Get invokeScript transaction state changes
 * @param base
 * @param txId
 */
export function fetchStateChangesByTxId(base: string, txId: string, options: RequestInit = Object.create(null)): Promise<Transaction<TLong> & IWithId & IWithStateChanges> {
    return request({
        base,
        url: `/debug/stateChanges/info/${txId}`,
        options
    });
}

// @TODO need API key:
// GET /debug/stateWaves/{height}
// POST /debug/rollback
// DELETE /debug/rollback-to/{id}
// GET /debug/portfolios/{address}
// GET /debug/minerInfo
// GET /debug/historyInfo
// GET /debug/historyInfo
// GET /debug/info
// POST /debug/validate
// GET /debug/blocks/{howMany}
// POST /debug/blacklist
// POST /debug/print
// GET /debug/state
