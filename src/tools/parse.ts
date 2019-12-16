const reg = new RegExp('((?!\\\\)"\\w+"):\\s*(-?[\\d|\\.]{14,})', 'g');

export default function (json: string) {
    return JSON.parse(json.replace(reg, `$1:"$2"`));
}