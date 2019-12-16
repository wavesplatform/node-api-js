import { TLong } from '../../interface';
import request from '../../tools/request';

// @TODO: When correct API key
// POST /node/stop

export function nodeStatus(base: string): Promise<INodeStatus<TLong>> {
    return request({ base, url: '/node/status'});
}

export function nodeVersion(base: string): Promise<INodeVersion> {
    return request({ base, url: '/node/version'});
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