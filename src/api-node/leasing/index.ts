import { LeaseTransaction, WithApiMixin } from '@waves/ts-types';
import { TLong } from '../../interface';
import request from '../../tools/request';


/**
 * GET /leasing/active/{address}
 * Get all active leases for an address
 */
export function fetchActive(base: string, address: string, options: RequestInit = Object.create(null)): Promise<Array<LeaseTransaction<TLong> & WithApiMixin & IActive>> {
    return request({ base, url: `/leasing/active/${address}`, options });
}

export interface IActive {
    feeAssetId: string | null;
}

/**
 * GET /leasing/info/
 * Get lease transactions info.
 */
export function fetchLeasingInfo(base: string, ids: string[], options: RequestInit = Object.create(null)): Promise<Array<ILeaseInfo>> {
    const searchParams = new URLSearchParams(ids.reduce((acc, id) => [...acc, ["id", id]], [] as string[][]))
    return request({ base, url: `/leasing/active/`, options: {...options, body: searchParams} });
}

export interface ILeaseInfo {
    id: string,
    originTransactionId: string,
    sender: string,
    recipient: string,
    amount: string | number,
    height: number,
    status: string,
    cancelHeight: number,
    cancelTransactionId: string
}
