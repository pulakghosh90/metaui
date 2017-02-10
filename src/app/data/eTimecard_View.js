const viewDef = {
    "status": "success",
    "data": {
        "name": "EMPLOYEEEDITOR",
        "modelEntity": "EMPLOYEE",
        "layout": "EDITOR",
        "rows": [
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "EMPLOYEEID",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": true,
                            "displayOrder": 1,
                            "description": "Employee ID",
                            "isPrimaryKey": true,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": false,
                            "name": "EMPLOYEEID",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.EMPLOYEEID"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "ASSOCIATEOID",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": true,
                            "displayOrder": 2,
                            "description": "Associate ID",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": false,
                            "name": "ASSOCIATEOID",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.ASSOCIATEOID"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "FIRSTNAME",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 3,
                            "description": "First Name",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": false,
                            "name": "FIRSTNAME",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.FIRSTNAME"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "LASTNAME",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 4,
                            "description": "Last Name",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": false,
                            "name": "LASTNAME",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.LASTNAME"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "FULLNAME",
                        "fieldMetadata": {
                            "calcFormula": "$LASTNAME + ', '+ $FIRSTNAME",
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 5,
                            "description": "Full Name",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isLookupLabel": true,
                            "isNullable": false,
                            "name": "FULLNAME",
                            "options": null,
                            "fieldType": "CALCULATED",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.FULLNAME"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "PAYCLASSID",
                        "fieldMetadata": {
                            "lookupTo": "PAYCLASS.PAYCLASSID",
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 6,
                            "description": "Pay class ID",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": false,
                            "name": "PAYCLASSID",
                            "options": null,
                            "fieldType": "LOOKUP",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.PAYCLASSID"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "SUPERVISORID",
                        "fieldMetadata": {
                            "lookupTo": "EMPLOYEE.EMPLOYEEID",
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 7,
                            "description": "Supervisor's employee ID",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": true,
                            "name": "SUPERVISORID",
                            "options": null,
                            "fieldType": "LOOKUP",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.SUPERVISORID"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "EMAIL",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 8,
                            "description": "E-mail Address",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": true,
                            "name": "EMAIL",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.EMAIL"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "HOMEADDRESS",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "OBJECT",
                            "isUnique": false,
                            "displayOrder": 9,
                            "description": "Address",
                            "isPrimaryKey": false,
                            "objectRefId": "EMPLOYEE.ADDRESS",
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": true,
                            "name": "HOMEADDRESS",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.HOMEADDRESS"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "OFFICEADDRESS",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "OBJECT",
                            "isUnique": false,
                            "displayOrder": 10,
                            "description": "Address",
                            "isPrimaryKey": false,
                            "objectRefId": "EMPLOYEE.ADDRESS",
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": true,
                            "name": "OFFICEADDRESS",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.OFFICEADDRESS"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "TIMEZONEID",
                        "fieldMetadata": {
                            "lookupTo": "TIMEZONE.TIMEZONEID",
                            "dataType": "STRING",
                            "isUnique": false,
                            "displayOrder": 11,
                            "description": "Timezone of the employee",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": true,
                            "name": "TIMEZONEID",
                            "options": null,
                            "fieldType": "LOOKUP",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.TIMEZONEID"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "SERVICEDATES",
                        "fieldMetadata": {
                            "lookupTo": "TIMEZONE.TIMEZONEID",
                            "dataType": "LIST",
                            "isUnique": false,
                            "displayOrder": 12,
                            "description": "List of service dates for employee",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": true,
                            "name": "SERVICEDATES",
                            "options": null,
                            "fieldType": "LOOKUP",
                            "elementType": {
                                "objectRefId": "EMPLOYEE.SERVICEDATE",
                                "dataType": "OBJECT"
                            },
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.SERVICEDATES"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "ISTERMINATED",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "BOOLEAN",
                            "isUnique": false,
                            "displayOrder": 13,
                            "description": "Whether the employee is active or terminated",
                            "isPrimaryKey": false,
                            "objectRefId": null,
                            "orgId": "G3J8EKQJ6481CSDC",
                            "isNullable": false,
                            "name": "ISTERMINATED",
                            "options": null,
                            "fieldType": "FREE",
                            "entity": "EMPLOYEE",
                            "key": "EMPLOYEE.ISTERMINATED"
                        }
                    }
                ]
            },
            {
                "cells": [
                    {
                        "index": 1,
                        "action": "SAVE"
                    },
                    {
                        "index": 2,
                        "action": "DELETE"
                    },
                    {
                        "index": 3,
                        "action": "CANCEL"
                    }
                ]
            }
        ]
    }
};

export default viewDef;