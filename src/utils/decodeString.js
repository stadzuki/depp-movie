export default function decodeString (string) {
    if (string && typeof(string) == 'string') {
        if (!string || string == '') return '';

        const textarea = document.createElement('textarea')
        textarea.innerHTML = string;

        const keepDecodeValue = textarea.value;
        textarea.remove();

        return keepDecodeValue;
    }

    return string
}
