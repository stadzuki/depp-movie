export default class HtmlReader {
    _html = null;
    _head = null;
    _body = null;
    _tags = [
        {name: 'head', value: this.head},
        {name: 'body', value: this.body},
    ];
    targetTag = null;
    _customTag = null;

    get html() {
        return this._html;
    }

    set html(content) {
        this._html = content.trim();
    }

    get customTag() {
        return this._customTag;
    }

    set customTag(content) {
        this._customTag = content;
    }

    get head() {
        return this._head;
    }

    set head(content) {
        this._head = this.addUniqKey(this.head, content.trim());
    }

    get body() {
        return this._body;
    }

    set body(content) {
        this._body = this.addUniqKey(this.head, content.trim());
    }

    get tags() {
        return this._tags;
    }

    constructor(htmlContent, customTag = null) {
        this.html = htmlContent;
        this.customTag = customTag;
    }

    apply() {
        if (this.customTag) return;

        this.tags.forEach((tag) => {
            this.getTagContent(tag.name);

            if (tag.value) {
                switch (tag.name) {
                    case 'head':
                        this.insert(tag.name, this.head);
                        break;
                    case 'body':
                        this.insert(tag.name, this.body);
                        break;
                }
            }
        })
    }

    remove() {
        this.tags.forEach((tag) => {
            if (tag.value) {
                document.querySelector(tag.name).children.forEach((child) => {
                    if (child.dataset.htmlReaderElement) {
                        child.remove();
                    }
                })
            }
        })
    }

    insert(tag, content) {
        if (tag === 'head') {
            return document.querySelector(tag).insertAdjacentHTML('beforeend', content);
        }

        // document.querySelector(this.targetTag).insertAdjacentHTML('beforeend', content);
    }

    getTagContent(tag) {
        const TAG_OPEN = `<${tag}>`;
        const TAG_CLOSE = `</${tag}>`;

        const contentStartFrom = this.html.indexOf(TAG_OPEN) + TAG_OPEN.length;
        const contentEndFrom = this.html.indexOf(TAG_CLOSE) - 1;

        if ((!contentStartFrom || !contentEndFrom)) return console.error('cannot find the tag');

        switch (tag) {
            case 'head':
                return this.head = this.html.slice(contentStartFrom, contentEndFrom);
            case 'body':
                return this.body = this.html.slice(contentStartFrom, contentEndFrom);
        }
    }

    addUniqKey(tag, content) {
        const node = document.createElement('template');
        node.innerHTML = content;
        // node.content.childNodes.forEach((child) => {
        //     child.dataset.htmlReaderElement = tag;
        // });

        return node.innerHTML;
    }
}
