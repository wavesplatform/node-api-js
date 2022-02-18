import {NODE_URL, STATE, CHAIN_ID} from '../_state';
import {create} from '../../src';
import {invokeScript, waitForTx, broadcast, transfer, libs} from '@waves/waves-transactions';
import {InvokeScriptTransaction} from "@waves/ts-types";
import {TLong} from "../../src/interface";
import {TWithState} from "../../src/tools/transactions/transactions";
import {isNullableStringOrNumber, isStringOrNumber} from '../extendedMatcher'
import {fetchBalanceHistory} from "../../src/api-node/debug";


const api = create(NODE_URL);


describe('State changes by transaction Id', () => {

    it('gets state changes', async () => {
        const itx = invokeScript({
            dApp: STATE.ACCOUNTS.FOR_SCRIPT.address,
            call: {
                function: 'call'
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
        const f = api.debug.fetchStateChangesByTxId('DvLdoLzts782sRia4BX1TH8HBmoP33b8Tp6ATTeNhrMk');
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

    it('state schanges in stage', async () =>{
        const api2: ReturnType<typeof create> = create('https://nodes-stagenet.wavesnodes.com/');
        //3MaPRBKB36GMoH59ShRKAzbHretBzqDYKxs
        const tx = await api2.transactions.fetchInfo("3rho1m5FfLmVi6iVfkVuvdEFVcv2JMEVxh9wzj7kFrCK")
        const txState = (tx as InvokeScriptTransaction<TLong> & TWithState).stateChanges

        console.log(txState.invokes)


    });

    it('Fetch Balance History', async () =>{   //AB
        const {address} = STATE.ACCOUNTS.SIMPLE;
        const tx = await api.debug.fetchBalanceHistory(address);
        let l = tx.length;

        for(let i=0;i<l;i++) {
            expect(typeof tx[i].height).toBe('number');
            expect(typeof tx[i].balance).isStringOrNumber();
        }
    });

})
