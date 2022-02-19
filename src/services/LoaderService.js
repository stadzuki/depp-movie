export default class LoaderService {
    static loader = `<div id="loader-service" class="loader-wrapper">
            <div class="overlay"></div>
            <div class="loader">
                <img src="/img/loader.svg" width="83" height="83"/>
            </div>
        </div>`

    static show(status) {
        // if (this.getLoaderFromDOM()) {
        //     this.getLoaderFromDOM().remove();
        // }

        if (status) {
            document.body.insertAdjacentHTML('afterbegin', this.loader);
        } else {
            setTimeout(() => {
                this.getLoaderFromDOM().remove();
            }, 500)
        }
    }

    static getLoaderFromDOM() {
        return document.getElementById('loader-service');
    }
}
