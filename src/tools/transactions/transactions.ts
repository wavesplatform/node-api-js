// import {IWithStateChanges, TPayment, TStateChanges} from "../../api-node/debug";
// import {BigNumber} from "@waves/bignumber";
// import {
//     AssetDecimals,
//     DataTransactionEntry,
//     EthereumTransaction,
//     TRANSACTION_TYPE,
//     WithApiMixin
// } from "@waves/ts-types/";
// import {Long} from "@waves/ts-types/";
// import {
//     AliasTransaction,
//     BurnTransaction, CancelLeaseTransaction, DataTransaction, ExchangeTransaction,
//     GenesisTransaction, InvokeScriptTransaction,
//     IssueTransaction, LeaseTransaction, MassTransferTransaction,
//     PaymentTransaction, ReissueTransaction, SetAssetScriptTransaction, SetScriptTransaction, SponsorshipTransaction,
//     TransferTransaction, UpdateAssetInfoTransaction
// } from "@waves/ts-types/";
// import {IWithApplicationStatus, TLong} from "../../interface";
// import any = jasmine.any;
//
// export type TStateUpdate = {
//     data: (DataTransactionEntry & { address: string })[],
//     transfers: {
//         address: string,
//         sender: string,
//         amount: TLong,
//         asset: string | null
//     }[],
//     issues: {
//         address: string,
//         assetId: string,
//         name: string,
//         description: string,
//         quantity: number,
//         decimals: AssetDecimals,
//         isReissuable: boolean,
//         compiledScript: null | string,
//         nonce: number
//     }[],
//     reissues: {
//         address: string,
//         assetId: string,
//         isReissuable: boolean,
//         quantity: number
//     }[],
//     burns: {
//         address: string,
//         assetId: string,
//         quantity: number
//     }[],
//     sponsorFees: {
//         address: string,
//         assetId: string,
//         minSponsoredAssetFee: number
//     }[],
//     leases: {
//         sender: string,
//         leaseId: string,
//         recipient: string,
//         amount: TLong
//     }[],
//     leaseCancels: { leaseId: string, address: string }[],
// }
//
// export type TWithStateUpdate = { stateUpdate: TStateUpdate }
// export type TWithState = IWithStateChanges & TWithStateUpdate
//
//
// export type TTransaction<LONG = Long> =
//     | GenesisTransaction<LONG>
//     | PaymentTransaction<LONG>
//     | IssueTransaction<LONG>
//     | TransferTransaction<LONG>
//     | ReissueTransaction<LONG>
//     | BurnTransaction<LONG>
//     | LeaseTransaction<LONG>
//     | CancelLeaseTransaction<LONG>
//     | AliasTransaction<LONG>
//     | MassTransferTransaction<LONG>
//     | DataTransaction<LONG>
//     | SetScriptTransaction<LONG>
//     | SponsorshipTransaction<LONG>
//     | ExchangeTransaction<LONG>
//     | SetAssetScriptTransaction<LONG>
//     | (InvokeScriptTransaction<LONG> & TWithState)
//     | UpdateAssetInfoTransaction<LONG>
//     | EthereumTransaction<LONG>;
//
