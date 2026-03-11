import request from '../../tools/request';
import { TLong } from '../../interface';
import { fetchActivationStatus } from '../activation';
import {fetchHeight, IBlockHeader} from '../blocks';


/**
 * GET /blocks/headers/finalized
 * Last finalized block header
 * @param base
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
 */
export function fetchFinalizedHeight(base: string): Promise<{ height: number }> {
    return request({
        base,
        url: `/blocks/height/finalized`
    })
}

/**
 * GET finalized block height at
 * @param base
 * @param height
 */
export function fetchFinalizedHeightAt(base: string, height: number): Promise<{ height: number }> {
    return request({
        base,
        url: `/blocks/finalized/at/${height}`
    })
}

/**
 * GET /generators/at/{height}
 * Committed generators list at height
 * @param base
 * @param height
 */
export function fetchComittedGeneratorsAt(base: string, height: number, options: RequestInit = Object.create(null)): Promise<Array<ICommittedGenerator>> {
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
 */
export function fetchCommittedGeneratorIndex(base: string, height: number, address: string, options: RequestInit = Object.create(null)): Promise<number> {
    return fetchComittedGeneratorsAt(base, height, options).then((list) => {
        const index = list.findIndex((item) => item.address === address);
        return index >= 0 ? index : -1;
    });
}

/**
 * Calculates commitment period boundaries depends on feature 25 activation.
 * @param base
 * @param periodLength
 */
export function fetchCommitmentPeriodHeights(base: string, periodLength: number = 10000): Promise<ICommitmentPeriodHeights> {
    return Promise.all([
        fetchActivationStatus(base),
        fetchHeight(base)
    ]).then(([activationStatus, heightStatus]) => {
        const feature25 = activationStatus.features.find((feature) =>
            feature.id === 25 &&
            feature.blockchainStatus === 'ACTIVATED'
        );

        if (!feature25) {
            throw new Error('Finalization voting is not activated');
        }
        if (typeof feature25.activationHeight !== 'number') {
            throw new Error('Feature 25 activation height is unavailable');
        }

        const featureActivationHeight = feature25.activationHeight === 0 ? 1 : feature25.activationHeight;
        let nextPeriodStart = featureActivationHeight + periodLength;
        while (heightStatus.height >= nextPeriodStart) {
            nextPeriodStart += periodLength;
        }

        return {
            currentPeriodStart: Math.max(nextPeriodStart - periodLength, 1),
            nextPeriodStart
        };
    });
}

export interface ICommittedGenerator {
    address: string;
    balance: TLong;
    transactionId: string;
    conflictHeight?: number;
}

export interface ICommitmentPeriodHeights {
    currentPeriodStart: number;
    nextPeriodStart: number;
}
