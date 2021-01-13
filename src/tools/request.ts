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

// RequestInit is a DOM interface. It needs to be explicitly defined here for usage in nodejs environment
export interface RequestInit {
    /**
     * A BodyInit object or null to set request's body.
     */
    body?: BodyInit | null;
    /**
     * A string indicating how the request will interact with the browser's cache to set request's cache.
     * Not supported in nodejs environment
     */
    cache?: RequestCache;
    /**
     * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
     */
    credentials?: RequestCredentials;
    /**
     * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
     * Not supported in nodejs environment
     */
    headers?: HeadersInit;
    /**
     * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
     */
    integrity?: string;
    /**
     * A boolean to set request's keepalive.
     */
    keepalive?: boolean;
    /**
     * A string to set request's method.
     */
    method?: string;
    /**
     * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
     * Not supported in nodejs environment
     */
    mode?: RequestMode;
    /**
     * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
     */
    redirect?: RequestRedirect;
    /**
     * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
     */
    referrer?: string;
    /**
     * A referrer policy to set request's referrerPolicy.
     */
    referrerPolicy?: ReferrerPolicy;
    /**
     * An AbortSignal to set request's signal.
     */
    signal?: AbortSignal | null;
    /**
     * Can only be null. Used to disassociate request from any Window.
     */
    window?: any;
}
