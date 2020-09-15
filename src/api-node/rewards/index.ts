import { TLong } from '../../interface';
import request from '../../tools/request';


/**
 * GET /blockchain/rewards
 * Current reward status
 */
export function fetchRewards(base: string, height?: number, options: RequestInit = Object.create(null)): Promise<TRewards<TLong>> {
    return request({
        base,
        url: height ? `/blockchain/rewards/${height}` : '/blockchain/rewards',
        options
    });
}

export type TRewards<LONG> = {
    height: number;
    totalWavesAmount: LONG;
    currentReward: LONG;
    minIncrement: LONG;
    term: number;
    nextCheck: number;
    votingIntervalStart: number;
    votingInterval: number;
    votingThreshold: number;
    votes: {
        increase: number;
        decrease: number;
    }
}
