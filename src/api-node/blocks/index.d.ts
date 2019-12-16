import { IRequestOptions, TLong } from '../../interface';
/**
 * GET /blocks/headers/last
 * Last block header
 */
export declare function headersLast(base: string, options?: IRequestOptions): Promise<IBlockHeader>;
/**
 * GET /blocks/headers/at/{height}
 * Block header at height
 * @param height
 */
export declare function headersAt(base: string, height: number, options?: IRequestOptions): Promise<IBlockHeader>;
/**
 * GET /blocks/at/{height}
 * @param base
 * @param height
 */
export declare function blockAt(base: string, height: number): Promise<number>;
/**
 * GET /blocks/height
 * @param base
 */
export declare function height(base: string): Promise<{
    height: number;
}>;
export interface IBlockHeader {
    blockSize: number;
    reward: TLong;
    signature: string;
    generator: string;
    version: number;
    reference: string;
    features: Array<string>;
    totalFee: TLong;
    desiredReward: number;
    transactionCount: number;
    timestamp: number;
    height: number;
    'nxt-consensus': {
        'base-target': number;
        'generation-signature': string;
    };
}
