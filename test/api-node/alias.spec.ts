import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';

const api: ReturnType<typeof create> = create(NODE_URL);

it('By alias', async () => {
    const info = await api.alias.fetchByAlias(STATE.ACCOUNTS.SIMPLE.alias);
    expect(typeof info.address).toBe('string');
});

it('By address', async () => {
    const info = await api.alias.fetchByAddress(STATE.ACCOUNTS.SMART.address);
    expect(info).toBeInstanceOf(Array);
});