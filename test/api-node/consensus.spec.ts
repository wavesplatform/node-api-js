import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';

const api: ReturnType<typeof create> = create(NODE_URL);

it('Generating balance', async () => {
    const info = await api.consensus.generatingBalance(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.address).toBe(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.balance).toBe(10000000000);
});

it('Basetarget', async () => {
    const info = await api.consensus.basetarget();
    expect(typeof info.baseTarget).toBe('number');
    expect(typeof info.score).toBe('string');
});

it('Consensus algo', async () => {
    const { consensusAlgo } = await api.consensus.consensusAlgo();
    expect(typeof consensusAlgo).toBe('string');
});

it('Generation signature blockId', async () => {
    const { generationSignature } = await api.consensus.generationSignatureBlockId("4CdaRUKnWkYRhkRdTvidbxceuk4myjCnxHEWvYrjoVpBf2cj9VQobqMa23TsoTrWXRWfyewyh2hSvYKyz5ytJaM7");
    expect(typeof generationSignature).toBe('string');
});

it('Basetarget BlockId', async () => {
    const { baseTarget } = await api.consensus.basetargetBlockId('4CdaRUKnWkYRhkRdTvidbxceuk4myjCnxHEWvYrjoVpBf2cj9VQobqMa23TsoTrWXRWfyewyh2hSvYKyz5ytJaM7');
    expect(typeof baseTarget).toBe('number');
});

it('Generation signature', async () => {
    const { generationSignature } = await api.consensus.generationSignature();
    expect(typeof generationSignature).toBe('string');
});
