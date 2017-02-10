import { employees, empDetails } from "data/employees";
import eTimecard_View from "data/eTimecard_View";
import { Users } from "data/Users";

class ServiceManager {
    constructor() {

    }
    callService(config) {

    }
    getEmployees(id) {
        return empDetails.filter(function (emp) { return emp.EMPLOYEEID == id; })[0];
    }
    getEmployeeList() {
        return employees;
    }
    authenticateAndGetUserDetails(user) {
        return Users.filter(u => u.orgoid === user.orgoid && u.userName === user.userName && u.pwd === user.pwd)[0];
    }
    getViewDef() {
        return eTimecard_View.data;
    }
}

export default new ServiceManager();