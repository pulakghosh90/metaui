const URLS = {
    EMPLOYEES: "#/employees",
    EMPLOYEE_EDITOR: "#/employees/:id",
    HOME: "#/home",
    SETTINGS: "#/settings",
    TIMECARD: "#/timecard"
};

const SERVICE = {
    METASERVICE: {
        ENTITY: "http://localhost:3000/meta/entity/:orgId/:entity",
        FIELD: "http://localhost:3000/meta/fields/:orgId/:entity",
        VIEW: "http://localhost:3000/meta/view/:orgId/:entity/:layout",
        RULE: "http://localhost:3000/meta/rule/:orgId/:rule"
    },
    DATASERVICE: "http://localhost:3001/data/:orgId/:entityType"
}

export {
    URLS,
    SERVICE
};