import getNetworkByte from './getNetworkByte';


export default function (base: string): Promise<string> {
    return getNetworkByte(base).then(byte => String.fromCharCode(byte));
}