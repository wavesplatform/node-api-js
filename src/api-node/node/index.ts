import { TLong } from '../../interface';
import request from '../../tools/request';

// @TODO: When correct API key
// POST /node/stop

export function fetchNodeStatus(base: string, options: RequestInit = Object.create(null)): Promise<INodeStatus<TLong>> {
    return request({ base, url: '/node/status', options });
}

export function fetchNodeVersion(base: string, options: RequestInit = Object.create(null)): Promise<INodeVersion> {
    return request({ base, url: '/node/version', options });
}

export interface INodeStatus<LONG> {
    blockchainHeight: LONG;
    stateHeight: LONG;
    updatedTimestamp: LONG;
    updatedDate: string;
}

export interface INodeVersion {
    version: string;
}