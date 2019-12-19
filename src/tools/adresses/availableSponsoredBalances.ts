import { TLong } from '../../interface';
import { BigNumber } from '@waves/bignumber';
import { fetchAssetsBalance, TAssetBalance } from '../../api-node/assets';
import { filter, map, pipe, prop } from '../utils';


export default function (base: string, address: string, wavesFee: TLong): Promise<Array<TAssetFeeInfo>> {
    return fetchAssetsBalance(base, address).then(
        pipe(
            prop('balances'),
            filter(canBeSponsor(wavesFee)),
            map(currentFee(wavesFee))
        )
    );
}

function canBeSponsor(wavesFee: TLong): (balance: TAssetBalance) => boolean {
    return balance => (
        balance.minSponsoredAssetFee
        && BigNumber.toBigNumber(balance.sponsorBalance || 0)
            .gte(wavesFee)
        && BigNumber.toBigNumber(wavesFee)
            .div(0.001 * Math.pow(10, 8))
            .mul(balance.minSponsoredAssetFee)
            .lte(balance.balance)
    ) || false;
}

function currentFee(wavesFee: TLong): (balance: TAssetBalance) => TAssetFeeInfo {
    const count = BigNumber.toBigNumber(wavesFee)
        .div(0.001 * Math.pow(10, 8));

    return balance => ({
        assetId: balance.assetId,
        wavesFee,
        assetFee: BigNumber.toBigNumber(balance.minSponsoredAssetFee!)
            .mul(count)
            .toFixed()
    });
}

export type TAssetFeeInfo = {
    assetId: string;
    wavesFee: TLong;
    assetFee: TLong;
}
