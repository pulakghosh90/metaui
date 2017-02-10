import ServiceManaager from "service/ServiceManager";
import AppContext from "common/AppContext";
import RouteManager from "common/RouteManager";

class LoginManager {

    checkAndLogin() {
        debugger;
        var loggedInUser = AppContext.getLoggedInUser();
        if (loggedInUser && loggedInUser !== {}) {
            RouteManager.gotToHome();
        } else {
            RouteManager.gotToLogin();
        }
    }

    verifyAndProceed(userInfo) {
        debugger;
        console.log(userInfo);
        var userDetails = ServiceManaager.authenticateAndGetUserDetails(userInfo);
        if (userDetails && userDetails !== {}) {
            AppContext.login(userDetails);
            RouteManager.gotToHome();
        } else {
            return {
                status: "error",
                msg: "Username or password is not correct!!"
            }
        }
    }
}

export default new LoginManager();
