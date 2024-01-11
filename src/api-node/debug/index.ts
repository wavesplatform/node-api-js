import request, {parseResponse} from '../../tools/request';
import {TLong} from '../../interface';
import query from '../../tools/query';
import {AssetDecimals, DataTransactionEntry, Transaction, WithId} from '@waves/ts-types';

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

export type TPayment = {
    assetId: string | null,
    amount: TLong
}

export type TStateChanges = {
    data: DataTransactionEntry[],
    transfers: {
        address: string,
        amount: TLong,
        asset: string | null
    }[],
    issues: {
        assetId: string,
        name: string,
        description: string,
        quantity: TLong,
        decimals: AssetDecimals,
        isReissuable: boolean,
        compiledScript: null | string,
        nonce: TLong
    }[],
    reissues: {
        assetId: string,
        isReissuable: boolean,
        quantity: TLong
    }[],
    burns: {
        assetId: string,
        quantity: TLong
    }[],
    sponsorFees: {
        assetId: string,
        minSponsoredAssetFee: TLong
    }[],
    leases: {
        leaseId: string,
        recipient: string,
        amount: TLong
    }[],
    leaseCancels: { leaseId: string }[],
    invokes: ({
        dApp: string,
        call: {
            function: string,
            args: { type: string, value: string }[],
        },
        payment: TPayment[],
        stateChanges: TStateChanges,
    })[]
    error?: {
        code: number,
        text: string
    }
}

export interface IWithStateChanges {
    stateChanges: TStateChanges | null
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
        url: `/debug/stateChanges/address/${address}/limit/${limit}${query({after})}`,
        options
    });
}


/**
 * Get invokeScript transaction state changes
 * @param base
 * @param txId
 */
export function fetchStateChangesByTxId(base: string, txId: string, options: RequestInit = Object.create(null)): Promise<Transaction<TLong> & WithId & IWithStateChanges> {
    return request({
        base,
        url: `/transactions/info/${txId}`,
        options
    });
}


export function postPeerToTheBanList(base: string, peer: string): Promise<any> {
    return fetch(`${base}/debug/blacklist`, {
        method: "POST",
        body: peer,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(parseResponse) as Promise<any>
}


export function fetchConfigInfo(base: string, apiKey: string): Promise<string> {
    return fetch(`${base}/debug/configInfo`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        }
    }).then(parseResponse) as Promise<string>
}


export function fetchDebugInfo(base: string, apiKey: string): Promise<IDebugInfo> {
    return fetch(`${base}/debug/info`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        }
    }).then(parseResponse) as Promise<any>
}

export function fetchMinerInfo(base: string, apiKey: string): Promise<IMinerInfo<TLong>> {
    return fetch(`${base}/debug/minerInfo`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        }
    }).then(parseResponse) as Promise<IMinerInfo<TLong>>
}

export function fetchPortfolios(base: string, address: string, apiKey: string): Promise<IPortfolio<TLong>> {
    return fetch(`${base}/debug/portfolios/${address}`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        }
    }).then(parseResponse) as Promise<IPortfolio<TLong>>
}

export function debugPrint(base: string, message: string, apiKey: string): Promise<any> {
    return fetch(`${base}/debug/print`, {
        method: "POST",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message})
    }).then(parseResponse) as Promise<any>
}

/**
 * Removes all blocks after a given height. Max number of blocks back from the current height is set by waves.db.max-rollback-depth, 2000 by default
 * @param base
 * @param height
 * @param returnTransactionsToUtx
 * @param apiKey
 */
export function debugRollback(base: string, height: number, returnTransactionsToUtx: boolean, apiKey: string): Promise<any> {
    return fetch(`${base}/debug/rollback`, {
        method: "POST",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rollbackTo: height,
            returnTransactionsToUtx
        })
    }).then(parseResponse) as Promise<any>
}

/**
 * Rollback the state to the block with a given ID
 * @param base
 * @param height
 * @param returnTransactionsToUtx
 * @param apiKey
 */
export function debugRollbackTo(base: string, id: string, apiKey: string): Promise<any> {
    return fetch(`${base}/debug/rollback-to/${id}`, {
        method: "DELETE",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        },
    }).then(parseResponse) as Promise<any>
}

/**
 * Regular address balance at the current height
 * @param base
 * @param apiKey
 */
export function debugState(base: string, apiKey: string): Promise<Record<string, number | string>> {
    return fetch(`${base}/debug/state`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        },
    }).then(parseResponse) as Promise<Record<string, number | string>>
}


/**
 * Get state hash at height. Available only if node configuration contains waves.db.store-state-hashes = true option
 * @param base
 * @param height
 */
export function debugStateHash(base: string, height: number, options: RequestInit = Object.create(null)): Promise<IStateHash> {
    return request({
        base,
        url: `/debug/stateHash/${height}`,
        options
    })
}


/**
 * Regular address balance at the height. Max number of blocks back from the current height is set by waves.db.max-rollback-depth, 2000 by default
 * @param base
 * @param height
 * @param apiKey
 */
export function debugStateWaves(base: string, height: number, apiKey: string): Promise<Record<string, number | string>> {
    return fetch(`${base}/debug/stateWaves/${height}`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json"
        },
    }).then(parseResponse) as Promise<Record<string, number | string>>
}

/**
 * Validates a transaction and measures time spent in milliseconds. You should use the JSON transaction format with proofs
 * @param base
 * @param transaction
 */
export function debugValidate(base: string, transaction: string): Promise<IValidateResponse> {
    return fetch(`${base}/debug/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: transaction
    }).then(parseResponse) as Promise<IValidateResponse>
}

interface IDebugInfo {
    "stateHeight": number,
    "extensionLoaderState": string,
    "historyReplierCacheSizes": {
        "microBlockOwners": number,
        "nextInvs": number,
        "awaiting": number,
        "successfullyReceived": number
    },
    "microBlockSynchronizerCacheSizes": {
        "microBlockOwners": number,
        "nextInvs": number,
        "awaiting": number,
        "successfullyReceived": number
    },
    "scoreObserverStats": {
        "localScore": number,
        "currentBestChannel": string,
        "scoresCacheSize": number
    },
    "minerState": string
}

interface IMinerInfo<LONG> {
    "address": string,
    "miningBalance": LONG,
    "timestamp": number
}

interface IPortfolio<LONG> {
    "balance": number,
    "lease": {
        "in": number,
        "out": number
    },
    "assets": Record<string, LONG>
}

interface IStateHash {
    stateHash: string,
    wavesBalanceHash: string,
    assetBalanceHash: string,
    dataEntryHash: string,
    accountScriptHash: string,
    assetScriptHash: string,
    leaseBalanceHash: string,
    leaseStatusHash: string,
    sponsorshipHash: string,
    aliasHash: string,
    blockId: string,
}

interface IValidateResponse {
    valid: boolean,
    validationTime: number,
    "trace": string[]
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
