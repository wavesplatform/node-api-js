import request from '../../tools/request';

/**
 * GET /peers/all
 * Peer list
 */
export function all(base: string): Promise<IAllResponse> {
    return request({
        base,
        url: '/peers/all'
    })
}


/**
 * GET /peers/connected
 * Connected peers list
 */
export function connected(base: string): Promise<IAllResponse> {
    return request({
        base,
        url: '/peers/connected'
    })
}

/**
 * GET /peers/blacklisted
 * Blacklisted peers list
 */
export function blackListed(base: string): Promise<Array<IBlackPeer>> {
    return request({
        base,
        url: '/peers/blacklisted'
    })
}

/**
 * GET /peers/suspended
 * Suspended peers list
 */
export function suspended(base: string): Promise<Array<ISuspendedPeer>> {
    return request({
        base,
        url: '/peers/suspended'
    })
}

// @TODO:
// POST /peers/clearblacklist
// POST /peers/connect


export interface IAllResponse {
    peers: Array<IPeerAllResponse | IPeerConnectedResponse>
}

export interface IPeerAllResponse {
    address: string;
    lastSeen: number;
}

export interface IPeerConnectedResponse {
    address: string;
    declaredAddress: string;
    peerName: string;
    peerNonce: number;
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
