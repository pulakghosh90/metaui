
class ReactCommon {
    getContainer() {
        return this.container;
    }

    setContainer(container) {
        this.container = container;
    }

    changeView(ViewObj) {
        if (this.container) {
            this.container.changeView(ViewObj);
        }
    }
    goBack() {
        if (this.container) {
            history.back();
            this.container.back();
        }
    }
}

export default new ReactCommon();