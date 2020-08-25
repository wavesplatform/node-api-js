import request from '../../tools/request';
import stringify from '../../tools/stringify';
import { TTransactionFromAPI } from '@waves/ts-types';
import { TLong } from '../../interface';

/**
 * GET /utils/seed
 * Generate random seed
 */
export function fetchSeed(base: string, length?: number): Promise<{ seed: string }> {
    return request({
        base,
        url: `/utils/seed${length ? `/${length}` : ''}`
    })
}

/**
 * POST /utils/script/compileCode
 * Compiles string code to base64 script representation
 */
export function fetchCompileCode(base: string, body: string): Promise<ICompileCode> {
    return request({
        base,
        url: '/utils/script/compileCode',
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/script/compileWithImports
 * Compiles string code with imports to base64 script representation
 */
export function fetchCompileWithImports(base: string, body: ICompileWithImportsBody): Promise<ICompileCode> {
    return request({
        base,
        url: '/utils/script/compileWithImports',
        options: {
            method: 'POST',
            body: stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/script/estimate
 * Estimates compiled code in Base64 representation
 */
export function fetchEstimate(base: string, body: string): Promise<IEstimate> {
    return request({
        base,
        url: '/utils/script/estimate',
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/transactionSerialize
 * Serialize transaction
 */
export function fetchTransactionSerialize(base: string, body: TTransactionFromAPI<TLong>): Promise<ITransactionSerialize> {
    return request({
        base,
        url: '/utils/transactionSerialize',
        options: {
            method: 'POST',
            body: stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/hash/secure
 * Return SecureCryptographicHash of specified message
 */
export function fetchHashSecure(base: string, body: string): Promise<IHashSecure> {
    return request({
        base,
        url: '/utils/hash/secure',
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/hash/fast
 * Return FastCryptographicHash of specified message
 */
export function fetchHashFast(base: string, body: string): Promise<IHashSecure> {
    return request({
        base,
        url: '/utils/hash/fast',
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/script/meta
 * Account's script meta
 */
export function fetchScriptMeta(base: string, body: string): Promise<IScriptMeta> {
    return request({
        base,
        url: '/utils/script/meta',
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/script/decompile
 * Decompiles base64 script representation to string code
 */
export function fetchScriptDecompile(base: string, body: string): Promise<IScriptDecompile> {
    return request({
        base,
        url: '/utils/script/decompile',
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * POST /utils/sign/{privateKey}
 * Return FastCryptographicHash of specified message
 */
export function fetchSignPrivateKey(base: string, privateKey: string, body: string): Promise<ISignPrivateKey> {
    return request({
        base,
        url: `/utils/sign/${privateKey}`,
        options: {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

/**
 * GET /utils/time
 * Current Node time (UTC)
 */
export function fetchNodeTime(base: string): Promise<INodeTime> {
    return request({
        base,
        url: '/utils/time'
    })
}

interface IScriptMeta {
    version?: string;
    callableFuncTypes?: Array<Record<string, Record<string, 'Int' | 'String' | 'Binary'>>>
}

interface IScriptDecompile {
    STDLIB_VERSION: number;
    CONTENT_TYPE: string;
    script: string;
    SCRIPT_TYPE?: string;
}

export interface ICompileCode {
    script: string;
    complexity: number;
    callableComplexities: Record<string, number>;
    verifierComplexity: number;
    extraFee: number;
}

export interface IEstimate extends ICompileCode {
    scriptText: string;
}

interface ICompileWithImportsBody {
    script: string;
    imports: object;
}

interface IHashSecure {
    message: string;
    hash: string;
}

interface ITransactionSerialize {
    bytes: Array<number>;
}

interface ISignPrivateKey {
    message: string;
    signature: string
}

interface INodeTime {
    system: number,
    NTP: number
}

