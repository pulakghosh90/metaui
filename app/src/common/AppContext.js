
class AppContext {
    constructor() {
        //initialize context
        this.context = {};
        this.cache = {};
    }
    getContext() {
        if (this.context.loggedInUser) {
            return Object.assign({}, this.context);
        } else {
            return null;
        }
    }
    getLoggedInUser() {
        if (this.context.loggedInUser) {
            return this.context.loggedInUser;
        } else {
            return null;
        }
    }
    getLoggedInUserName() {
        if (this.context.loggedInUser) {
            return this.context.loggedInUser.userName;
        } else {
            return null;
        }
    }
    getCurrentUserRole() {
        if (this.context.loggedInUser) {
            return this.context.loggedInUser.role;
        } else {
            return null;
        }
    }
    login(user) {
        this.context.loggedInUser = user;
    }
    logout() {
        this.context = {};
    }
}

export default new AppContext();