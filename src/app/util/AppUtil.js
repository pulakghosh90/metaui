import faker from "faker";
import _ from "lodash";
import { SERVICE } from "constants/Constants";
import AppContext from "common/AppContext";

class AppUtil {
    generateFakeData(numOfRecord) {
        debugger;
        var emps = [];
        for (var i = 0; i < numOfRecord; i++) {
            emps.push({
                name: faker.name.findName(),
                email: faker.internet.email(),
                city: faker.address.city()
            });
        }
        return emps;
    }
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
    getViewDefServiceUrl(entity, layout) {
        var url = SERVICE.METASERVICE.VIEW;
        var params = [{ pattern: ":entity", replacement: entity }, { pattern: ":layout", replacement: layout }];
        return this.replaceUrlNamedParams(url, params);
    }
    getDataServiceUrl(entityType, uriSuffix) {
        var url = SERVICE.DATASERVICE;
        var params = [{ pattern: ":entityType", replacement: entityType }];
        if (uriSuffix)
            return this.replaceUrlNamedParams(url, params) + "/" + uriSuffix;
        else
            return this.replaceUrlNamedParams(url, params);
    }
}

export default new AppUtil();