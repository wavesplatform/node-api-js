import * as utilityF from '../src/nodeInteraction';
import { address, randomSeed } from '@waves/ts-lib-crypto';
import { broadcast, fetchInfo } from '../src/api-node/transactions';
import { fetchHeight } from '../src/api-node/blocks';
import { fetchBalance, fetchBalanceDetails, fetchDataKey, fetchScriptInfo, fetchScriptInfoMeta } from '../src/api-node/addresses';
import { fetchBalanceAddressAssetId } from '../src/api-node/assets';
import { fetchRewards } from '../src/api-node/rewards';

const chainId = 'T';
const apiBase = 'https://nodes-testnet.wavesnodes.com/';

describe('Node interaction utility functions', () => {
    jest.setTimeout(60000);

    it('should send tx to node', async () => {
        const invalidTx: any = {
            type: 12,
            version: 1,
            senderPublicKey: 'invalid',
            data: [],
            fee: 100000,
            timestamp: 100000,
            proofs: [],
            chainId,
        };

        await expect(broadcast(apiBase, invalidTx)).rejects.toBeTruthy();
    });

    it('Should get current height', async () => {
        await expect(fetchHeight(apiBase).then(x => x.height)).resolves.toBeGreaterThan(0);
    });

    it('Should get transaction by id', async () => {
        const id = 'EdhLuhUMX22gKxGxKZxLcVsygMC9nBCBbSuAxFhbZumQ';
        const tx = await fetchInfo(apiBase, id);
        expect(tx.id).toEqual(id);
    });

    it('Should throw on not existing tx', async () => {
        const id = 'EdhLuhUMX22gKxGxKZxLcVsygMC9nBCBbSuAxFbZumQ';
        await expect(fetchInfo(apiBase, id)).rejects.toMatchObject({ error: 311 });
    });

    it('Should wait 1 Block', async () => {
        await utilityF.waitNBlocks(1, { apiBase });
    }, 120000);

    it('Should get balance', async () => {
        await expect(fetchBalance(apiBase, '3MtXzccPrCAoKans9TD9sp3qoFHiajPA4Uu').then(x => +x.balance)).resolves.not.toBeNaN();
        await expect(fetchBalance(apiBase, 'bad address')).rejects.toMatchObject({ error: 199 });
    }, 5000);

    it('Should get balanceDetails', async () => {
        await expect(fetchBalanceDetails(apiBase, '3MtXzccPrCAoKans9TD9sp3qoFHiajPA4Uu')).resolves.not.toBeFalsy();
    }, 5000);

    it('Should get asset balance', async () => {
        await expect(
            fetchBalanceAddressAssetId(apiBase, '3MtXzccPrCAoKans9TD9sp3qoFHiajPA4Uu', '3xdf6GESKGNP1oUyT8QXDgzTE11yi1sJGyVmjt7HHNEU').then(x => x.balance)
        ).resolves.not.toBeFalsy();
    }, 5000);

    it('Should get NFT balance', async () => {
        await expect(
            fetchBalanceAddressAssetId(apiBase, '3Ms5T2C6pvqiZbMASjiJvPh9u57bQpcVLLp', '2HgvJjAJFug1QriGTJPLK1AM2Yv3GqYnDLpUjQprf1Ut').then(x => x.balance)
        ).resolves.toEqual(1);
    }, 5000);

    it('Should return correct error on invalid address for asset balance', async () => {
        const resp = fetchBalanceAddressAssetId(apiBase, 'bad address', 'invalidAddress').then(x => x.balance);
        await expect(resp).rejects.toMatchObject({ error: 199 });
    }, 5000);

    it('Should get accountData', async () => {
        const addr = address(randomSeed(), chainId);
        await expect(utilityF.accountData(addr, apiBase)).resolves.not.toBeFalsy();
    }, 5000);

    it('Should get accountData and filter it by regexp', async () => {
        const data = await utilityF.accountData(
            {
                address: '3MtXzccPrCAoKans9TD9sp3qoFHiajPA4Uu',
                match: 'binary.*',
            },
            apiBase
        );
        expect(Object.keys(data).length).toEqual(2);
    }, 5000);

    it('Should get accountData by key', async () => {
        const data = await fetchDataKey(apiBase, '3MtXzccPrCAoKans9TD9sp3qoFHiajPA4Uu', 'string_value');
        expect(data).not.toBeFalsy();
    }, 5000);

    it('Should get accountData by key and return null on no data', async () => {
        const data = await utilityF.accountDataByKey('test23', '3MtXzccPrCAoKans9TD9sp3qoFHiajPA4Uu', apiBase);
        expect(data).toBeNull();
    }, 5000);

    it('Should give correct error on invalid address', async () => {
        const data = fetchDataKey(apiBase, 'invalidAddress', 'test23');
        await expect(data).rejects.toMatchObject({ error: 199 });
    }, 5000);

    it('Should get account script info', async () => {
        const data = await fetchScriptInfo(apiBase, '3N749utyWVhhnCqWh6hbqsq5zMvqVSanamR');
        expect(data).toMatchObject({ extraFee: 0 });
    }, 5000);

    it('Should get account script meta', async () => {
        const data = await fetchScriptInfoMeta(apiBase, '3N749utyWVhhnCqWh6hbqsq5zMvqVSanamR');
        expect(data).toMatchObject({ address: '3N749utyWVhhnCqWh6hbqsq5zMvqVSanamR' });
    }, 5000);

    it('Should reward info', async () => {
        const data = await fetchRewards('https://nodes-stagenet.wavesnodes.com');
        expect(data).toHaveProperty('currentReward');
    }, 5000);

    it('Should get invokeTx state changes', async () => {
        const data = await utilityF.stateChanges('CNo4Zy72KEAo4pnpVL5FQrBujwhqhYgBogwQ1RS8uWkD', apiBase);
        expect(Array.isArray(data.data)).toBe(true);
    }, 5000);
});
