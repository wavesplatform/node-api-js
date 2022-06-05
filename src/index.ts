import wavesAddress2eth from "./tools/adresses/wavesAddress2eth";
import ethAddress2waves from "./tools/adresses/ethAddress2waves";
import wavesAsset2Eth from "./tools/assets/wavesAsset2eth";
import ethTxId2waves from "./tools/transactions/ethTxId2waves";

import { create as createFn } from './create';

export {
    wavesAddress2eth,
    ethAddress2waves,
    wavesAsset2Eth,
    ethTxId2waves
};

export const create = createFn;

export default createFn;

export {
    ICallableFuncArgumentType,
    TCallableFuncArgumentsArray,
    TCallableFuncArgumentsRecord,
    TCallableFuncArguments,
} from './api-node/addresses';
