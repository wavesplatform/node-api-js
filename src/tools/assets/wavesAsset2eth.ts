import {base16Encode, base58Decode} from '@waves/ts-lib-crypto'

export default function wavesAsset2Eth(wavesAsset: string): string {

    const rawBytes = base58Decode(wavesAsset);

    const bytes = rawBytes.slice(0, 20)

    return base16Encode(bytes);
}
