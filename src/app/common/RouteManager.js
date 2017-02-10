import React from "react";
import ReactDOM from "react-dom";
import pathToRegexp from "path-to-regexp";
import { URLS } from "constants/Constants";
import { Home, Login, Layout, EmployeeGrid, Settings, Timecard, SimpleEditor } from "constants/ViewConstants";

class RouteManager {
    getView(url) {
        var View;
        if (this.match(URLS.EMPLOYEES, url)) {
            View = EmployeeGrid;
        }
        else if (this.match(URLS.EMPLOYEE_EDITOR, url)) {
            View = SimpleEditor;
        }
        else if (this.match(URLS.HOME, url)) {
            View = Home;
        }
        else if (this.match(URLS.SETTINGS, url)) {
            View = Settings;
        }
        else if (this.match(URLS.TIMECARD, url)) {
            View = Timecard;
        }
        else {
            View = null;
        }

        return { View, url, param: {} };
    }
    match(path, url) {
        var reg = pathToRegexp(path, []);
        return reg.exec(url);
    }
    gotToHome() {
        document.body.style.backgroundColor = "#fff";
        ReactDOM.render(
            <Layout View={Home} />,
            document.getElementById("app")
        );
    }
    gotToLogin() {
        document.body.style.backgroundColor = "#eee";
        ReactDOM.render(
            <Login />,
            document.getElementById("app")
        );
    }
}

export default new RouteManager();