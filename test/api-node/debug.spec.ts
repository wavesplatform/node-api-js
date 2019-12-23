import {NODE_URL, STATE, CHAIN_ID} from '../_state';
import {create} from '../../src';
import {invokeScript, waitForTx, broadcast, transfer, libs} from '@waves/waves-transactions';


const api = create(NODE_URL);


describe('State changes by transaction Id', () => {

    it('gets state changes', async () => {
        const itx = invokeScript({
            dApp: STATE.ACCOUNTS.FOR_SCRIPT.address,
            call: {
                function: 'foo'
            },
            chainId: CHAIN_ID
        }, STATE.ACCOUNTS.SIMPLE.seed);
        await broadcast(itx, NODE_URL);
        await waitForTx(itx.id, {apiBase: NODE_URL});

        const stateChanges = (await api.debug.fetchStateChangesByTxId(itx.id)).stateChanges;
        expect(stateChanges.data).toStrictEqual([]);
        expect(stateChanges.transfers).toStrictEqual([])
    });

    it('throws on not found tx', async () => {
        const f = api.debug.fetchStateChangesByTxId('DvLdoLzts782sRia4BX1TH8HBmoP33b8Tp6ATTeNhrMk')
        expect(f).rejects.toMatchObject({error: 311})
    });

    it('throws on not invoke script tx', async () => {
        const ttx = transfer({
            amount: 1000,
            recipient: libs.crypto.address(STATE.ACCOUNTS.SIMPLE.seed,
                CHAIN_ID)
        }, STATE.ACCOUNTS.SIMPLE.seed);
        await broadcast(ttx, NODE_URL);
        await waitForTx(ttx.id, {apiBase: NODE_URL});
        const f = api.debug.fetchStateChangesByTxId(ttx.id);
        expect(f).rejects.toMatchObject({error: 312})
    });
})
