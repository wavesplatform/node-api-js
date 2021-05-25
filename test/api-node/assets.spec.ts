import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';
import {TAssetBalance, IAssetsAddressLimit, TAssetDetails, TErrorResponse} from '../../src/api-node/assets';
import { TLong } from '../../src/interface';
import { isNullableStringOrNumber, isStringOrNumber } from  '../extendedMatcher'

const api: ReturnType<typeof create> = create(NODE_URL);



const checkAsset = (object: TAssetDetails) => {
    
    expect(object).toMatchObject({
        
        assetId: expect.any(String),
        issueHeight: expect.any(Number),
        issueTimestamp: expect.any(Number),
        issuer: expect.any(String),
        issuerPublicKey: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        decimals: expect.any(Number),
        reissuable: expect.any(Boolean),
        quantity: expect.isStringOrNumber(),
        scripted: expect.any(Boolean),
        minSponsoredAssetFee: expect.isNullableStringOrNumber(),
        originTransactionId: expect.any(String)
    })
}

it('details array', async () => {
    const info = await api.assets.fetchAssetsDetails([STATE.ASSETS.BTC.id, STATE.ASSETS.ETH.id]);
    expect(info).toBeInstanceOf(Array);
    info
        .filter((asset: TAssetDetails | TErrorResponse) => asset.hasOwnProperty('error'))
        .forEach((x) => checkAsset(x as TAssetDetails));
});

it('details string', async () => {
    /**
     * TODO @tsigel тут с перегрузками надо разобраться
     */
    const info: TAssetDetails<TLong> = await api.assets.fetchDetails(STATE.ASSETS.BTC.id as any) as any;
    expect(typeof info.assetId).toBe('string');
    expect(typeof info.issueHeight).toBe('number');
    expect(typeof info.issueTimestamp).toBe('number');
    expect(typeof info.issuer).toBe('string');
    expect(typeof info.issuerPublicKey).toBe('string');
    expect(typeof info.name).toBe('string');
    expect(typeof info.description).toBe('string');
    expect(typeof info.decimals).toBe('number');
    expect(typeof info.reissuable).toBe('boolean');
    expect(typeof info.quantity).toBe('string');
    expect(typeof info.scripted).toBe('boolean');
    expect(info.minSponsoredAssetFee).toBe(null);
    expect(typeof info.originTransactionId).toBe('string');
});

it('Asset distribution', async () => {
    const { height } = await api.blocks.fetchHeight();
    const info = await api.assets.fetchAssetDistribution(STATE.ASSETS.BTC.id, height-1, 500);
    expect(typeof info.hasNext).toBe('boolean');
    expect(typeof info.lastItem).toBe('string');
    expect(info.items).toBeInstanceOf(Object);
});

const checkAssets = (object: IAssetsAddressLimit) => {
    expect(object).toMatchObject({
        assetId: expect.any(String),
        issueHeight: expect.any(Number),
        issueTimestamp: expect.any(Number),
        issuer: expect.any(String),
        issuerPublicKey: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        decimals: expect.any(Number),
        reissuable: expect.any(Boolean),
        quantity: expect.isStringOrNumber(),
        scripted: expect.any(Boolean),
        minSponsoredAssetFee: expect.isStringOrNumber(),
        originTransactionId: expect.any(String)
    })
}

it('Assets address limit', async () => {
    const info = await api.assets.fetchAssetsAddressLimit(STATE.ACCOUNTS.SIMPLE.address, 999);
    expect(info).toBeInstanceOf(Array);
    info.forEach(checkAssets);
});

const checkBalances = (object: TAssetBalance) => {
    expect(object).toMatchObject({
        assetId: expect.any(String),
        balance: expect.isStringOrNumber(),
        reissuable: expect.any(Boolean),
        quantity: expect.isStringOrNumber(),
    })
}

it('Asset balance', async () => {
    const info = await api.assets.fetchAssetsBalance(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.address).toBe(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.balances).toBeInstanceOf(Array);
    info.balances.forEach(checkBalances);
});

it('Balance address assetId', async () => {
    const info = await api.assets.fetchBalanceAddressAssetId(STATE.ACCOUNTS.SIMPLE.address, STATE.ASSETS.BTC.id);
    expect(info.address).toBe(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.assetId).toBe(STATE.ASSETS.BTC.id);
    expect(typeof info.balance).isStringOrNumber();
});
