import { NODE_URL } from '../_state';
import { create } from '../../src';
import { IFeatures } from '../../src/api-node/activation';
import { TLong } from '../../src/interface';

const api: ReturnType<typeof create> = create(NODE_URL);

const CheckFeatures = (object: IFeatures<TLong>) => {
    expect(object).toMatchObject({
        id: expect.any(Number),
        description: expect.any(String),
        blockchainStatus: expect.any(String),
        nodeStatus: expect.any(String),
        activationHeight: expect.any(Number)
    })
}

it('Activation status', async () => {
    const info = await api.activation.fetchActivationStatus();
    expect(typeof info.height).toBe('number');
    expect(typeof info.votingInterval).toBe('number');
    expect(typeof info.votingThreshold).toBe('number');
    expect(info.features).toBeInstanceOf(Array);
    info.features.forEach(CheckFeatures);
});