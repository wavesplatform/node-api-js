export default function <T>(params: IRequestParams<T>): Promise<T>;
export interface IRequestParams<T> {
    url: string;
    base: string;
    options?: RequestInit | undefined;
}
