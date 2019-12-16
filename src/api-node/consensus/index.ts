import { TLong } from '../../interface';
import request from '../../tools/request';

// GET /consensus/generatingbalance/{address}
// Generating balance
export function generatingBalance(base: string, address: string): Promise<IGeneratingBalance<TLong>> {
    return request({ base, url: `/consensus/generatingbalance/${address}`});
}
//
// GET /consensus/basetarget
// Base target last
export function basetarget(base: string): Promise<IBasetarget> {
    return request({ base, url: '/consensus/basetarget'});
}
//
// GET /consensus/algo
// Consensus algo
export function consensusAlgo(base: string): Promise<IConsensusAlgo> {
    return request({ base, url: '/consensus/algo'});
}
//
// GET /consensus/generationsignature/{blockId}
// Generation signature
export function generationSignatureBlockId(base: string, blockId: string): Promise<IGeneraationSignatureBlockId> {
    return request({ base, url: `/consensus/generationsignature/${blockId}`});
}
//
// GET /consensus/basetarget/{blockId}
// Base target
export function basetargetBlockId(base: string, blickId: string): Promise<IBaseTargetBlockId> {
    return request({ base, url: `/consensus/basetarget/${blickId}`});
}
//
// GET /consensus/generationsignature
// Generation signature last
export function generationSignature(base: string): Promise<IGenerationSignature> {
    return request({base, url: '/consensus/generationsignature'});
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