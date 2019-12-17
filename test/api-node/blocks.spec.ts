import { NODE_URL } from '../_state';
import { create } from '../../src';
import { fetchHeadersAt, fetchHeadersLast, IBlockHeader } from '../../src/api-node/blocks';


const api = create(NODE_URL);

const checkBlock = (block: IBlockHeader) => {
    // TODO blockSize
    expect(typeof block.reward).toBe('number');
    expect(typeof block.signature).toBe('string');
    expect(typeof block.generator).toBe('string');
    expect(typeof block.version).toBe('number');
    expect(typeof block.reference).toBe('string');
    expect(Array.isArray(block.features)).toBe(true);
    expect(typeof block.totalFee).toBe('number');
    // TODO desiredReward
    expect(typeof block.transactionCount).toBe('number');
    expect(typeof block.timestamp).toBe('number');
    expect(typeof block.height).toBe('number');
    // TODO nxt-consensus
};

it('fetchHeadersLast', async () => {
    checkBlock(await api.blocks.fetchHeadersLast());
    checkBlock(await fetchHeadersLast(NODE_URL));
});

it('fetchHeadersAt', async () => {
    checkBlock(await api.blocks.fetchHeadersAt(2));
    checkBlock(await fetchHeadersAt(NODE_URL, 2));
});
