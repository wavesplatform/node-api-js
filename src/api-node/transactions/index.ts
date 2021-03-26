import {TRANSACTION_STATUSES, TTransactionStatuses} from '../../constants';
import {IWithApplicationStatus, TLong} from '../../interface';
import {fetchHeight} from '../blocks';
import request, {RequestInit} from '../../tools/request';
import query from '../../tools/query';
import {deepAssign} from '../../tools/utils';
import stringify from '../../tools/stringify';
import {SignedTransaction, Transaction, TransactionMap} from '@waves/ts-types';
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
export type WithApiMixin = WithId & {
    sender: string;
    height: number;
};

export interface WithId {
    id: string;
}

type TWithState = IWithStateChanges & TWithStateUpdate
type TWithStateUpdate = { updateStateChanges: Omit<TStateChanges, 'invokes'> & { payments: { payment: TPayment, dApp: string }[] } }

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

function makeStateUpdate(stateChanges: TStateChanges, payment: TPayment[], dApp: string, sender: string) {
    const payments = payment.map(payment => ({payment, dApp, sender}))

    const stateUpdate = {
        payments,
        data: stateChanges.data,
        burns: stateChanges.burns,
        issues: stateChanges.issues,
        reissues: stateChanges.reissues,
        transfers: stateChanges.transfers,
        sponsorFees: stateChanges.sponsorFees,
        leases: stateChanges.leases,
        leaseCancels: stateChanges.leaseCancels,
    }
    const recursiveFunction = (stateChanges: TStateChanges, sender: string) => {
        if (stateChanges.invokes.length) {
            stateChanges.invokes.forEach((x) => {
                    //payments
                    x.payments.forEach(y => {
                        const index = payments.findIndex(z => (z.payment.asset === y.asset) && (z.dApp === x.dApp) && (sender === x.dApp))
                        index != null ? payments[index].payment.amount += y.amount : payments.push({
                            payment: y,
                            sender: sender,
                            dApp: x.dApp
                        })
                    })
                    //data
                    x.stateChanges.data.forEach(y => {
                        const index = stateUpdate.data.findIndex(z => z.key === y.key)
                        index != null ? stateUpdate.data[index] = y : stateUpdate.data.push(y)
                    })
                    //burns
                    x.stateChanges.burns.forEach(y => {
                            const index = stateUpdate.burns.findIndex(z => z.assetId === y.assetId)
                            index != null ? stateUpdate.burns[index].quantity += y.quantity : stateUpdate.burns.push(y)
                        }
                    )
                    //issues
                    stateUpdate.issues.concat(x.stateChanges.issues)
                    //обработать reissues
                    x.stateChanges.reissues.forEach(y => {
                            const index = stateUpdate.reissues.findIndex(z => z.assetId === y.assetId)
                            index != null ? stateUpdate.reissues[index].quantity += y.quantity : stateUpdate.reissues.push(y)
                        }
                    )
                    //transfers
                    x.stateChanges.transfers.forEach(y => {
                            const index = stateUpdate.transfers.findIndex(z => (z.asset === y.asset) && (z.address === y.address))
                            index != null ? stateUpdate.transfers[index].amount += y.amount : stateUpdate.transfers.push(y)
                        }
                    )
                    //sponsorFees
                    x.stateChanges.sponsorFees.forEach(y => {
                            const index = stateUpdate.sponsorFees.findIndex(z => z.assetId === y.assetId)
                            index != null ? stateUpdate.sponsorFees[index] = y : stateUpdate.sponsorFees.push(y)
                        }
                    )
                    //lease and leaseCancels
                    stateUpdate.leases.concat(stateChanges.leases)
                    stateUpdate.leaseCancels.concat(stateChanges.leaseCancels)

                    recursiveFunction(x.stateChanges, x.dApp)
                }
            )
        }
    }
    return stateUpdate
}


export function fetchInfo(base: string, id: string, options: RequestInit = Object.create(null)): Promise<TTransaction<TLong> & WithApiMixin & IWithApplicationStatus> {
    return request<TTransaction<TLong> & WithApiMixin & IWithApplicationStatus>({
        base,
        url: `/transactions/info/${id}`,
        options
    }).then(transaction => {
        if (transaction.type === 16) {
            const payments = transaction.payment ? transaction.payment.map(p => ({
                asset: p.assetId,
                amount: Number(p.amount) //можно ли так сделать в этом случае ?
            })) : []
            const stateUpdate = makeStateUpdate(transaction.stateChanges, payments, transaction.dApp, transaction.sender)
            return {...transaction, stateUpdate}
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
