import { TAssetDetails } from '../../api-node/assets';
import { TTransaction } from '@waves/ts-types';
import { TLong } from '../../interface';
export default function (base: string, tx: TTransaction<TLong> | Array<TTransaction<TLong>>): Promise<Record<string, TAssetDetails>>;
