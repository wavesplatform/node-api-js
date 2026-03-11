import {NODE_URL, STATE, CHAIN_ID} from '../_state';
import {create} from '../../src';
import {invokeScript} from '@waves/waves-transactions';
import {InvokeScriptTransaction, InvokeScriptTransactionFromNode} from "@waves/ts-types";
import {TLong} from "../../src/interface";
import {isNullableStringOrNumber, isStringOrNumber} from '../extendedMatcher'
import {fetchBalanceHistory} from "../../src/api-node/debug";
import {broadcast} from "../../src/api-node/transactions";
import {waitForTx} from "../../src/nodeInteraction";


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
        await broadcast(NODE_URL, itx);
        await waitForTx(itx.id, {apiBase: NODE_URL});

        const stateChanges = (await api.debug.fetchStateChangesByTxId(itx.id)).stateChanges;
        expect(stateChanges).not.toBeNull()
        expect(stateChanges!.data).toStrictEqual([]);
        expect(stateChanges!.transfers).toStrictEqual([])
    });

    it('throws on not found tx', async () => {
        // const f = await api.debug.fetchStateChangesByTxId('DvLdoLzts782sRia4BX1TH8HBmoP33b8Tp6ATTeNhrMk');
        // console.log('throws on not found tx', f)
        await expect(api.debug.fetchStateChangesByTxId('DvLdoLzts782sRia4BX1TH8HBmoP33b8Tp6ATTeNhrMk')).rejects.toMatchObject({"error": 311, "message": "transactions does not exist",})
    });

    it('state schanges in stage', async () => {
        const api2: ReturnType<typeof create> = create('https://nodes-stagenet.wavesnodes.com/');
        //3MaPRBKB36GMoH59ShRKAzbHretBzqDYKxs
        const tx = await api2.transactions.fetchInfo("3rho1m5FfLmVi6iVfkVuvdEFVcv2JMEVxh9wzj7kFrCK")
        const txState = (tx as InvokeScriptTransactionFromNode).stateChanges
        expect(Array.isArray(txState!.invokes)).toBeTruthy()
    });

    it('Fetch Balance History', async () => {
        const {address} = STATE.ACCOUNTS.SIMPLE;
        const tx = await api.debug.fetchBalanceHistory(address);
        let l = tx.length;

        for (let i = 0; i < l; i++) {
            expect(typeof tx[i].height).toBe('number');
            expect(typeof tx[i].balance).isStringOrNumber();
        }
    });

})
