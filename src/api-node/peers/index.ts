import request from '../../tools/request';
import {TLong} from "../../interface";

/**
 * GET /peers/all
 * Peer list
 */
export function fetchAll(base: string, options: RequestInit = Object.create(null)): Promise<IAllResponse> {
    return request({
        base,
        url: '/peers/all',
        options
    })
}


/**
 * GET /peers/connected
 * Connected peers list
 */
export function fetchConnected(base: string, options: RequestInit = Object.create(null)): Promise<IAllConnectedResponse> {
    return request({
        base,
        url: '/peers/connected',
        options
    })
}

/**
 * GET /peers/blacklisted
 * Blacklisted peers list
 */
export function fetchBlackListed(base: string, options: RequestInit = Object.create(null)): Promise<Array<IBlackPeer>> {
    return request({
        base,
        url: '/peers/blacklisted',
        options
    })
}

/**
 * GET /peers/suspended
 * Suspended peers list
 */
export function fetchSuspended(base: string, options: RequestInit = Object.create(null)): Promise<Array<ISuspendedPeer>> {
    return request({
        base,
        url: '/peers/suspended',
        options
    })
}

// @TODO:
// POST /peers/clearblacklist
// POST /peers/connect


export interface IAllResponse {
    peers: Array<IPeerAllResponse>
}

export interface IAllConnectedResponse {
    peers: Array<IPeerConnectedResponse>
}

export interface IPeerAllResponse {
    address: string;
    lastSeen: TLong;
}

export interface IPeerConnectedResponse {
    address: string;
    declaredAddress: string;
    peerName: string;
    peerNonce: TLong;
    applicationName: string;
    applicationVersion: string;
}

export interface IBlackPeer extends  ISuspendedPeer {
    reason: string;
}

export interface ISuspendedPeer {
    hostname: string;
    timestamp: number;
}
