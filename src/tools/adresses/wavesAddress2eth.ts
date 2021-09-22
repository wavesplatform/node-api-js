import {base16Encode, base58Decode} from '@waves/ts-lib-crypto'

export default function wavesAddress2eth(wavesAddress: string): string {

    const rawBytes = base58Decode(wavesAddress);

    const bytes = rawBytes.slice(2, rawBytes.byteLength - 4)

    return `0x${base16Encode(bytes)}`;
}
