import { fetchHeadersAt, fetchHeadersLast } from '../../api-node/blocks';


export default function (base: string) {
    return fetchHeadersLast(base).then(header => {
        const firstHeight = Math.max(2, header.height - 1000);
        return fetchHeadersAt(base, firstHeight)
            .then(oldHeader => Math.floor((header.timestamp - oldHeader.timestamp) / (header.height - firstHeight)));
    });
}