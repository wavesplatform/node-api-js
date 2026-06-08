import { transfer } from '@waves/waves-transactions';
import { MASTER_ACCOUNT_SEED } from './constants';
import { broadcastAndWait } from './utils';

interface IAccount {
    balance?: Record<string, string | number>;
}

export default async function setBalances(
    nodeUrl: string,
    stateAccounts: Record<string, IAccount>,
    assets: Record<string, { id: string }>,
    accounts: Record<string, { address: string }>
): Promise<void> {
    await Promise.all(
        Object.entries(stateAccounts).map(async ([key, account]) => {
            if (account.balance) {
                await Promise.all(
                    Object.entries(account.balance).map(async ([name, count]) => {
                        const tx = transfer({
                            recipient: accounts[key].address,
                            amount: count as number,
                            assetId: assets[name].id,
                            additionalFee: 0.004 * Math.pow(10, 8)
                        }, MASTER_ACCOUNT_SEED);
                        await broadcastAndWait(nodeUrl, tx);
                    })
                );
            }
        })
    );
}
