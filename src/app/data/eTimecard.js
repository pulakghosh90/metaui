const viewDef = {
    "status": "success",
    "data": {
        "name": "EMPLOYEEEDITOR",
        "modelEntity": "EMPLOYEE",
        "layout": "TABLE",
        "rows": [
            {
                "cells": [
                    {
                        "index": 1,
                        "modelElement": "ASSOCIATEOID",
                        "fieldMetadata": {
                            "lookupTo": null,
                            "dataType": "STRING",
                            "isUnique": true,
                            "displayOrder": 1,
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
                            "displayOrder": 2,
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
                            "displayOrder": 3,
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
                            "displayOrder": 4,
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
                            "displayOrder": 5,
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
            }
        ]
    }
};

export default viewDef;