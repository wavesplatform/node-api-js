import * as txRoute from './api-node/transactions';
import * as blocksRoute from './api-node/blocks';
import * as addressesRoute from './api-node/addresses';
import * as debugRoute from './api-node/debug';
import { RequestInit } from './tools/request';
import { DataTransactionEntry, TransactionFromNode } from '@waves/ts-types';
import { TLong } from './interface';

export type CancellablePromise<T> = Promise<T> & { cancel: () => void };

const delay = (timeout: number): CancellablePromise<unknown> => {
    const t: { id?: ReturnType<typeof setTimeout>; resolve?: () => void } = {};
    const p = new Promise<void>((resolve) => {
        t.resolve = resolve;
        t.id = setTimeout(resolve, timeout);
    }) as CancellablePromise<unknown>;

    p.cancel = () => {
        if (t.resolve) t.resolve();
        if (t.id) clearTimeout(t.id);
    };

    return p;
};

const rerun = (f: () => Promise<any>, expired: boolean, t = 1000) =>
    delay(t).then(() => expired ? Promise.reject(new Error('Tx wait stopped: timeout')) : f());

export interface INodeRequestOptions {
    timeout?: number;
    apiBase: string;
}

const DEFAULT_NODE_REQUEST_OPTIONS: Required<INodeRequestOptions> = {
    timeout: 120000,
    apiBase: 'https://nodes.wavesnodes.com',
};

export const currentHeight = async (apiBase: string): Promise<number> =>
    blocksRoute.fetchHeight(apiBase).then(({ height }) => height);

export async function waitForHeight(height: number, options: INodeRequestOptions): Promise<number> {
    const { timeout, apiBase } = { ...DEFAULT_NODE_REQUEST_OPTIONS, ...options };

    let expired = false;
    const to = delay(timeout);
    to.then(() => {
        expired = true;
    });

    const promise = (): Promise<number> =>
        currentHeight(apiBase)
            .then((x) => {
                if (x >= height) {
                    to.cancel();
                    return x;
                }
                return rerun(promise, expired, 10000);
            })
            .catch(() => rerun(promise, expired));

    return promise();
}

export type TxStatus = TransactionFromNode & {
    applicationStatus?: 'succeeded' | 'script_execution_failed';
};

export async function waitForTx(txId: string, options: INodeRequestOptions, requestOptions?: RequestInit): Promise<TxStatus> {
    const { timeout, apiBase } = { ...DEFAULT_NODE_REQUEST_OPTIONS, ...options };

    let expired = false;
    const to = delay(timeout);
    to.then(() => {
        expired = true;
    });

    const promise = (): Promise<TxStatus> =>
        txRoute.fetchInfo(apiBase, txId, requestOptions)
            .then((x) => {
                to.cancel();
                return x as TxStatus;
            })
            .catch(() => delay(1000).then(() => expired ? Promise.reject(new Error('Tx wait stopped: timeout')) : promise()));

    return promise();
}

export async function waitForTxWithNConfirmations(
    txId: string,
    confirmations: number,
    options: INodeRequestOptions,
    requestOptions?: RequestInit
): Promise<TxStatus> {
    const { timeout } = { ...DEFAULT_NODE_REQUEST_OPTIONS, ...options };

    let expired = false;
    const to = delay(timeout);
    to.then(() => {
        expired = true;
    });

    let tx = await waitForTx(txId, options, requestOptions);
    let txHeight = tx.height;
    let current = tx.height;

    while (txHeight + confirmations > current) {
        if (expired) throw new Error('Tx wait stopped: timeout');
        await waitForHeight(txHeight + confirmations, options);
        tx = await waitForTx(txId, options, requestOptions);
        txHeight = tx.height;
        current = tx.height;
    }

    return tx;
}

export async function waitNBlocks(
    blocksCount: number,
    options: INodeRequestOptions = DEFAULT_NODE_REQUEST_OPTIONS,
    _requestOptions?: RequestInit
): Promise<number> {
    const { apiBase } = { ...DEFAULT_NODE_REQUEST_OPTIONS, ...options };
    const height = await currentHeight(apiBase);
    const target = height + blocksCount;
    return waitForHeight(target, options);
}

export interface IAccountDataRequestOptions {
    address: string;
    match?: string | RegExp;
}

export async function accountData(options: IAccountDataRequestOptions, nodeUrl: string, requestOptions?: RequestInit): Promise<Record<string, DataTransactionEntry>>;
export async function accountData(address: string, nodeUrl: string, requestOptions?: RequestInit): Promise<Record<string, DataTransactionEntry>>;
export async function accountData(options: string | IAccountDataRequestOptions, nodeUrl: string, requestOptions?: RequestInit): Promise<Record<string, DataTransactionEntry>> {
    let address: string;
    let match: string | undefined;

    if (typeof options === 'string') {
        address = options;
    } else {
        address = options.address;
        match = options.match && encodeURIComponent(typeof options.match === 'string' ? options.match : options.match.source);
    }

    const data = await addressesRoute.data(nodeUrl, address, { matches: match }, requestOptions);
    return data.reduce<Record<string, DataTransactionEntry>>((acc, item) => ({ ...acc, [item.key]: item }), {});
}

export async function accountDataByKey(
    key: string,
    address: string,
    nodeUrl: string,
    requestOptions?: RequestInit
): Promise<DataTransactionEntry<TLong> | null> {
    return addressesRoute.fetchDataKey(nodeUrl, address, key, requestOptions).catch((e) => {
        if (e.error === 304) return null;
        throw e;
    });
}

export interface IStateChangeResponse {
    data: DataTransactionEntry[];
    transfers: {
        address: string;
        amount: number;
        assetId: string | null;
    }[];
}

export async function stateChanges(transactionId: string, nodeUrl: string, requestOptions?: RequestInit): Promise<IStateChangeResponse> {
    return debugRoute.fetchStateChangesByTxId(nodeUrl, transactionId, requestOptions).then((t: any) => t.stateChanges);
}
