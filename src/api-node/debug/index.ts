import request from '../../tools/request';
import { TLong } from '../../interface';
import query from '../../tools/query';
import { TTransactionWithProofs } from '@waves/ts-types';
import { TDataTransactionEntry, IWithId } from '@waves/ts-types';

/**
 * Waves balance history
 * @param base
 * @param address
 */
export function fetchBalanceHistory(base: string, address: string): Promise<Array<IBalanceHistory>> {
    return request({
        base,
        url: `/debug/balances/history/${address}`
    })
}

interface IBalanceHistory {
    height: number;
    balance: TLong;
}

interface IWithStateChanges {
    stateChanges: {
        data: TDataTransactionEntry<string | number>[],
        transfers: {
            address: string,
            amount: number,
            assetId: string | null
        }[]
    }
}

/**
 * Get list of transactions with state changes where specified address has been involved
 * @param base
 * @param address
 * @param limit
 * @param after
 */
export function fetchStateChangesByAddress(base: string, address: string, limit: number, after?: string): Promise<Array<TTransactionWithProofs<TLong> & IWithId & IWithStateChanges>> {
    return request({
        base,
        url: `/debug/stateChanges/address/${address}/limit/${limit}${query({ after })}`
    })
}


/**
 * Get invokeScript transaction state changes
 * @param base
 * @param txId
 */
export function fetchStateChangesByTxId(base: string, txId: string ): Promise<TTransactionWithProofs<TLong> & IWithId & IWithStateChanges> {
    return request({
        base,
        url: `/debug/stateChanges/info/${txId}`
    })
}

// @TODO need API key:
// GET /debug/stateWaves/{height}
// POST /debug/rollback
// DELETE /debug/rollback-to/{signature}
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
