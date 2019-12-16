import { IRequestOptions, TLong } from '../../interface';
import request from '../../tools/request';


//GET /blocks/headers/seq/{from}/{to} TODO
//Block header range

/**
 * GET /blocks/headers/last
 * Last block header
 */
export function headersLast(base: string, options?: IRequestOptions): Promise<IBlockHeader> {
    return request({ base, url: '/blocks/headers/last' });
}

//GET /blocks/height/{signature} TODO
//Block height

/**
 * GET /blocks/headers/at/{height}
 * Block header at height
 * @param height
 */
export function headersAt(base: string, height: number, options?: IRequestOptions): Promise<IBlockHeader> {
    return request({ base, url: `/blocks/headers/at/${height}` });
}

/**
 * GET /blocks/at/{height}
 * @param base
 * @param height
 */
export function blockAt(base: string, height: number): Promise<number> {
    return request({ base, url: `/blocks/at/${height}` });
}

//GET /blocks/seq/{from}/{to} TODO
//Block range

//GET /blocks/signature/{signature} TODO
//Block by signature

//GET /blocks/first TODO
//Genesis block

//GET /blocks/address/{address}/{from}/{to} TODO
//Blocks produced by address

//GET /blocks/last TODO
//Last block

//GET /blocks/delay/{signature}/{blockNum} TODO
//Average block delay

/**
 * GET /blocks/height
 * @param base
 */
export function height(base: string): Promise<{ height: number }> {
    return request({ base, url: '/blocks/height' });
}


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
    }
}
