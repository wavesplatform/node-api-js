import create from '../../src';
import { CHAIN_ID, MASTER_ACCOUNT, NODE_URL, STATE } from '../_state';
import { libs, transfer } from '@waves/waves-transactions';
import { ITransferTransactionWithProofs, IWithId } from '@waves/ts-types';
import { TLong } from '../../src/interface';
import { wait } from '../../src/tools/utils';
import { TRANSACTION_STATUSES } from '../../src/constants';

const api = create(NODE_URL);

it('Broadcast 2 transactions', async () => {
    const tx1 = transfer({
        recipient: `alias:${CHAIN_ID}:${STATE.ACCOUNTS.SMART.alias}`,
        amount: 1
    }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong> & IWithId;

    const tx2 = transfer({
        recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
        amount: 2
    }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong> & IWithId;

    await api.tools.transactions.broadcast([tx1, tx2]);
    const status = await api.transactions.fetchStatus([tx1.id, tx2.id]);

    expect(status.statuses.length).toBe(2);
    expect(status.statuses[0].inUTX).toBe(true);
    expect(status.statuses[0].id).toBe(tx1.id);
    expect(status.statuses[1].inUTX).toBe(true);
    expect(status.statuses[1].id).toBe(tx2.id);
});

test('Chain broadcast 2 transactions', async () => {
    const tx1 = transfer({
        recipient: `alias:${CHAIN_ID}:${STATE.ACCOUNTS.SMART.alias}`,
        amount: 1
    }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong> & IWithId;

    const tx2 = transfer({
        recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
        amount: 2
    }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong> & IWithId;

    const promise = api.tools.transactions.broadcast([tx1, tx2], { chain: true, confirmations: 1 }).catch(() => null);

    await wait(10);
    const status = await api.transactions.fetchStatus([tx1.id, tx2.id]);
    expect(status.statuses[0].status).toBe(TRANSACTION_STATUSES.UNCONFIRMED);
    expect(status.statuses[1].status).toBe(TRANSACTION_STATUSES.NOT_FOUND);

    return promise.then(async () => {
        const status = await api.transactions.fetchStatus([tx1.id, tx2.id]);
        expect(status.statuses[0].confirmations >= 1).toBe(true);
        expect(status.statuses[1].confirmations >= 1).toBe(true);
    });
}, 60000);
