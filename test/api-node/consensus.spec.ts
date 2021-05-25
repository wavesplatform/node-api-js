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
