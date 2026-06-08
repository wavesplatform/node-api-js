import { issue } from '@waves/waves-transactions';
import { CHAIN_ID, MASTER_ACCOUNT_SEED, SMART_ASSET_SCRIPT } from './constants';
import { broadcastAndWait } from './utils';

interface IAsset {
    name: string;
    quantity?: number;
    decimals?: number;
    description?: string;
    reissuable?: boolean;
    script?: boolean | string;
    owner?: string;
    sponsorship?: boolean;
}

export default async function createAssets(
    nodeUrl: string,
    assets: Record<string, IAsset>,
    accounts: Record<string, { seed: string }>
): Promise<Record<string, any>> {
    const entries = await Promise.all(
        Object.entries(assets).map(async ([key, asset]) => {
            console.log(`Create asset ${key}`);
            const tx = issue({
                chainId: CHAIN_ID,
                script: typeof asset.script === 'boolean' ? SMART_ASSET_SCRIPT : asset.script,
                name: asset.name,
                description: asset.description || `${asset.name} description`,
                reissuable: asset.reissuable || false,
                quantity: asset.quantity || 1000000 * Math.pow(10, 8),
                decimals: typeof asset.decimals === 'number' && asset.decimals >= 0 ? asset.decimals : 8
            }, asset.owner ? accounts[asset.owner].seed : MASTER_ACCOUNT_SEED);

            await broadcastAndWait(nodeUrl, tx);
            return { [key]: tx };
        })
    );

    return entries.reduce((acc, item) => Object.assign(acc, item), Object.create(null));
}
