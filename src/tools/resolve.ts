export default function (path: string, base: string): string {
    return new URL(path, base).toString();
}