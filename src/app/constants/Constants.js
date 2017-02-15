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