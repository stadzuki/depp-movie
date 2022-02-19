import HtmlReader from "./HtmlReader";
import decodeString from "./decodeString";

export default function insertHTML (html) {
    if (html) {
        const customTag = isSingleHtmlElement(html) ? html : null;

        const htmlReader = customTag
            ? new HtmlReader('', customTag)
            : new HtmlReader(html);

        htmlReader.apply();

        const htmlString = customTag
            ? htmlReader.customTag
            : htmlReader.body;

        return {__html: decodeString(htmlString)};
    }

    return {__html: 'Контент отсутсвует'};
}

function isSingleHtmlElement (html) {
    if (html.includes('<html>')) return false;

    return true
}
