import {IWithStateChanges, TPayment, TStateChanges} from "../../api-node/debug";
import {BigNumber} from "@waves/bignumber";
import {AssetDecimals, DataTransactionEntry, TRANSACTION_TYPE, WithApiMixin} from "@waves/ts-types";
import {Long} from "@waves/ts-types/src/index";
import {
    AliasTransaction,
    BurnTransaction, CancelLeaseTransaction, DataTransaction, ExchangeTransaction,
    GenesisTransaction, InvokeScriptTransaction,
    IssueTransaction, LeaseTransaction, MassTransferTransaction,
    PaymentTransaction, ReissueTransaction, SetAssetScriptTransaction, SetScriptTransaction, SponsorshipTransaction,
    TransferTransaction, UpdateAssetInfoTransaction
} from "@waves/ts-types/transactions/index";
import {IWithApplicationStatus, TLong} from "../../interface";

export type TStateUpdate = {
    data: (DataTransactionEntry & { address: string })[],
    transfers: {
        address: string,
        sender: string,
        amount: TLong,
        asset: string | null
    }[],
    issues: {
        address: string,
        assetId: string,
        name: string,
        description: string,
        quantity: number,
        decimals: AssetDecimals,
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
        amount: TLong
    }[],
    leaseCancels: { leaseId: string, address: string }[],
}

export type TWithStateUpdate = { stateUpdate: TStateUpdate }
export type TWithState = IWithStateChanges & TWithStateUpdate


export type TTransaction<LONG = Long> =
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


export function addStateUpdateField(transaction: TTransaction & WithApiMixin & IWithApplicationStatus): TTransaction & WithApiMixin & IWithApplicationStatus{
    if (transaction.type === TRANSACTION_TYPE.INVOKE_SCRIPT && transaction.stateChanges.invokes && transaction.stateChanges.invokes.length) {
        const payments = transaction.payment ? transaction.payment.map(p => ({
            assetId: p.assetId,
            amount: p.amount
        })) : []
        return Object.defineProperty(transaction, 'stateUpdate', {get: () => makeStateUpdate(transaction.stateChanges, payments, transaction.dApp, transaction.sender)})
    } else return transaction
}

export function makeStateUpdate(stateChanges: TStateChanges, payment: TPayment[], dApp: string, sender: string): TStateUpdate {
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
                    if(x.payment) x.payment.forEach(y => {
                        const index = payments.findIndex(z => (z.payment.assetId === y.assetId) && (z.dApp === x.dApp) && (sender === x.dApp))
                        index !== -1
                            ? payments[index].payment.amount = (new BigNumber(payments[index].payment.amount)).add(y.amount).toNumber()
                            : payments.push({
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
                            index !== -1
                                ? stateUpdate.transfers[index].amount = (new BigNumber(stateUpdate.transfers[index].amount)).add(y.amount).toNumber()
                                : stateUpdate.transfers.push({
                                    ...y,
                                    sender: x.dApp
                                })
                        }
                    )
                    //sponsorFees
                    x.stateChanges.sponsorFees.forEach(y => {
                            const index = stateUpdate.sponsorFees.findIndex(z => (z.assetId === y.assetId) && (z.address === x.dApp))
                            index !== -1
                                ? stateUpdate.sponsorFees[index] = {...y, address: x.dApp}
                                : stateUpdate.sponsorFees.push({...y, address: x.dApp})
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
