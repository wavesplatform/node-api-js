import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';
import { IScriptInfo, fetchScriptInfo } from '../../src/api-node/addresses';


const api: ReturnType<typeof create> = create(NODE_URL);

const checkSmartAccount = (info: IScriptInfo, address: string) => {
    expect(info.address).toBe(address);
    expect(typeof info.complexity).toBe('number');
    expect(info.extraFee).toBe(0.004 * Math.pow(10, 8));
    expect(typeof info.script).toBe('string');
    expect(typeof info.scriptText).toBe('string');
};

const checkNotSmart = (info: IScriptInfo, address: string) => {
    expect(info.address).toBe(address);
    expect(typeof info.complexity).toBe('number');
    expect(info.extraFee).toBe(0);
    expect(info.script).toBe(null);
    expect(info.scriptText).toBe(null);
};

it('Script info smart', async () => {
    const info = await fetchScriptInfo(NODE_URL, STATE.ACCOUNTS.SMART.address);
    checkSmartAccount(info, STATE.ACCOUNTS.SMART.address);
});

it('Script info simple', async () => {
    const info = await api.addresses.fetchScriptInfo(STATE.ACCOUNTS.SIMPLE.address);
    checkNotSmart(info, STATE.ACCOUNTS.SIMPLE.address);
});

it('dataKey', async () => {
    const key = await api.addresses.fetchDataKey(STATE.ACCOUNTS.SIMPLE.address, 'key');
    expect(key.type).toBe(STATE.ACCOUNTS.SIMPLE.data.key.type);
    expect(key.value).toBe(STATE.ACCOUNTS.SIMPLE.data.key.value);
});

it('Script info meta', async () => {
    const info = await api.addresses.fetchScriptInfoMeta(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.meta).toBe(undefined);
});

it('balance details', async () => {
    const { address } = STATE.ACCOUNTS.SIMPLE;
    const balanceDetails = await api.addresses.fetchBalanceDetails(address);

    expect(balanceDetails.address).toBe(address);
    expect(typeof balanceDetails.regular).toBe('number');
    expect(typeof balanceDetails.generating).toBe('number');
    expect(typeof balanceDetails.available).toBe('number');
    expect(typeof balanceDetails.effective).toBe('number');
});
