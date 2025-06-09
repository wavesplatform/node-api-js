import { base58Encode } from '@waves/ts-lib-crypto';
import { keccak_256 } from '@noble/hashes/sha3';
import { blake2b } from '@noble/hashes/blake2b';

export default function ethAsset2Waves(ethAddress: string): string {
  if (!/^0x[0-9a-fA-F]{40}$/.test(ethAddress)) {
    throw new Error(`Invalid Ethereum Address: ${ethAddress}`);
  }

  const pkHashHex = ethAddress.slice(2).toLowerCase(); // remove "0x"
  const pkHashBytes = Buffer.from(pkHashHex, 'hex');   // 20 bytes

  const checksum = keccak_256(blake2b(pkHashBytes));
  const tailBytes = Buffer.from(checksum.slice(0, 12));  // 12 bytes

  const assetRaw = Buffer.concat([pkHashBytes, tailBytes]); // 32 bytes

  return base58Encode(assetRaw);
}
