import {MASTER_ACCOUNT, NODE_URL} from '../_state';
import {create} from '../../src';

import {commitToGeneration} from '@waves/waves-transactions';

const api = create(NODE_URL);

it('Finality info', async () => {
    const finalityInfo = await api.finality.fetchFinalityInfo()

    const tx = await api.transactions.broadcast(commitToGeneration({
        chainId: 82,
        generationPeriodStart: finalityInfo.nextGenerationPeriod!.start
    }, MASTER_ACCOUNT.SEED))

    await api.tools.transactions.wait(tx, {confirmations: 1})

    const newFinality = await api.finality.fetchFinalityInfo()
    expect(newFinality.nextGenerators).toContainEqual({
        commitTxnId: tx.id,
        balance: 0,
        address: MASTER_ACCOUNT.ADDRESS
    })

}, 10000)
