import { base58Encode } from '@waves/ts-lib-crypto';
import { keccak_256 } from '@noble/hashes/sha3';
import { blake2b } from '@noble/hashes/blake2b';

// Função para converter hexadecimal para Uint8Array
function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error("Invalid hex string");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

// Função para concatenar Uint8Arrays
function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

export default function ethAsset2Waves(ethAddress: string): string {
  if (!/^0x[0-9a-fA-F]{40}$/.test(ethAddress)) {
    throw new Error(`Invalid Ethereum Address: ${ethAddress}`);
  }

  const pkHashHex = ethAddress.slice(2).toLowerCase(); // remove "0x"
  const pkHashBytes = hexToBytes(pkHashHex);           // 20 bytes

  const checksum = keccak_256(blake2b(pkHashBytes));
  const tailBytes = checksum.slice(0, 12);              // 12 bytes

  const assetRaw = concatBytes(pkHashBytes, tailBytes); // 32 bytes

  return base58Encode(assetRaw);
}
