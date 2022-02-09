export default class HtmlReader {
    _html = null;
    _head = null;
    _body = null;
    targetTag = null;
    _tags = [
        {name: 'head', control: this.head},
        {name: 'body', control: this.body},
    ];

    get html() {
        return this._html;
    }

    set html(content) {
        this._html = content.trim();
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

    constructor(htmlContent) {
        this.html = htmlContent;
    }

    apply() {
        this.tags.forEach((tag) => {
            this.getTagContent(tag.name);

            switch (tag.name) {
                case 'head':
                    this.insert(tag.name, this.head);
                    break;
                case 'body':
                    this.insert(tag.name, this.body);
                    break;
            }
        })
    }

    remove() {
        this.tags.forEach((tag) => {
            if (tag.control) {
                document.querySelector(tag.name).children.forEach((child) => {
                    if (child.dataset.htmlReaderElement) {
                        child.remove();
                    }
                })
            }
        })
    }

    insert(tag, content) {
        if (tag === 'head' || tag === 'script') {
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
