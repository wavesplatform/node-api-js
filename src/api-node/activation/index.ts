import { TLong } from '../../interface';
import request from '../../tools/request';

/**
 * GET /activation/status
 * Status
 * @param base 
 */

export function fetchActivationStatus(base: string): Promise<IActivationStatus<TLong>> {
    return request({ base, url: 'activation/status'});
}

export interface IActivationStatus<LONG> {
    height: LONG;
    votingInterval: number;
    votingThreshold: number;
    nextCheck: LONG;
    features: Array<IFeatures<TLong>>;
}

export interface IFeatures<LONG> {
    id: number;
    description: string;
    blockchainStatus: string;
    nodeStatus: string;
    activationHeight: LONG;
}