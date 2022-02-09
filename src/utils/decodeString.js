export default function decodeString (string) {
    if (string && typeof(string) == 'string') {
        if (!string || string == '') return '';

        const textarea = document.createElement('textarea')
        textarea.innerHTML = string;
        return textarea.value;
    }

    return string
}
