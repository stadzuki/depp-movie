export function textEditor (originalStr, size = 170) {
    if (originalStr.length > size + 10) {
        let editStr = originalStr.slice(0, size);
        editStr = editStr.slice(0, editStr.lastIndexOf(' '));
        editStr = editStr + '...';
        return {originalStr, editStr}
    }

    return {originalStr}
}
