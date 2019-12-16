import resolve from './resolve';
import parse from './parse';


const request = typeof fetch === 'function' ? fetch : require('node-fetch');

export default function <T>(params: IRequestParams<T>): Promise<T> {
    return request(resolve(params.url, params.base), updateHeaders(params.options))
        .then(parseResponse) as Promise<T>;
}

function parseResponse<T>(r: Response): Promise<T> {
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
    options.credentials = 'include';
    return options;
}

export interface IRequestParams<T> {
    url: string;
    base: string;
    options?: RequestInit | undefined;
}
