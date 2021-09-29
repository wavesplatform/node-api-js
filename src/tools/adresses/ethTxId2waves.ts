import { base58Encode, base16Decode } from '@waves/ts-lib-crypto';

export default function ethTxId2waves(ethTxId: string): string {
    return base58Encode(base16Decode(ethTxId));
}
