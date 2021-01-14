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