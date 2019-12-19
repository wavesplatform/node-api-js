import { TTransactionFromAPI } from '@waves/ts-types';
import { TLong } from '../../interface';
import { head, indexBy, prop, toArray, wait } from '../utils';
import { fetchStatus } from '../../api-node/transactions';
import { TRANSACTION_STATUSES } from '../../constants';


export default function <T extends TTransactionFromAPI<TLong>>(base: string, tx: T, options?: IWaitOptions): Promise<T>;
export default function <T extends TTransactionFromAPI<TLong>>(base: string, list: Array<T>, options?: IWaitOptions): Promise<Array<T>>;
export default function <T extends TTransactionFromAPI<TLong>>(base: string, tx: T | Array<T>, options?: IWaitOptions): Promise<T | Array<T>>;
export default function <T extends TTransactionFromAPI<TLong>>(base: string, tx: T | Array<T>, options?: IWaitOptions): Promise<T | Array<T>> {
    const isOnce = !Array.isArray(tx);
    const start = Date.now();
    const confirmed: Array<T> = [];
    const confirmations = options && options.confirmations || 0;
    const maxWaitTime = options && options.maxWaitTime || 0;
    const requestInterval = options && options.requestInterval || 250;

    const waitTx = (list: Array<T>): Promise<void> => {
        return fetchStatus(base, list.map(prop('id')))
            .then(status => {
                const hash = indexBy(prop('id'), status.statuses);
                const hasError = list.some(tx => hash[tx.id].status === TRANSACTION_STATUSES.NOT_FOUND);

                if (hasError) {
                    throw new Error('One transaction is not in blockchain!');
                }

                const toRequest = list.filter(tx => {
                    if (hash[tx.id].confirmations >= confirmations) {
                        confirmed.push(tx);
                        return false;
                    } else {
                        return true;
                    }
                });

                if (!toRequest.length) {
                    return void 0;
                }
                if (maxWaitTime && Date.now() - start > maxWaitTime) {
                    return Promise.reject('Timeout error!');
                }
                return wait(requestInterval).then(() => waitTx(toRequest));
            });
    };

    return waitTx(toArray(tx)).then(() => isOnce ? head(confirmed) as T : confirmed);
}

export interface IWaitOptions {
    confirmations?: number;
    maxWaitTime?: number;
    requestInterval?: number;
}
