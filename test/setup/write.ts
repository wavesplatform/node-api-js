import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { libs, alias } from '@waves/waves-transactions';
import { broadcast } from '../../src/api-node/transactions';
import { MASTER_ACCOUNT_SEED, CHAIN_ID, SMART_ASSET_SCRIPT, DAP_SCRIPT, ACCOUNT_SCRIPT } from './constants';
import createAccounts from './createAccounts';
import createAssets from './createAssets';
import setBalances from './setBalances';
import setSponsorship from './setSponsorship';

const DEFAULT_CONFIG = path.join(__dirname, 'config.json');

export async function writeState(nodeUrl: string, outPath: string): Promise<void> {
    broadcast(nodeUrl, alias({ alias: 'master', chainId: CHAIN_ID }, MASTER_ACCOUNT_SEED)).catch(() => null);

    const config = JSON.parse(await readFile(DEFAULT_CONFIG, 'utf8'));
    const ACCOUNTS = await createAccounts(nodeUrl, config.ACCOUNTS || {});
    const ASSETS = await createAssets(nodeUrl, config.ASSETS || {}, ACCOUNTS);
    await setBalances(nodeUrl, config.ACCOUNTS || {}, ASSETS, ACCOUNTS);
    const SPONSORSHIPS = await setSponsorship(nodeUrl, config.ASSETS || {}, ASSETS, ACCOUNTS);

    console.log('Success creating state!');

    const content = [
        exportConst('MASTER_ACCOUNT', {
            SEED: MASTER_ACCOUNT_SEED,
            ADDRESS: libs.crypto.address(MASTER_ACCOUNT_SEED, CHAIN_ID),
            PUBLIC_KEY: libs.crypto.publicKey(MASTER_ACCOUNT_SEED),
            ALIAS: 'master',
        }),
        exportConst('NODE_URL', nodeUrl),
        exportConst('CHAIN_ID', CHAIN_ID),
        exportConst('NETWORK_BYTE', CHAIN_ID.charCodeAt(0)),
        exportConst('SMART_ASSET_SCRIPT', SMART_ASSET_SCRIPT),
        exportConst('DAP_SCRIPT', DAP_SCRIPT),
        exportConst('ACCOUNT_SCRIPT', ACCOUNT_SCRIPT),
        '',
        `export const STATE = ${JSON.stringify({ ACCOUNTS, ASSETS, SPONSORSHIPS }, null, 4)};`,
    ].join('\n');

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, content);
}

const exportConst = (name: string, value: unknown) =>
    `export const ${name} = ${JSON.stringify(value, null, 4)};`;
