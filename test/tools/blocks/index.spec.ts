import { NODE_URL, NETWORK_BYTE, CHAIN_ID } from '../../_state';
import create from '../../../src'
import getNetworkCode from '../../../src/tools/blocks/getNetworkCode';
import getNetworkByte from '../../../src/tools/blocks/getNetworkByte';
import detectInterval from '../../../src/tools/blocks/detectInterval';
import waitHeight from '../../../src/tools/blocks/waitHeight';
import { fetchHeight } from '../../../src/api-node/blocks';


const { tools } = create(NODE_URL);

it('Get network byte by index', async () => {
    const byte = await tools.blocks.getNetworkByte();
    expect(byte).toBe(NETWORK_BYTE);
});

it('Get network byte by func', async () => {
    const byte = await getNetworkByte(NODE_URL);
    expect(byte).toBe(NETWORK_BYTE);
});

it('Get char code by index', async () => {
    const code = await tools.blocks.getNetworkCode();
    expect(code).toBe(CHAIN_ID);
});

it('Get char code by func', async () => {
    const code = await getNetworkCode(NODE_URL);
    expect(code).toBe(CHAIN_ID);
});

it('Detect node interval', async () => {
    const interval = await detectInterval(NODE_URL);
    expect(interval > 100).toBe(true);
    expect(interval < 20000).toBe(true);
});

test('Wait next block', async () => {
    await waitHeight(NODE_URL);
}, 30000);

test('Wait next block by number', async () => {
    const current = await fetchHeight(NODE_URL);
    await waitHeight(NODE_URL, current.height + 2);
}, 30000);
