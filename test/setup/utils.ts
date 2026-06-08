import { broadcast } from '../../src/api-node/transactions';
import wait from '../../src/tools/transactions/wait';

export async function broadcastAndWait(nodeUrl: string, tx: any): Promise<void> {
    try {
        const broadcastedTx = await broadcast(nodeUrl, tx);
        await wait(nodeUrl, broadcastedTx);
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        console.error(`Can't send transaction! ${JSON.stringify(tx, null, 4)}\nError: ${message}`);
    }
}
