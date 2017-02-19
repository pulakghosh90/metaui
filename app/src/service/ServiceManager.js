import AppUtil from "util/AppUtil";

class ServiceManager {
    xhr(config) {
        var method = config.method;
        var url = config.url;
        var json = config.json;
        var async = config.async;
        var response;
        if (async && (!config.resolve || !config.reject)) {
            throw new Error("Async call returns promise which needs resolve and reject callbacks.");
        }
        var request = new XMLHttpRequest();
        request.open(method, url, async);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                response = JSON.parse(request.response);
                if (async) {
                    config.resolve(response);
                }
            } else {
                response = {
                    status: this.status,
                    statusText: request.statusText
                };
                if (async) {
                    config.reject(response);
                }
            }
        };
        request.onerror = function () {
            response = {
                status: this.status,
                statusText: request.statusText
            };
            if (async) {
                config.reject(response);
            }
        };
        if (method !== "GET" && json) {
            request.send(json);
        }
        else {
            request.send();
        }
        if (!async) {
            return response;
        }
    }
    callServiceSync(config) {
        config.async = false;
        return this.xhr(config);
    }
    callServiceAsync(config) {
        var _this = this;
        return new Promise((resolve, reject) => {
            config.async = true;
            config.resolve = resolve;
            config.reject = reject;
            _this.xhr(config);
        });
    }
    authenticateAndGetUserDetails(user) {
        var url = AppUtil.getCustomerMetaServiceUrl(user.orgId);
        return this.callServiceSync({ method: "GET", url: url });
    }
    getEntity(entityType, filter) {
        var url = AppUtil.getDataServiceUrl(entityType, false, "read");
        return this.callServiceAsync({ method: "POST", url: url, json: JSON.stringify(filter) });
    }
    getEntityList(entityType, filter) {
        var url = AppUtil.getDataServiceUrl(entityType, true, "read");
        return this.callServiceAsync({ method: "POST", url: url, json: JSON.stringify(filter) });
    }
    getEntityLookupList(entityType) {
        var url = AppUtil.getDataServiceUrl(entityType, true, "read", false);
        return this.callServiceAsync({ method: "POST", url: url });
    }
    saveEntity(entityType, entity) {
        var url = AppUtil.getDataServiceUrl(entityType);
        return this.callServiceAsync({ method: "PUT", url: url, json: JSON.stringify(entity) });
    }
    saveEntityList(entityType, entity) {
        var url = AppUtil.getDataServiceUrl(entityType, true);
        return this.callServiceAsync({ method: "POST", url: url, json: JSON.stringify(entity) });
    }
    deleteEntity(entityType, entity) {
        var url = AppUtil.getDataServiceUrl(entityType);
        return this.callServiceAsync({ method: "DELETE", url: url, json: JSON.stringify(entity) });
    }
    getViewDef(entity, layout) {
        var url = AppUtil.getViewDefServiceUrl(entity, false, layout);
        return this.callServiceSync({ method: "GET", url: url });
    }
    getEntityMetaList() {
        return new Promise((resolve, reject) => {
            var response = {
                status: "success",
                data: [{ label: "EMPLOYEE", value: "EMPLOYEE" }, { label: "TIMEPAIR", value: "TIMEPAIR" }]
            }
            resolve(response);
        });
    }
    getFieldMetadata(entityName) {
        var url = AppUtil.getFieldMetaServiceUrl(entityName);
        return this.callServiceAsync({ method: "GET", url: url });
    }
    saveFieldMetadata(entityName, fieldMeta) {
        debugger;
        var url = AppUtil.getFieldMetaServiceUrl(entityName);
        return this.callServiceAsync({ method: "POST", url: url, json: fieldMeta });
    }
    getEntityMetadata(entityName) {
        var url = AppUtil.getEntityMetaServiceUrl(entityName, false);
        return this.callServiceAsync({ method: "GET", url: url });
    }
    getEntityMetaList() {
        var url = AppUtil.getEntityMetaServiceUrl(null, true);
        return this.callServiceAsync({ method: "GET", url: url });
    }
    saveEntityMetadata(entityName, entityMeta) {
        var url = AppUtil.getEntityMetaServiceUrl(entityName, false);
        return this.callServiceAsync({ method: "PUT", url: url, json: entityMeta });
    }
    getRuleMetaList() {
        var url = AppUtil.getRuleMetaServiceUrl(null, true);
        return this.callServiceAsync({ method: "GET", url: url });
    }
    getRuleMetadata(ruleName) {
        var url = AppUtil.getRuleMetaServiceUrl(ruleName, false);
        return this.callServiceAsync({ method: "GET", url: url });
    }
    saveRuleMetadata(ruleName, ruleMeta) {
        var url = AppUtil.getRuleMetaServiceUrl(ruleName, false);
        return this.callServiceAsync({ method: "PUT", url: url, json: ruleMeta });
    }
}

export default new ServiceManager();