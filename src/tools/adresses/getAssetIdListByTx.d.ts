import { TTransaction } from '@waves/ts-types';
import { TLong } from '../../interface';
export default function (tx: TTransaction<TLong> | Array<TTransaction<TLong>>): Array<string>;
