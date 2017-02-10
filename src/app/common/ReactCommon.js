
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
}

export default new ReactCommon();