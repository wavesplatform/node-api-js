import { alias, data, lease, libs, setScript, transfer } from '@waves/waves-transactions';
import { fetchBalanceDetails } from '../../src/api-node/addresses';
import { ACCOUNT_SCRIPT, CHAIN_ID, DAP_SCRIPT, MASTER_ACCOUNT_SEED } from './constants';
import { broadcastAndWait } from './utils';

interface IAccount {
    seed?: string;
    script?: boolean | string;
    alias?: boolean | string;
    balance?: Record<string, string | number>;
    data?: Record<string, { value: string | boolean | number; type: 'string' | 'boolean' | 'integer' | 'binary' }>;
    lease?: { amount: string | number };
}

interface IAccountResult {
    seed: string;
    alias: string | undefined;
    address: string;
    publicKey: string;
    scripted: boolean;
    data: IAccount['data'];
    lease: IAccount['lease'];
}

export default async function createAccounts(
    nodeUrl: string,
    accounts: Record<string, IAccount>
): Promise<Record<string, IAccountResult>> {
    const entries = await Promise.all(
        Object.entries(accounts).map(async ([key, account]) => {
            const seed = account.seed || libs.crypto.randomSeed();
            const address = libs.crypto.address(seed, CHAIN_ID);
            const publicKey = libs.crypto.publicKey(seed);
            const userAlias = account.alias
                ? typeof account.alias === 'string'
                    ? account.alias
                    : `${key}@${Date.now()}`.toLocaleLowerCase()
                : undefined;

            console.log(`Add account ${key} ${address}`);

            await setBalance(nodeUrl, address, 100 * Math.pow(10, 8));

            if (userAlias) {
                const tx = alias({
                    chainId: CHAIN_ID,
                    alias: userAlias,
                    additionalFee: 0.001 * Math.pow(10, 8)
                }, seed);
                await broadcastAndWait(nodeUrl, tx);
            }

            if (account.data) {
                await Promise.all(
                    Object.entries(account.data).map(async ([key, { type, value }]) => {
                        const tx = data({
                            chainId: CHAIN_ID,
                            data: [{ key, type, value } as any]
                        }, seed);
                        await broadcastAndWait(nodeUrl, tx);
                    })
                );
            }

            if (account.script) {
                const script = typeof account.script === 'boolean'
                    ? ACCOUNT_SCRIPT
                    : account.script === 'dApp'
                        ? DAP_SCRIPT
                        : account.script;
                await addScript(nodeUrl, seed, script);
            }

            if (account.lease) {
                const randomAddress = libs.crypto.address(libs.crypto.randomSeed(), CHAIN_ID);
                await setLeasing(nodeUrl, randomAddress, Math.pow(10, 8));
            }

            const { available } = await fetchBalanceDetails(nodeUrl, address);
            const toSend = 100 * Math.pow(10, 8) - (+available);
            await setBalance(nodeUrl, address, toSend);

            return {
                [key]: { seed, alias: userAlias, address, publicKey, scripted: !!account.script, data: account.data, lease: account.lease }
            };
        })
    );

    return entries.reduce((acc, item) => Object.assign(acc, item), Object.create(null));
}

async function setBalance(nodeUrl: string, recipient: string, amount: number, assetId?: string): Promise<void> {
    const tx = transfer({
        recipient,
        amount,
        assetId,
        additionalFee: 0.004 * Math.pow(10, 8)
    } as any, MASTER_ACCOUNT_SEED);
    await broadcastAndWait(nodeUrl, tx);
}

async function setLeasing(nodeUrl: string, recipient: string, amount: number): Promise<void> {
    const tx = lease({
        chainId: CHAIN_ID,
        recipient,
        amount,
        additionalFee: 0.004 * Math.pow(10, 8)
    }, MASTER_ACCOUNT_SEED);
    await broadcastAndWait(nodeUrl, tx);
}

async function addScript(nodeUrl: string, seed: string, script: string): Promise<void> {
    const tx = setScript({
        chainId: CHAIN_ID,
        script,
        additionalFee: 0.004 * Math.pow(10, 8)
    }, seed);
    await broadcastAndWait(nodeUrl, tx);
}
