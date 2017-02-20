import _ from "lodash";
import moment from "moment";
import { SERVICE } from "constants/Constants";
import AppContext from "common/AppContext";

const METASERVICE_API_ROOT = "http://localhost:3000";
const DATASERVICE_API_ROOT = "http://localhost:3001";

class AppUtil {
    replaceUrlNamedParams(url, params) {
        var user = AppContext.getLoggedInUser();
        if (user) {
            var orgId = user.orgId;
            var tempUrl = url;
            params = [{ pattern: ":orgId", replacement: orgId }].concat(params);
            params.forEach(param => { tempUrl = _.replace(tempUrl, param.pattern, param.replacement); });
            return tempUrl;
        } else {
            return null;
        }
    }
    getViewDefServiceUrl(entity, isList, layout) {
        var url = METASERVICE_API_ROOT + SERVICE.METASERVICE.VIEW;
        var params = [{ pattern: ":entity", replacement: entity }, { pattern: ":layout", replacement: layout }];
        if (isList)
            params.push({ pattern: ":list", replacement: "/list" });
        else
            params.push({ pattern: ":list", replacement: "" });
        return this.replaceUrlNamedParams(url, params);
    }
    getFieldMetaServiceUrl(entityName) {
        var url = METASERVICE_API_ROOT + SERVICE.METASERVICE.FIELD;
        var params = [{ pattern: ":entity", replacement: entityName }];
        return this.replaceUrlNamedParams(url, params);
    }
    getEntityMetaServiceUrl(entityName, isList) {
        var url = METASERVICE_API_ROOT + SERVICE.METASERVICE.ENTITY;
        var params = [];
        if (entityName) {
            params.push({ pattern: ":entity", replacement: "/" + entityName });
        } else {
            params.push({ pattern: ":entity", replacement: "" });
        }
        if (isList)
            params.push({ pattern: ":list", replacement: "/list" });
        else
            params.push({ pattern: ":list", replacement: "" });
        return this.replaceUrlNamedParams(url, params);
    }
    getRuleMetaServiceUrl(ruleName, isList) {
        var url = METASERVICE_API_ROOT + SERVICE.METASERVICE.RULE;
        var params = [];
        if (ruleName) {
            params.push({ pattern: ":rule", replacement: "/" + ruleName });
        } else {
            params.push({ pattern: ":rule", replacement: "" });
        }
        if (isList)
            params.push({ pattern: ":list", replacement: "/list" });
        else
            params.push({ pattern: ":list", replacement: "" });
        return this.replaceUrlNamedParams(url, params);
    }
    getDataServiceUrl(entityType, isList, uriSuffix, isLookup) {
        var url = DATASERVICE_API_ROOT + SERVICE.DATASERVICE;
        var params = [{ pattern: ":entityType", replacement: entityType }];
        if (isList)
            params.push({ pattern: ":list", replacement: "/list" });
        else
            params.push({ pattern: ":list", replacement: "" });
        url = this.replaceUrlNamedParams(url, params);
        if (uriSuffix) {
            url += "/" + uriSuffix;
        }
        if (isLookup) {
            url += "?isLookup=true";
        }
        return url;
    }
    timePairDateFormat(timepairList) {
        debugger;
        return timepairList.map(timepair => Object.assign(
            {},
            timepair,
            { INTIME: moment(new Date(timepair.INTIME)).format("YYYY-MM-DD HH:mm:ss") },
            { OUTTIME: moment(new Date(timepair.OUTTIME)).format("YYYY-MM-DD HH:mm:ss") }
        ));
    }
    getCustomerMetaServiceUrl(orgId) {
        var url = METASERVICE_API_ROOT + SERVICE.METASERVICE.CUSTOMER;
        if (url)
            return _.replace(url, ":orgId", orgId);
        else
            return url;
    }

}

export default new AppUtil();