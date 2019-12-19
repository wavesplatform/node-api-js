import { NODE_URL } from '../_state';
import { create } from '../../src';

const api: ReturnType<typeof create> = create(NODE_URL);

it('Node status', async () => {
    const info = await api.node.fetchNodeStatus();
    expect(typeof info.blockchainHeight).toBe('number');
    expect(typeof info.stateHeight).toBe('number');
    expect(typeof info.updatedTimestamp).toBe('number');
    expect(typeof info.updatedDate).toBe('string');
});

it('Node version', async () => {
    const { version } = await api.node.fetchNodeVersion();
    expect(typeof version).toBe('string');
});