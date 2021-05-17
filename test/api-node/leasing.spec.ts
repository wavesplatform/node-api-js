// import {NODE_URL, STATE} from '../_state';
import {create} from '../../src';
import {LeaseTransaction, WithApiMixin} from '@waves/ts-types';
import {TLong} from '../../src/interface';
import {IActive} from '../../src/api-node/leasing';

const api: ReturnType<typeof create> = create('https://nodes-stagenet.wavesnodes.com/');

const checkObj = (object: LeaseTransaction<TLong> & WithApiMixin & IActive) => {
    expect(object).toMatchObject({
        senderPublicKey: expect.any(String),
        amount: expect.any(Number),
        sender: expect.any(String),
        /**
         * @TODO: Подумать над реализацией, может либо string либо null
         * feeAssetId: expect.anything(),
         */
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
// it('Active', async () => {
//     const info = await api.leasing.fetchActive(STATE.ACCOUNTS.SIMPLE.address);
//     expect(info).toBeInstanceOf(Array);
//     info.forEach(checkObj);
// });

it('Leasing info', async () => {
    const ids = ['AbkVZ6EzuUESkQZUHSFtUHdoRQh4khTD66eGc73CmTeg', 'GGSK8RGLRM2j1Hx9FhQjBaFptmbZgGzX93NKToGE1Bjn']
    const info = await api.leasing.fetchLeasingInfo(ids)
    console.log(info)
})
