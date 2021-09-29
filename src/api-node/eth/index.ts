import request from "../../tools/request";
import {TAssetDetails} from "../assets";
import {toArray} from "../../tools/utils";
import query from "../../tools/query";

export function fetchEthAssetDetails(base: string, ethAssetId: string | string[]): Promise<Array<TAssetDetails> | TAssetDetails>  {
    const id = toArray(ethAssetId)

    return request<Array<TAssetDetails>>({base, url: `/eth/assets?${query({id})}`}).then(list => Array.isArray(ethAssetId) ? list : list[0]);
}
