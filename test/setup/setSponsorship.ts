import { sponsorship } from '@waves/waves-transactions';
import { CHAIN_ID, MASTER_ACCOUNT_SEED } from './constants';
import { broadcastAndWait } from './utils';

interface IAsset {
    name: string;
    owner?: string;
    sponsorship?: boolean;
}

export default async function setSponsorship(
    nodeUrl: string,
    stateAssets: Record<string, IAsset>,
    assets: Record<string, { id: string }>,
    accounts: Record<string, { seed: string }>
): Promise<Record<string, any>> {
    const sponsorshipAssets = Object.entries(stateAssets)
        .filter(([, asset]) => asset.sponsorship)
        .reduce<Record<string, IAsset>>((acc, [key, asset]) => ({ ...acc, [key]: asset }), {});

    const entries = await Promise.all(
        Object.entries(sponsorshipAssets).map(async ([key, asset]) => {
            console.log(`${key} sponsorship ${asset.name}`);
            const tx = sponsorship({
                assetId: assets[key].id,
                minSponsoredAssetFee: 1,
                chainId: CHAIN_ID,
            }, asset.owner ? accounts[asset.owner].seed : MASTER_ACCOUNT_SEED);
            await broadcastAndWait(nodeUrl, tx);
            return { [key]: tx };
        })
    );

    return entries.reduce((acc, item) => Object.assign(acc, item), Object.create(null));
}
