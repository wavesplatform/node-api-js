import {TRANSACTION_STATUSES, TTransactionStatuses} from '../../constants';
import {IWithApplicationStatus, TLong} from '../../interface';
import {fetchHeight} from '../blocks';
import request, {RequestInit} from '../../tools/request';
import query from '../../tools/query';
import {deepAssign} from '../../tools/utils';
import stringify from '../../tools/stringify';
import {
    DataTransactionEntry,
    SignedTransaction,
    Transaction,
    TRANSACTION_TYPE,
    TransactionMap,
    WithApiMixin
} from '@waves/ts-types';
import {Long} from "@waves/ts-types/src/index";
import {
    AliasTransaction,
    BurnTransaction, CancelLeaseTransaction, DataTransaction, ExchangeTransaction,
    GenesisTransaction, InvokeScriptTransaction,
    IssueTransaction, LeaseTransaction, MassTransferTransaction,
    PaymentTransaction, ReissueTransaction, SetAssetScriptTransaction, SetScriptTransaction, SponsorshipTransaction,
    TransferTransaction, UpdateAssetInfoTransaction
} from "@waves/ts-types/transactions/index";
import {IWithStateChanges, TPayment, TStateChanges} from "../debug";


/**
 * GET /transactions/unconfirmed/size
 * Number of unconfirmed transactions
 */
export function fetchUnconfirmedSize(base: string, options: RequestInit = Object.create(null)): Promise<IUnconfirmedSize> {
    return request({
        base,
        url: '/transactions/unconfirmed/size',
        options
    })
}

interface IUnconfirmedSize {
    size: number;
}


// @TODO: when correct API key is received
/**
 * POST /transactions/sign/{signerAddress}
 * Sign a transaction with a non-default private key
 */

/**
 * POST /transactions/calculateFee
 * Calculate transaction fee
 */
export function fetchCalculateFee<T extends keyof TransactionMap<TLong>>(
    base: string,
    tx: Partial<TransactionMap<TLong>[T]> & { type: T },
    options: RequestInit = Object.create(null)
): Promise<TFeeInfo> {
    return request({
        base,
        url: '/transactions/calculateFee',
        options: deepAssign(
            {...options},
            {
                method: 'POST',
                body: stringify(tx),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    });
}

export type TFeeInfo<LONG = TLong> = {
    feeAssetId: string | null;
    feeAmount: LONG;
}

/**
 * GET /transactions/unconfirmed
 * Unconfirmed transactions
 */
export function fetchUnconfirmed(base: string, options: RequestInit = Object.create(null)): Promise<Array<Transaction<TLong> & WithApiMixin>> {
    return request({
        base,
        url: '/transactions/unconfirmed',
        options
    })
}

/**
 * Список транзакций по адресу
 * @param address
 * @param limit      максимальное количество транзакций в результате
 * @param after      искать транзакции после ID указанного в after
 * @param retry      количество попыток на выполнение запроса
 */
export function fetchTransactions(
    base: string,
    address: string,
    limit: number,
    after?: string,
    retry?: number,
    options: RequestInit = Object.create(null)
): Promise<Array<Transaction<TLong> & WithApiMixin>> {
    return request<Array<Array<Transaction<TLong> & WithApiMixin>>>({
        base,
        url: `/transactions/address/${address}/limit/${limit}${query({after})}`,
        options
    }).then(([list]) => list);
}

/**
 * GET /transactions/unconfirmed/info/{id}
 * Unconfirmed transaction info
 */
export function fetchUnconfirmedInfo(base: string, id: string, options: RequestInit = Object.create(null)): Promise<Transaction<TLong> & WithApiMixin> {
    return request({
        base,
        url: `/transactions/unconfirmed/info/${id}`,
        options
    });
}

// @TODO when correct API key is received
/**
 * POST /transactions/sign
 * Sign a transaction
 */


/**
 * GET /transactions/info/{id}
 * Transaction info
 */


type TStateUpdate = {
    data: (DataTransactionEntry & { address: string })[],
    transfers: {
        address: string,
        sender: string,
        amount: number,
        asset: string | null
    }[],
    issues: {
        address: string,
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
        address: string,
        assetId: string,
        isReissuable: boolean,
        quantity: number
    }[],
    burns: {
        address: string,
        assetId: string,
        quantity: number
    }[],
    sponsorFees: {
        address: string,
        assetId: string,
        minSponsoredAssetFee: number
    }[],
    leases: {
        sender: string,
        leaseId: string,
        recipient: string,
        amount: number
    }[],
    leaseCancels: { leaseId: string, address: string }[],
}

type shit = {
    leases: { leaseId: string; amount: number; sender: string; recipient: string }[];
    data: { address: string; key: string }[];
    transfers: { amount: number; address: string; sender: string; asset: string | null }[];
    payments: { dApp: string; sender: string; payment: TPayment }[];
    leaseCancels: { leaseId: string; address: string }[];
    issues: {
        isReissuable: boolean;
        quantity: number;
        address: string;
        assetId: string;
        decimals: number;
        name: string;
        description: string;
        compiledScript: string | null;
        nonce: number
    }[];
    sponsorFees: { address: string; assetId: string; minSponsoredAssetFee: number }[];
    reissues: { isReissuable: boolean; quantity: number; address: string; assetId: string }[];
    burns: { quantity: number; address: string; assetId: string }[]
}

type TWithStateUpdate = { stateUpdate: TStateUpdate }
type TWithState = IWithStateChanges & TWithStateUpdate

type TTransaction<LONG = Long> =
    | GenesisTransaction<LONG>
    | PaymentTransaction<LONG>
    | IssueTransaction<LONG>
    | TransferTransaction<LONG>
    | ReissueTransaction<LONG>
    | BurnTransaction<LONG>
    | LeaseTransaction<LONG>
    | CancelLeaseTransaction<LONG>
    | AliasTransaction<LONG>
    | MassTransferTransaction<LONG>
    | DataTransaction<LONG>
    | SetScriptTransaction<LONG>
    | SponsorshipTransaction<LONG>
    | ExchangeTransaction<LONG>
    | SetAssetScriptTransaction<LONG>
    | (InvokeScriptTransaction<LONG> & TWithState)
    | UpdateAssetInfoTransaction<LONG>;


function makeStateUpdate(stateChanges: TStateChanges, payment: TPayment[], dApp: string, sender: string): TStateUpdate {
    const payments = payment.map(payment => ({payment, dApp, sender}))
    const addField = (array: any[], fieldName: string) => array.map(item => ({...item, [fieldName]: dApp}))
    const transfers = addField(stateChanges.transfers, 'sender')
    const leases = addField(stateChanges.leases, 'sender')
    const issues = addField(stateChanges.issues, 'address')
    const data = addField(stateChanges.data, 'address')
    const reissues = addField(stateChanges.reissues, 'address')
    const burns = addField(stateChanges.burns, 'address')
    const sponsorFees = addField(stateChanges.sponsorFees, 'address')
    const leaseCancels = addField(stateChanges.leaseCancels, 'address')

    const stateUpdate = {
        payments,
        data,
        transfers,
        reissues,
        issues,
        burns,
        sponsorFees,
        leases,
        leaseCancels,
    }

    const recursiveFunction = (stateChanges: TStateChanges, sender: string) => {
        if (stateChanges.invokes.length) {
            stateChanges.invokes.forEach((x) => {
                    //payments
                    x.payments.forEach(y => {
                        const index = payments.findIndex(z => (z.payment.asset === y.asset) && (z.dApp === x.dApp) && (sender === x.dApp))
                        index !== -1 ? payments[index].payment.amount += y.amount : payments.push({
                            payment: y,
                            sender: sender,
                            dApp: x.dApp
                        })
                    })
                    //data
                    x.stateChanges.data.forEach(y => {
                        const index = stateUpdate.data.findIndex(z => z.key === y.key)
                        index !== -1 ? stateUpdate.data[index] = {...y, address: x.dApp} : stateUpdate.data.push({
                            ...y,
                            address: x.dApp
                        })
                    })
                    //burns
                    x.stateChanges.burns.forEach(y => {
                            const index = stateUpdate.burns.findIndex(z => z.assetId === y.assetId)
                            index !== -1 ? stateUpdate.burns[index].quantity += y.quantity : stateUpdate.burns.push({
                                ...y,
                                address: x.dApp
                            })
                        }
                    )
                    //issues
                    x.stateChanges.issues.forEach(y => stateUpdate.issues.push({...y, address: x.dApp}))
                    //reissues
                    x.stateChanges.reissues.forEach(y => {
                            const index = stateUpdate.reissues.findIndex(z => z.assetId === y.assetId)
                            index !== -1 ? stateUpdate.reissues[index].quantity += y.quantity : stateUpdate.reissues.push({
                                ...y,
                                address: x.dApp
                            })
                        }
                    )
                    //transfers
                    x.stateChanges.transfers.forEach(y => {
                            const index = stateUpdate.transfers.findIndex(z => (z.asset === y.asset) && (z.address === y.address) && (x.dApp === z.sender))
                            index !== -1 ? stateUpdate.transfers[index].amount += y.amount : stateUpdate.transfers.push({
                                ...y,
                                sender: x.dApp
                            })
                        }
                    )
                    //sponsorFees
                    x.stateChanges.sponsorFees.forEach(y => {
                            const index = stateUpdate.sponsorFees.findIndex(z => (z.assetId === y.assetId) && (z.address === x.dApp))
                            index !== -1 ? stateUpdate.sponsorFees[index] = {
                                ...y,
                                address: x.dApp
                            } : stateUpdate.sponsorFees.push({...y, address: x.dApp})
                        }
                    )
                    //lease and leaseCancels
                    x.stateChanges.leases.forEach(y => stateUpdate.leases.push({...y, sender: x.dApp}))
                    x.stateChanges.leaseCancels.forEach(y => stateUpdate.leaseCancels.push({...y, address: x.dApp}))

                    recursiveFunction(x.stateChanges, x.dApp)
                }
            )
        }
    }

    recursiveFunction(stateChanges, sender)
    return stateUpdate
}


export function fetchInfo(base: string, id: string, options: RequestInit = Object.create(null)): Promise<TTransaction<TLong> & WithApiMixin & IWithApplicationStatus> {
    return request<TTransaction<TLong> & WithApiMixin & IWithApplicationStatus>({
        base,
        url: `/transactions/info/${id}`,
        options
    }).then(transaction => {
        if (transaction.type === TRANSACTION_TYPE.INVOKE_SCRIPT && transaction.stateChanges.invokes && transaction.stateChanges.invokes.length) {
            const payments = transaction.payment ? transaction.payment.map(p => ({
                asset: p.assetId,
                amount: Number(p.amount)
            })) : []
            return Object.defineProperty(transaction, 'stateUpdate', {get: () => makeStateUpdate(transaction.stateChanges, payments, transaction.dApp, transaction.sender)})
        } else return transaction
    })
}


export function fetchStatus(base: string, list: Array<string>): Promise<ITransactionsStatus> {
    const DEFAULT_STATUS: ITransactionStatus = {
        id: '',
        confirmations: -1,
        height: -1,
        inUTX: false,
        status: TRANSACTION_STATUSES.NOT_FOUND
    };

    const loadAllTxInfo: Array<Promise<ITransactionStatus>> = list.map(id =>
        fetchUnconfirmedInfo(base, id)
            .then(() => ({...DEFAULT_STATUS, id, status: TRANSACTION_STATUSES.UNCONFIRMED, inUTX: true}))
            .catch(() => fetchInfo(base, id)
                .then(tx => ({
                    ...DEFAULT_STATUS,
                    id,
                    status: TRANSACTION_STATUSES.IN_BLOCKCHAIN,
                    height: tx.height as number,
                    applicationStatus: tx.applicationStatus
                })))
            .catch(() => ({...DEFAULT_STATUS, id}))
    );

    return Promise.all([
        fetchHeight(base),
        Promise.all(loadAllTxInfo)
    ]).then(([{height}, statuses]) => ({
        height,
        statuses: statuses.map(item => ({
            ...item,
            confirmations: item.status === TRANSACTION_STATUSES.IN_BLOCKCHAIN ? height - item.height : item.confirmations
        }))
    }));
}

export interface ITransactionsStatus {
    height: number;
    statuses: Array<ITransactionStatus>;
}

export interface ITransactionStatus {
    id: string;
    status: TTransactionStatuses;
    inUTX: boolean;
    confirmations: number;
    height: number;
}

export function broadcast<T extends SignedTransaction<Transaction<TLong>>>(base: string, tx: T): Promise<T & WithApiMixin> {
    return request<T & WithApiMixin>({
        base, url: '/transactions/broadcast',
        options: deepAssign(
            {
                method: 'POST',
                body: stringify(tx),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    });
}
