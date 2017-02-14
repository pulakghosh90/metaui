const URLS = {
    EMPLOYEES: "#/employees",
    EMPLOYEE_EDITOR: "#/employees/:id",
    HOME: "#/home",
    SETTINGS: "#/settings",
    TIMECARD: "#/timecard"
};

const SERVICE = {
    METASERVICE: {
        ENTITY: "/meta/entity/:orgId/:entity",
        FIELD: "/meta/fields/:orgId/:entity",
        VIEW: "/meta/view/:orgId/:entity/:layout",
        RULE: "/meta/rule/:orgId/:rule"
    },
    DATASERVICE: "/data:list/:orgId/:entityType"
}

export {
    URLS,
    SERVICE
};