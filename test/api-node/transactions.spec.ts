import create from '../../src';
import {fetchInfo} from '../../src/api-node/transactions';

const NODES = {
    MAINNET_EXPLORER: {
        NODE_URL: 'https://nodes.wavesexplorer.com',
        // @ts-ignore
        API: create(this.NODE_URL),
        CHAIN_ID: 87
    },
    CUSTOM: {
        NODE_URL: 'https://devnet1-htz-nbg1-2.wavesnodes.com',
        // @ts-ignore
        API: create(this.NODE_URL),
        CHAIN_ID: 68
    }
}


// it('Broadcast and unconfirmed', async () => {
//     const tx = await API.transactions.broadcast(
//         transfer({
//             recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
//             amount: 1
//         }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong>
//     );
//
//     const unconfirmed = await API.transactions.fetchUnconfirmedInfo(tx.id);
//     expect(tx.id).toBe(unconfirmed.id);
// });

// test('Broadcast, wait and info', async () => {
//     const tx = await API.transactions.broadcast(
//         transfer({
//             recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
//             amount: 1
//         }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong>
//     );
//
//     await API.tools.transactions.wait(tx, {confirmations: 0});
//
//     const info = await API.transactions.fetchInfo(tx.id);
//     expect(tx.id).toBe(info.id);
//     expect(typeof info.height).toBe('number');
// }, 10000);

// test('Broadcast, wait and info', async () => {
//     const info = await API.transactions.fetchInfo();
//     expect(tx.id).toBe(info.id);
//     expect(typeof info.height).toBe('number');
// }, 10000);

// describe('Status', () => {
//     it('Unconfirmed', async () => {
//         const tx = await API.transactions.broadcast(
//             transfer({
//                 recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
//                 amount: 1
//             }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong>
//         );
//
//
//         const status = await API.transactions.fetchStatus([tx.id]);
//         expect(status.statuses[0].id).toBe(tx.id);
//         expect(status.statuses[0].inUTX).toBe(true);
//         expect(status.statuses[0].status).toBe(TRANSACTION_STATUSES.UNCONFIRMED);
//     });
//
//     it('Not found', async () => {
//         const tx = transfer({
//             recipient: libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID),
//             amount: 1
//         }, MASTER_ACCOUNT.SEED) as ITransferTransactionWithProofs<TLong> & IWithId;
//
//         const status = await API.transactions.fetchStatus([tx.id]);
//
//         expect(status.statuses[0].id).toBe(tx.id);
//         expect(status.statuses[0].inUTX).toBe(false);
//         expect(status.statuses[0].status).toBe(TRANSACTION_STATUSES.NOT_FOUND);
//     });
// });

// describe('Calculate fee', () => {
//
//     describe('Transfer', () => {
//
//         it('Simple', async () => {
//             const result = await fetchCalculateFee(NODE_URL, transfer({
//                 recipient: MASTER_ACCOUNT.ADDRESS,
//                 amount: '1'
//             }, STATE.ACCOUNTS.SIMPLE.seed));
//             expect(result.feeAmount).toBe(0.001 * Math.pow(10, 8));
//             expect(result.feeAssetId).toBe(null);
//         });
//
//         it('From smart account', async () => {
//             const result = await fetchCalculateFee(NODE_URL, transfer({
//                 recipient: MASTER_ACCOUNT.ADDRESS,
//                 amount: 1
//             }, STATE.ACCOUNTS.SMART.seed));
//             expect(result.feeAmount).toBe(0.005 * Math.pow(10, 8));
//             expect(result.feeAssetId).toBe(null);
//         });
//
//         it('Smart asset', async () => {
//             const result = await fetchCalculateFee(NODE_URL, transfer({
//                 recipient: MASTER_ACCOUNT.ADDRESS,
//                 amount: 1,
//                 assetId: STATE.ASSETS.SMART.id
//             }, STATE.ACCOUNTS.SIMPLE.seed));
//             expect(result.feeAmount).toBe(0.005 * Math.pow(10, 8));
//             expect(result.feeAssetId).toBe(null);
//         });
//
//         it('Smart asset from smart account', async () => {
//             const result = await fetchCalculateFee(NODE_URL, transfer({
//                 recipient: MASTER_ACCOUNT.ADDRESS,
//                 amount: '1',
//                 assetId: STATE.ASSETS.SMART.id
//             }, STATE.ACCOUNTS.SMART.seed));
//             expect(result.feeAmount).toBe(Math.round(0.009 * Math.pow(10, 8)));
//             expect(result.feeAssetId).toBe(null);
//         });
//
//     });
//
// });

describe('Fetch Info', () => {
    it('StateUpdate', async () => {
        const invokeId = '7ARy5JmeZmf6Ly4X9WRgTJ6D8Nj1UDW8icQ5WJUwqM9k'
        const resultInvoke = await fetchInfo(NODES.CUSTOM.NODE_URL, invokeId)
        // @ts-ignore
        console.log(resultInvoke.stateUpdate)
    })

    it('Transfer Info', async () => {
        const transferId = 'AWpjq6DtwTb6nW48ivxX2FxARwH4FzMQm3bkDpCcQmTy'
        const resultTransfer = await fetchInfo(NODES.MAINNET_EXPLORER.NODE_URL, transferId)
        console.log(resultTransfer)
    })
})
