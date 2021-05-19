import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';

const api: ReturnType<typeof create> = create(NODE_URL);

it('Generating balance', async () => {
    const info = await api.consensus.fetchGeneratingBalance(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.address).toBe(STATE.ACCOUNTS.SIMPLE.address);
    expect(typeof info.balance).toBe('number');
});

it('Basetarget', async () => {
    const info = await api.consensus.fetchBasetarget();
    expect(typeof info.baseTarget).toBe('number');
});

it('Consensus algo', async () => {
    const { consensusAlgo } = await api.consensus.fetchConsensusAlgo();
    expect(typeof consensusAlgo).toBe('string');
});

it('Generation signature blockId', async () => {
    const info = await api.consensus.fetchBasetarget();
    console.log(info)
    expect(typeof info.baseTarget).toBe('number');
    const { signature } = await api.blocks.fetchHeadersLast();
    const { generationSignature } = await api.consensus.fetchGenerationSignatureBlockId(signature);
    expect(typeof generationSignature).toBe('string');
});

it('Basetarget BlockId', async () => {
    const info = await api.consensus.fetchBasetarget();
    expect(typeof info.baseTarget).toBe('number');
    const { signature } = await api.blocks.fetchHeadersLast();
    const { baseTarget } = await api.consensus.fetchBasetargetBlockId(signature);
    expect(typeof baseTarget).toBe('number');
});
