import { TLong } from '../../interface';
export default function (base: string, address: string, wavesFee: TLong): Promise<Array<TAssetFeeInfo>>;
export declare type TAssetFeeInfo = {
    assetId: string;
    wavesFee: TLong;
    assetFee: TLong;
};
