import { headersAt, headersLast } from '../../api-node/blocks';


export default function (base: string) {
    return headersLast(base).then(header => {
        const firstHeight = Math.max(2, header.height - 1000);
        return headersAt(base, firstHeight)
            .then(oldHeader => Math.floor((header.timestamp - oldHeader.timestamp) / (header.height - firstHeight)));
    });
}