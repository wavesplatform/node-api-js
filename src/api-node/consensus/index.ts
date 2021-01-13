import { TLong } from '../../interface';
import request from '../../tools/request';

/**
 * GET /consensus/generatingbalance/{address}
 * Generating balance
 * @param base
 * @param address
 */
export function fetchGeneratingBalance(base: string, address: string): Promise<IGeneratingBalance<TLong>> {
    return request({ base, url: `/consensus/generatingbalance/${address}`});
}
/**
 * GET /consensus/basetarget
 * Base target last
 * @param base
 */
export function fetchBasetarget(base: string): Promise<IBasetarget> {
    return request({ base, url: '/consensus/basetarget'});
}

/**
 * GET /consensus/algo
 * Consensus algo
 * @param base 
 */
export function fetchConsensusAlgo(base: string): Promise<IConsensusAlgo> {
    return request({ base, url: '/consensus/algo'});
}

/**
 * GET /consensus/generationsignature/{blockId}
 * Generation signature
 * @param base 
 * @param blockId 
 */
export function fetchGenerationSignatureBlockId(base: string, blockId: string, options: RequestInit = Object.create(null)): Promise<IGeneraationSignatureBlockId> {
    return request({ base, url: `/consensus/generationsignature/${blockId}`, options });
}

/**
 * GET /consensus/basetarget/{blockId}
 * Base target
 * @param base 
 * @param blockId 
 */
export function fetchBasetargetBlockId(base: string, blockId: string, options: RequestInit = Object.create(null)): Promise<IBaseTargetBlockId> {
    return request({ base, url: `/consensus/basetarget/${blockId}`, options });
}

export interface IGeneratingBalance<LONG> {
    address: string;
    balance: LONG;
}
export interface IBasetarget {
    baseTarget: number;
    score: string;
}

export interface IConsensusAlgo {
    consensusAlgo: string;
}

export interface IGeneraationSignatureBlockId {
    generationSignature: string;
}

export interface IBaseTargetBlockId {
    baseTarget: number;
}

export interface IGenerationSignature {
    generationSignature: string;
}