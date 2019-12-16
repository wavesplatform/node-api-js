import { ILeaseTransaction, IWithApiMixin } from '@waves/ts-types';
import { TLong } from '../../interface';
/**
 * GET /leasing/active/{address}
 * Get all active leases for an address
 */
export declare function active(base: string, address: string): Promise<Array<ILeaseTransaction<TLong> & IWithApiMixin>>;
