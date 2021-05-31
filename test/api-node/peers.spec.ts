import {create} from '../../src';
import {IPeerAllResponse, IPeerConnectedResponse} from "../../src/api-node/peers";
import { isStringOrNumber } from  '../extendedMatcher'

const api: ReturnType<typeof create> = create('https://nodes.wavesnodes.com/');


const checkPeers = (peer: IPeerAllResponse) => {
    expect(typeof peer.address).toBe('string');
    expect(typeof peer.lastSeen).isStringOrNumber();
};

const checkConnectedPeers = (peer: IPeerConnectedResponse) => {
    expect(typeof peer.address).toBe('string');
    expect(typeof peer.declaredAddress).toBe('string');
    expect(typeof peer.peerName).toBe('string');
    expect(typeof peer.peerNonce).isStringOrNumber();
    expect(typeof peer.applicationName).toBe('string');
    expect(typeof peer.applicationVersion).toBe('string');
};

it('peers all', async () => {
    const {peers} = await api.peers.fetchAll();
    expect(peers).toBeInstanceOf(Array);

    peers.forEach(checkPeers)
});


it('connected peers', async () => {
    const {peers} = await api.peers.fetchConnected();
    expect(peers).toBeInstanceOf(Array);
    peers.forEach(checkConnectedPeers)
});

it('blacklisted peers', async () => {
    const blacklistedPeers = await api.peers.fetchBlackListed();

    expect(blacklistedPeers).toBeInstanceOf(Array);
    if (blacklistedPeers.length != 0) {
        blacklistedPeers.forEach(peer => {
            expect(typeof peer.reason).toBe('string');
            expect(typeof peer.hostname).toBe('string');
            expect(typeof peer.timestamp).toBe('number')
        })
    }
});

it('suspended peers', async () => {
    const suspendedPeers = await api.peers.fetchSuspended();

    expect(suspendedPeers).toBeInstanceOf(Array);
    if (suspendedPeers.length != 0) {
        suspendedPeers.forEach(peer => {
            expect(typeof peer.hostname).toBe('string');
            expect(typeof peer.timestamp).toBe('number')
        })
    }
});


