import { TLong } from '../../interface';
import request from '../../tools/request';

/**
 * GET /activation/status
 * Status
 * @param base 
 */

export function fetchActivationStatus(base: string, options: RequestInit = Object.create(null)): Promise<IActivationStatus<TLong>> {
    return request({ 
        base,
        url: 'activation/status',
        options
    });
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