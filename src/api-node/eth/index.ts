import request from "../../tools/request";
import {TAssetDetails} from "../assets";

export function fetchEthAssetDetails(base: string, ethAssetId: string | string[]): Promise<TAssetDetails | Array<TAssetDetails>>  {
    ethAssetId = Array.isArray(ethAssetId) ? ethAssetId : [ethAssetId]

    const params = ethAssetId.map(assetId => `id=${assetId}`)
        .join('&');

    const query = ethAssetId.length ? `?${params}` : '';

    return request({base, url: `/eth/assets${query}`})
}
