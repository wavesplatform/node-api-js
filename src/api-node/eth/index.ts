import request from "../../tools/request";
import {TAssetDetails} from "../assets";
import {toArray} from "../../tools/utils";

export function fetchEthAssetDetails(base: string, ethAssetId: string | string[]): Promise<Array<TAssetDetails> | TAssetDetails>  {
    ethAssetId = toArray(ethAssetId)

    const params = ethAssetId.map(assetId => `id=${assetId}`)
        .join('&');

    const query = ethAssetId.length ? `?${params}` : '';

    return request<Array<TAssetDetails>>({base, url: `/eth/assets?${query}`}).then(list => Array.isArray(ethAssetId) ? list[0] : list);
}
