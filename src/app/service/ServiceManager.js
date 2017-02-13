import { employees, empDetails } from "data/employees";
import eTimecard_View from "data/eTimecard_View";
import { Users } from "data/Users";
import AppUtil from "util/AppUtil";
import eTimecardView from "data/eTimecard";

class ServiceManager {
    callService(config) {
        var method = config.method;
        var url = config.url;
        var callback = config.callback;
        var json = config.json;
        var response;

        var request = new XMLHttpRequest();
        request.open(method, url, false);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                if (callback) {
                    callback(JSON.parse(request.response));
                } else {
                    response = JSON.parse(request.response);
                }
            } else {
                if (callback) {
                    callback({
                        status: this.status,
                        statusText: request.statusText
                    });
                } else {
                    response = {
                        status: this.status,
                        statusText: request.statusText
                    };
                }
            }
        };
        request.onerror = function () {
            if (callback) {
                callback({
                    status: this.status,
                    statusText: request.statusText
                });
            } else {
                response = {
                    status: this.status,
                    statusText: request.statusText
                };
            }
        };
        if (json) {
            request.send(json);
        }
        else {
            request.send();
        }
        return response;
    }
    authenticateAndGetUserDetails(user) {
        return Users.filter(u => u.orgid === user.orgid && u.userName === user.userName && u.pwd === user.pwd)[0];
    }
    getEntity(entityType, entity) {
        var url = AppUtil.getDataServiceUrl(entityType, "read");
        var response = this.callService({ method: "POST", url: url, json: JSON.stringify(entity) });
        return response.data;
    }
    getEntityList(entityType) {
        var url = AppUtil.getDataServiceUrl(entityType, "list");
        var response = this.callService({ method: "POST", url: url });
        return response.data;
    }
    saveEntity(entityType, entity) {
        var url = AppUtil.getDataServiceUrl(entityType);
        var response = this.callService({ method: "PUT", url: url, json: JSON.stringify(entity) });
        return response.data;
    }
    deleteEntity(entityType, entity) {
        var url = AppUtil.getDataServiceUrl(entityType);
        var response = this.callService({ method: "DELETE", url: url, json: JSON.stringify(entity) });
        return response.data;
    }
    getViewDef(entity, layout) {
        var url = AppUtil.getViewDefServiceUrl(entity, layout);
        var response = this.callService({ method: "GET", url: url });
        return response.data;
    }
    getFakeData() {
        return AppUtil.generateFakeData(100);
    }
    getTimecardGridFiledDef() {
        return eTimecardView.data.rows;
    }
}

export default new ServiceManager();