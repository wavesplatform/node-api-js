import { headersLast, height } from '../../api-node/blocks';
import { wait } from '../utils';
import detectInterval from './detectInterval';


const storage: Record<string, number> = Object.create(null);


export default function (base: string, current?: number): Promise<{ height: number }> {
    return Promise.all([
        getInterval(base),
        current == undefined ? height(base).then(({ height }) => height + 1) : current
    ]).then(([interval, current]) => loop(interval, current));


    function loop(interval: number, current: number): Promise<{ height: number }> {
        return headersLast(base).then(({ height, timestamp }) => {
            if (height >= current) {
                return { height };
            }

            const blocksToWait = current - height;
            const now = Date.now();
            const timeout = (((blocksToWait - 1) * interval) + ((interval - Math.abs(now - timestamp)))) * 0.8;
            return wait(inRange(timeout, 200, (interval * blocksToWait) * 0.8)).then(() => loop(interval, current));
        });
    }
}

function inRange(current: number, min: number, max: number): number {
    return Math.round(Math.min(Math.max(current, min), max));
}

function getInterval(base: string): Promise<number> {
    if (storage[base]) {
        return Promise.resolve(storage[base]);
    } else {
        return detectInterval(base).then(interval => {
            storage[base] = interval;
            return interval;
        });
    }
}
