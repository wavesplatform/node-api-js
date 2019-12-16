import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';
import { TAssetBalance, IAssetsAddressLimit, TAssetDetails } from '../../src/api-node/assets';
import { TLong } from '../../src/interface';

const api: ReturnType<typeof create> = create(NODE_URL);

const checkAsset = (object: TAssetDetails) => {
    expect(object).toMatchObject({
        assetId: expect.any(String),
        issueHeight: expect.any(Number),
        issueTimestamp: expect.any(Number),
        issuer: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        decimals: expect.any(Number),
        reissuable: expect.any(Boolean),
        scripted: expect.any(Boolean)
    })
}

it('details array', async () => {
    const info = await api.assets.details([STATE.ASSETS.BTC.id, STATE.ASSETS.ETH.id]);
    expect(info).toBeInstanceOf(Array);
    info.forEach(checkAsset);
});

it('details string', async () => {
    // TODO @tsigel тут с перегрузками надо разобраться
    const info: TAssetDetails<TLong> = await api.assets.details(STATE.ASSETS.BTC.id as any) as any;
    expect(typeof info.assetId).toBe('string');
    expect(typeof info.issueHeight).toBe('number');
    expect(typeof info.issueTimestamp).toBe('number');
    expect(typeof info.issuer).toBe('string');
    expect(typeof info.name).toBe('string');
    expect(typeof info.description).toBe('string');
    expect(typeof info.decimals).toBe('number');
    expect(typeof info.reissuable).toBe('boolean');
    expect(typeof info.scripted).toBe('boolean');
});

it('Asset distribution', async () => {
    const info = await api.assets.assetDistribution(STATE.ASSETS.BTC.id, 4000, 999);
    expect(typeof info.hasNext).toBe('boolean');
    expect(typeof info.lastItem).toBe('string');
    expect(info.items).toBeInstanceOf(Object);
});

const checkAssets = (object: IAssetsAddressLimit) => {
    expect(object).toMatchObject({
        senderPublicKey: expect.any(String),
        quantity: expect.any(Number),
        fee: expect.any(Number),
        description: expect.any(String),
        version: expect.any(Number),
        reissuable: expect.any(Boolean),
        sender: expect.any(String),
        chainId: expect.any(Number),
        assetId: expect.any(String),
        decimals: expect.any(Number),
        name: expect.any(String),
        id: expect.any(String)
    })
}

it('Assets address limit', async () => {
    const info = await api.assets.AssetsAddressLimit(STATE.ACCOUNTS.SIMPLE.address, 999);
    expect(info).toBeInstanceOf(Array);
    info.forEach(checkAssets);
});

const checkBalances = (object: TAssetBalance) => {
    expect(object).toMatchObject({
        assetId: expect.any(String),
        balance: expect.any(Number),
        reissuable: expect.any(Boolean),
        quantity: expect.any(String)
    })
}

it('Asset balance', async () => {
    const info = await api.assets.assetsBalance(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.address).toBe(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.balances).toBeInstanceOf(Array);
    info.balances.forEach(checkBalances);
});

it('Balance address assetId', async () => {
    const info = await api.assets.balanceAddressAssetId(STATE.ACCOUNTS.SIMPLE.address, STATE.ASSETS.BTC.id);
    expect(info.address).toBe(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.assetId).toBe(STATE.ASSETS.BTC.id);
    expect(typeof info.balance).toBe('number')
});