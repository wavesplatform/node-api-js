import {NODE_URL} from '../_state';
import {create} from '../../src';
import {fetchHeadersAt, fetchHeadersLast, IBlockHeader} from '../../src/api-node/blocks';


const api = create(NODE_URL);

const checkBlockHeader = (block: IBlockHeader) => {
    expect(typeof block.blocksize).toBe('number');
    expect(typeof block.reward).toBe('number');
    expect(typeof block.desiredReward).toBe('number');
    expect(typeof block.signature).toBe('string');
    expect(typeof block.generator).toBe('string');
    expect(typeof block.version).toBe('number');
    expect(typeof block.reference).toBe('string');
    expect(block.features).toBeInstanceOf(Array)
    expect(typeof block.totalFee).toBe('number');
    expect(typeof block.transactionCount).toBe('number');
    expect(typeof block.timestamp).toBe('number');
    expect(typeof block.height).toBe('number');
    expect(typeof block.VRF).toBe('string');
    expect(typeof block.id).toBe('string');
    expect(typeof block["nxt-consensus"]["base-target"]).toBe('number')
    expect(typeof block["nxt-consensus"]["generation-signature"]).toBe('string')
};

it('fetchHeadersLast', async () => {
    checkBlockHeader(await api.blocks.fetchHeadersLast());
    checkBlockHeader(await fetchHeadersLast(NODE_URL));
});

it('fetchHeadersAt', async () => {
    checkBlockHeader(await api.blocks.fetchHeadersAt(2));
    checkBlockHeader(await fetchHeadersAt(NODE_URL, 2));
});

it('fetchHeightById', async () => {
    const {id, height} = await api.blocks.fetchHeadersLast();
    const info = await api.blocks.fetchHeightById(id);
    expect(info.height).toBe(height)
});

it('fetchHeightByTimestamp', async () => {   //AB
    const {timestamp, height} = await api.blocks.fetchHeadersLast();
    const info = await api.blocks.fetchHeightByTimestamp(timestamp);
    expect(info.height).toBe(height)
});

it('fetchHeadersSeq', async () => {
    const {height} = await api.blocks.fetchHeadersLast();
    const minHeight = height - 100 > 1 ? height - 100 : 2;
    const info = await api.blocks.fetchHeadersSeq(minHeight, height - 1);
    expect(info).toBeInstanceOf(Array);
    info.forEach(checkBlockHeader);
});

it('first block', async () => {
    const genesis = await api.blocks.fetchFirst();

    expect(genesis.version).toBe(1);
    expect(genesis.height).toBe(1);
    expect(genesis.totalFee).toBe(0);
    expect(genesis.fee).toBe(0);
    expect(genesis.transactions).toBeInstanceOf(Array);
    expect(genesis.transactionCount).toBe(genesis.transactions.length);
    expect(typeof genesis.timestamp).toBe('number');
    expect(typeof genesis.reference).toBe('string');
    expect(typeof genesis.generator).toBe('string');
    expect(typeof genesis.generatorPublicKey).toBe('string');
    expect(typeof genesis.signature).toBe('string');
    expect(typeof genesis.blocksize).toBe('number');
    expect(typeof genesis.reward).toBe('number');
    expect(typeof genesis.id).toBe('string');
    expect(typeof genesis["nxt-consensus"]["base-target"]).toBe('number')
    expect(typeof genesis["nxt-consensus"]["generation-signature"]).toBe('string')
});

it('fetch block delay', async () => {
    const { height } = await api.blocks.fetchHeadersLast();
    const { id } = await api.blocks.fetchHeadersAt(Math.floor(height / 2));
    const { delay } = await api.blocks.fetchDelay(id, height);
    expect(typeof delay).toBe('number');
});

it('block last', async () => {
    const block  = await api.blocks.fetchLast();
    checkBlockHeader(block);
    expect(block.transactions).toBeInstanceOf(Array);
    expect(block.transactionCount).toBe(block.transactions.length);
});

it('block at', async () => {
    const { height } = await api.blocks.fetchHeadersLast();
    const block  = await api.blocks.fetchBlockAt(height - 1);
    checkBlockHeader(block);
    expect(block.transactions).toBeInstanceOf(Array);
    expect(block.transactionCount).toBe(block.transactions.length);
});

it('blocks by address', async () => {
    const { generator, height } = await api.blocks.fetchHeadersLast();
    const minHeight = height - 10 > 1 ? height - 10 : 2;
    const blocks  = await api.blocks.fetchBlocksByAddress(generator, minHeight, height);

    blocks.forEach(checkBlockHeader);
});

it('block by id', async () => {
    const { id } = await api.blocks.fetchHeadersLast();
    const block  = await api.blocks.fetchBlockById(id);

    checkBlockHeader(block);
    expect(block.transactions).toBeInstanceOf(Array);
    expect(block.transactionCount).toBe(block.transactions.length);
});

it('block headers by id', async () => {
    const { id } = await api.blocks.fetchHeadersLast();
    const block  = await api.blocks.fetchHeadersById(id);

    checkBlockHeader(block);
});

it('blocks seq', async () => {
    const {height} = await api.blocks.fetchHeadersLast();
    const minHeight = height - 10 > 1 ? height - 10 : 2;
    const blocks = await api.blocks.fetchSeq(minHeight, height - 1);
    expect(blocks).toBeInstanceOf(Array);
    blocks.forEach(checkBlockHeader);
});