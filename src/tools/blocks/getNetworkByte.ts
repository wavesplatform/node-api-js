import { headersLast } from '../../api-node/blocks';

export default function (base: string): Promise<number> {
    return headersLast(base).then(header => base58Decode(header.generator)[1]);
}

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP: Record<string, number> = {};

for (let i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}

function base58Decode(string: string): Uint8Array {
    let bytes, c, carry, j, i;
    if (string.length === 0) {
        return new Uint8Array(0);
    }
    i = void 0;
    j = void 0;
    bytes = [0];
    i = 0;
    while (i < string.length) {
        c = string[i];
        if (!(c in ALPHABET_MAP)) {
            throw 'Base58.decode received unacceptable input. Character \'' + c + '\' is not in the Base58 alphabet.';
        }
        j = 0;
        while (j < bytes.length) {
            bytes[j] *= 58;
            j++;
        }
        bytes[0] += ALPHABET_MAP[c];
        carry = 0;
        j = 0;
        while (j < bytes.length) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
            ++j;
        }
        while (carry) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
        i++;
    }
    i = 0;
    while (string[i] === '1' && i < string.length - 1) {
        bytes.push(0);
        i++;
    }
    return new Uint8Array(bytes.reverse());
}