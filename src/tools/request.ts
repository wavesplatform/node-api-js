import resolve from './resolve';
import parse from './parse';

async function getRequest(): Promise<typeof globalThis.fetch> {
    return fetch.bind(globalThis);
}

export default function <T>(params: IRequestParams<T>): Promise<T> {
    return getRequest()
        .then(request => request(resolve(params.url, params.base), updateHeaders(params.options)))
        .then(parseResponse) as Promise<T>;
}

export function parseResponse<T>(r: Response): Promise<T> {
    return r.text().then(message => r.ok ? parse(message) : Promise.reject(tryParse(message)));
}

function tryParse(message: string) {
    try {
        return JSON.parse(message);
    } catch (e) {
        return message;
    }
}

function updateHeaders(options: RequestInit = Object.create(null)) {
    return {
        credentials: 'include',
        ...options
    };
}

export interface IRequestParams<T> {
    url: string;
    base: string;
    options?: RequestInit | undefined;
}

// The project is used in both browser and node runtimes with differing fetch typings.
// Keep this wide to avoid cross-version type conflicts from node-fetch/undici updates.
export type RequestInit = any;
