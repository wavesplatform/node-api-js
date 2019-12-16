import create from '../../../src/tools/adresses/watch';
import { CHAIN_ID, NODE_URL, STATE } from '../../_state';
import { broadcast, libs, transfer, waitForTx } from '@waves/waves-transactions';
import { TTransactionFromAPI, TTransactionWithId } from '@waves/ts-types';
import { TLong } from '../../../src/interface';


let watcher: ReturnType<typeof create> extends Promise<infer T> ? T : never = null as any;
let address: string = '';
const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

beforeEach(async () => {
    address = libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID);
    watcher = await create(NODE_URL, address, 50);
});

// describe('Check available sponsorship', () => {
//
//     const seed = libs.crypto.randomSeed();
//     const address = libs.crypto.address(seed, NETWORK_BYTE);
//
//     const asset = issue({
//         chainId: NETWORK_BYTE,
//         name: 'Sponsor',
//         description: '',
//         reissuable: false,
//         quantity: 100000000,
//         decimals: 2
//     }, MASTER_ACCOUNT.SEED);
//
//     const inBlockChain = broadcast(asset, NODE_URL)
//         .then(({ id }) => waitForTx(id, { apiBase: NODE_URL }))
//         .then(() => sponsorship({ assetId: asset.id, minSponsoredAssetFee: 1 }, MASTER_ACCOUNT.SEED))
//         .then(({ id }) => waitForTx(id, { apiBase: NODE_URL }));
//
//     test('Check', async () => {
//         await inBlockChain;
//
//         console.log('Start');
//         const list = await availableSponsoredBalances(NODE_URL, address, Math.pow(10, 8));
//         console.log(list);
//         const [info] = list;
//         expect(list.length).toBe(1);
//         expect(info.assetFee).toBe(String(1000));
//     }, 1000000);
// });

it('Catch one transaction', async () => {
    let ok = false;

    watcher.on('change-state', ([tx]) => {
        ok = tx.type === 4;
    });

    const tx = transfer({
        amount: 1,
        recipient: address,
    }, STATE.ACCOUNTS.SIMPLE.seed);

    await broadcast(tx, NODE_URL);
    await waitForTx(tx.id, { apiBase: NODE_URL });
    await wait(500);

    expect(ok).toBe(true);
});

it('Catch once transaction', async () => {
    let count = 0;

    watcher.once('change-state', ([tx]) => {
        count++;
    });

    for (let i = 0; i < 2; i++) {
        const tx = transfer({
            amount: 1,
            recipient: address,
        }, STATE.ACCOUNTS.SIMPLE.seed);

        await broadcast(tx, NODE_URL);
        await waitForTx(tx.id, { apiBase: NODE_URL });
        await wait(100);
    }

    expect(count).toBe(1);
});

test('Catch 30 transactions', async () => {
    const result: Array<TTransactionFromAPI<TLong>> = [];
    const toSend: Array<TTransactionWithId<TLong>> = [];
    let count = 0;

    watcher.on('change-state', list => {
        result.push(...list);
    });

    const add = async () => {
        const tmp = [];
        for (let i = count; i < count + 5; i++) {
            tmp.push(transfer({
                amount: i + 1,
                recipient: address
            }, STATE.ACCOUNTS.SIMPLE.seed));
        }
        toSend.push(...tmp as any);
        count = count + 5;

        await Promise.all(tmp.map(tx => broadcast(tx, NODE_URL)));
        await Promise.all(tmp.map(tx => waitForTx(tx.id, { apiBase: NODE_URL })));
    };

    await add();
    await wait(500);
    await add();
    await wait(500);
    await add();
    await wait(500);
    await add();
    await wait(500);
    await add();
    await wait(500);
    await add();
    await wait(500);

    expect(result.length).toBe(toSend.length);
}, 60000000);
