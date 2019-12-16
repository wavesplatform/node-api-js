import { IWithProofs, TTransaction, TTransactionFromAPI, TTransactionMap } from '@waves/ts-types';
import { TTransactionStatuses } from '../../constants';
import { TLong } from '../../interface';
/**
 * TODO
 * GET /transactions/unconfirmed/size
 * Number of unconfirmed transactions
 */
/**
 * TODO
 * POST /transactions/sign/{signerAddress}
 * Sign a transaction with a non-default private key
 */
/**
* POST /transactions/calculateFee
* Calculate transaction fee
*/
export declare function calculateFee<T extends keyof TTransactionMap<TLong>>(base: string, tx: Partial<TTransactionMap<TLong>[T]> & {
    type: T;
}): Promise<TFeeInfo>;
export declare type TFeeInfo<LONG = TLong> = {
    feeAssetId: string | null;
    feeAmount: LONG;
};
/**
 * TODO
 * GET /transactions/unconfirmed
 * Unconfirmed transactions
 */
/**
 * Список транзакций по адресу
 * @param address
 * @param limit      максимальное количество транзакций в результате
 * @param after      искать транзакции после ID указанного в after
 * @param retry      количество попыток на выполнение запроса
 */
export declare function transactions(base: string, address: string, limit: number, after?: string, retry?: number): Promise<Array<TTransactionFromAPI<TLong>>>;
/**
 * GET /transactions/unconfirmed/info/{id}
 * Unconfirmed transaction info
 */
export declare function unconfirmedInfo(base: string, id: string): Promise<TTransactionFromAPI<TLong>>;
/**
 * TODO
 * POST /transactions/sign
 * Sign a transaction
 */
/**
 * GET /transactions/info/{id}
 * Transaction info
 */
export declare function info(base: string, id: string): Promise<TTransactionFromAPI<TLong>>;
export declare function status(base: string, list: Array<string>): Promise<ITransactionsStatus>;
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
export declare function broadcast(base: string, tx: TTransaction<TLong> & IWithProofs): Promise<TTransactionFromAPI<TLong>>;
