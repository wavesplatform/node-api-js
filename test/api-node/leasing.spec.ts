import { NODE_URL, STATE } from '../_state';
import { create } from '../../src';
import { ILeaseTransaction } from '@waves/ts-types';
import { IWithApiMixin } from '@waves/ts-types';
import { TLong } from '../../src/interface';
import { IActive } from '../../src/api-node/leasing';

const api: ReturnType<typeof create> = create(NODE_URL);

const checkObj = (object: ILeaseTransaction<TLong> & IWithApiMixin & IActive) => {
    expect(object).toMatchObject({
        senderPublicKey: expect.any(String),
        amount: expect.any(Number),
        sender: expect.any(String),
        // @TODO: Подумать над реализацией, может либо string либо null
        // feeAssetId: expect.anything(),
        proofs: expect.any(Array),
        fee: expect.any(Number),
        recipient: expect.any(String),
        id: expect.any(String),
        type: expect.any(Number),
        version: expect.any(Number),
        timestamp: expect.any(Number),
        height: expect.any(Number)
    })
}
it('Active', async () => {
    const info = await api.leasing.active(STATE.ACCOUNTS.SIMPLE.address);
    expect(info).toBeInstanceOf(Array);
    info.forEach(checkObj);
});