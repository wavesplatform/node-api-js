import { keccak, blake2b, base58Encode, stringToBytes } from '@waves/ts-lib-crypto'
/*
    eth 0x11242d6ec6B50713026a3757cAeb027294C2242a
    waves 3EzjTrzQB57shiN4RwUi9ikC44FBGRzZ81G
    chainId - C
*/

export default function eth2waves(ethAddress: string, chainId: number): string {
    const prefixBytes = new Uint8Array([0x01, chainId]);

    // Раскодировать HEX строку в байты (PK_HASH)                     
    const pkHashBytes = stringToBytes(ethAddress);                          

    // Сделать чексумму CHECKSUM=keccak256(blake2b256([0x01, CHAIN_ID] + PK_HASH))
    const checksumBytes = new Uint8Array([
        ...prefixBytes,
        ...pkHashBytes
    ]);
    const checksum = keccak(blake2b(checksumBytes));      

    // склеить [0x01, CHAIN_ID] (два байта) + PK_HASH (изначальные 20 байт) + CHECKSUM[1:4] (первые четыре байта чексуммы)
    const wavesBytes = new Uint8Array([
        ...prefixBytes,
        ...pkHashBytes.slice(0, 20),
        ...checksum.slice(0, 4)
    ]);

    // закодировать в base58
    const wavesAddress = base58Encode(wavesBytes);

    return wavesAddress;
}
