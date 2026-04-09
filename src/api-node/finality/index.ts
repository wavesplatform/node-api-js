import request from '../../tools/request';
import {TLong} from '../../interface';
import {fetchActivationStatus} from '../activation';
import {fetchHeight, IBlockHeader} from '../blocks';


/**
 * GET /blocks/headers/finalized
 * Last finalized block header
 * @param base
 * @param options
 */
export function fetchFinalized(base: string, options: RequestInit = Object.create(null)): Promise<IBlockHeader> {
    return request({
        base,
        url: `/blocks/headers/finalized`,
        options
    });
}

/**
 * GET last finalized block height
 * @param base
 * @param options
 */
export function fetchFinalizedHeight(base: string, options: RequestInit = Object.create(null)): Promise<{ height: number }> {
    return request({
        base,
        url: `/blocks/height/finalized`,
        options
    })
}

/**
 * GET finalized block height at
 * @param base
 * @param height
 * @param options
 */
export function fetchFinalizedHeightAt(base: string, height: number, options: RequestInit = Object.create(null)): Promise<{ height: number }> {
    return request({
        base,
        url: `/blocks/finalized/at/${height}`,
        options
    })
}

/**
 * GET /generators/at/{height}
 * Committed generators list at height
 * @param base
 * @param height
 * @param options
 */
export function fetchCommittedGeneratorsAt(base: string, height: number, options: RequestInit = Object.create(null)): Promise<Array<ICommittedGenerator>> {
    return request({
        base,
        url: `/generators/at/${height}`,
        options
    });
}

/**
 * Get committed generator index for provided address.
 * Returns index from 0, or -1 when address is missing in the list.
 * @param base
 * @param height
 * @param address
 * @param options
 */
export function fetchCommittedGeneratorIndex(base: string, height: number, address: string, options: RequestInit = Object.create(null)): Promise<number> {
    return fetchCommittedGeneratorsAt(base, height, options).then((list) => {
        const index = list.findIndex((item) => item.address === address);
        return index >= 0 ? index : -1;
    });
}

export function fetchFinalityInfo(base: string, options: RequestInit = Object.create(null)): Promise<IFinalityInfo> {
    return request({
        base,
        url: '/blockchain/finality',
        options
    })
}

export interface IGenerationPeriod {
    start: number;
    end: number;
}

export interface IFinalityInfo {
    height: number;
    finalizedHeight: number;
    currentGenerationPeriod?: IGenerationPeriod;
    currentGenerators: ICommittedGenerator[];
    nextGenerationPeriod?: IGenerationPeriod;
    nextGenerators: INextCommittedGenerator[];
}

export interface ICommittedGenerator {
    address: string;
    balance: TLong;
    transactionId: string;
    conflictHeight?: number;
}

export interface INextCommittedGenerator {
    address: string;
    transactionId: string;
}
