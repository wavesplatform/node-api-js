import { TLong } from '../../interface';
/**
 * GET /blockchain/rewards
 * Current reward status
 */
export declare function rewards(base: string, height?: number): Promise<TRewards<TLong>>;
export declare type TRewards<LONG> = {
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
    };
};
