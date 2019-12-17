import request from '../../tools/request';
import { TLong } from '../../interface';
import query from '../../tools/query';
import { TTransactionWithProofs } from '@waves/ts-types';
import { IWithId } from "@waves/ts-types/src/parts";

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

/**
 * Get list of transactions with state changes where specified address has been involved
 * @param base
 * @param address
 * @param limit
 * @param after
 */
export function fetchStateChangesByAddress(base: string, address: string, limit: number, after?: string): Promise<Array<TTransactionWithProofs<TLong> & IWithId>> {
    return request({
        base,
        url: `/debug/stateChanges/address/${address}/limit/${limit}${query({ after })}`
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
// GET /debug/stateChanges/info/{id}
// GET /debug/info
// POST /debug/validate
// GET /debug/blocks/{howMany}
// POST /debug/blacklist
// POST /debug/print
// GET /debug/state
