import {CHAIN_ID, MASTER_ACCOUNT, NETWORK_BYTE, NODE_URL, STATE} from '../_state';
import {libs, transfer} from '@waves/waves-transactions';
import create from '../../src';
import {SignedTransaction, TransferTransaction} from '@waves/ts-types';
import {TLong} from '../../src/interface';
import {TRANSACTION_STATUSES} from '../../src/constants';
import {fetchCalculateFee} from '../../src/api-node/transactions';
import {WithId} from "@waves/ts-types/dist/src/parts";


const API = create(NODE_URL);

it('Broadcast and unconfirmed', async () => {
    const tx = await API.transactions.broadcast(
        transfer({
            recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
            amount: 1
        }, MASTER_ACCOUNT.SEED) as SignedTransaction<TransferTransaction<TLong>>
    );

    const unconfirmed = await API.transactions.fetchUnconfirmedInfo(tx.id);
    expect(tx.id).toBe(unconfirmed.id);
});

it('Unconfirmed transaction', async () => {  //AB
    const txIds = [] as string[]
    for (let i = 0; i < 4; i++) {
        const tx = await API.transactions.broadcast(
            transfer({
                recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
                amount: 1
            }, MASTER_ACCOUNT.SEED) as SignedTransaction<TransferTransaction<TLong>>
        );
        txIds.push(tx.id)
    }

    const unconfirmed = await API.transactions.fetchUnconfirmed();
    const unconfirmedIds = unconfirmed.map(tx => tx.id)
    const truthy = !(txIds.map(txId => unconfirmed.some(tx => tx.id === txId)).some(x => x === false))
    expect(truthy).toBeTruthy()
});

it('Unconfirmed size', async () => {   //AB
    const tx = [];
        setTimeout(async () => {
            for (let i = 0; i < 4; i++) {
                tx[i] = await API.transactions.broadcast(
                    transfer({
                        recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
                        amount: 1
                    }, MASTER_ACCOUNT.SEED) as SignedTransaction<TransferTransaction<TLong>>
                );
            }
        }, 65000)
    const unconfirmed = await API.transactions.fetchUnconfirmedSize();
    expect(unconfirmed.size >= 4).toBe(true);
});


test('Broadcast, wait and info', async () => {
    const tx = await API.transactions.broadcast(
        transfer({
            recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
            amount: 1
        }, MASTER_ACCOUNT.SEED) as SignedTransaction<TransferTransaction<TLong>>
    );

    await API.tools.transactions.wait(tx, {confirmations: 0});

    const info = await API.transactions.fetchInfo(tx.id);
    expect(tx.id).toBe(info.id);
    expect(typeof info.height).toBe('number');
}, 10000);

describe('Status', () => {
    it('Unconfirmed', async () => {
        const tx = await API.transactions.broadcast(
            transfer({
                recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
                amount: 1
            }, MASTER_ACCOUNT.SEED) as SignedTransaction<TransferTransaction<TLong>>
        );


        const status = await API.transactions.fetchStatus([tx.id]);
        expect(status.statuses[0].id).toBe(tx.id);
        expect(status.statuses[0].inUTX).toBe(true);
        expect(status.statuses[0].status).toBe(TRANSACTION_STATUSES.UNCONFIRMED);
    });

    it('Not found', async () => {
        const tx = transfer({
            recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
            amount: 1
        }, MASTER_ACCOUNT.SEED) as SignedTransaction<TransferTransaction<TLong>> & WithId;

        const status = await API.transactions.fetchStatus([tx.id]);

        expect(status.statuses[0].id).toBe(tx.id);
        expect(status.statuses[0].inUTX).toBe(false);
        expect(status.statuses[0].status).toBe(TRANSACTION_STATUSES.NOT_FOUND);
    });
});

describe('Calculate fee', () => {

    describe('Transfer', () => {

        it('Simple', async () => {
            const result = await fetchCalculateFee(NODE_URL, transfer({
                recipient: MASTER_ACCOUNT.ADDRESS,
                amount: '1'
            }, STATE.ACCOUNTS.SIMPLE.seed) as SignedTransaction<TransferTransaction<TLong>> & WithId);
            expect(result.feeAmount).toBe(0.001 * Math.pow(10, 8));
            expect(result.feeAssetId).toBe(null);
        });

        it('From smart account', async () => {
            const result = await fetchCalculateFee(NODE_URL, transfer({
                recipient: MASTER_ACCOUNT.ADDRESS,
                amount: 1
            }, STATE.ACCOUNTS.SMART.seed) as SignedTransaction<TransferTransaction<TLong>> & WithId);
            expect(result.feeAmount).toBe(0.005 * Math.pow(10, 8));
            expect(result.feeAssetId).toBe(null);
        });

        it('Smart asset', async () => {
            const result = await fetchCalculateFee(NODE_URL, transfer({
                recipient: MASTER_ACCOUNT.ADDRESS,
                amount: 1,
                assetId: STATE.ASSETS.SMART.id
            }, STATE.ACCOUNTS.SIMPLE.seed) as SignedTransaction<TransferTransaction<TLong>> & WithId);
            expect(result.feeAmount).toBe(0.005 * Math.pow(10, 8));
            expect(result.feeAssetId).toBe(null);
        });

        it('Smart asset from smart account', async () => {
            const result = await fetchCalculateFee(NODE_URL, transfer({
                recipient: MASTER_ACCOUNT.ADDRESS,
                amount: '1',
                assetId: STATE.ASSETS.SMART.id
            }, STATE.ACCOUNTS.SMART.seed) as SignedTransaction<TransferTransaction<TLong>> & WithId);
            expect(result.feeAmount).toBe(Math.round(0.009 * Math.pow(10, 8)));
            expect(result.feeAssetId).toBe(null);
        });

    });

});

