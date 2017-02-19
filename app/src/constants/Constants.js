const URLS = {
    HOME: "#/home",
    EMPLOYEES: "#/employees",
    EMPLOYEE_EDITOR: "#/employees/:id",
    TIMECARD: "#/timecard",
    SETTINGS: "#/settings",
    ENTITY: "#/settings/entity",
    RULE: "#/settings/rule"
};

const SERVICE = {
    METASERVICE: {
        ENTITY: "/meta:list/entity/:orgId:entity",
        FIELD: "/meta/fields/:orgId/:entity",
        VIEW: "/meta:list/view/:orgId/:entity/:layout",
        RULE: "/meta:list/rule/:orgId:rule",
        CUSTOMER: "/meta/customer/:orgId"
    },
    DATASERVICE: "/data:list/:orgId/:entityType"
}

export {
    URLS,
    SERVICE
};