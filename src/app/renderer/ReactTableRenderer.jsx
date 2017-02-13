import React from "react";
import { TextBox, Row, Col, Button, GridCustomComponents } from "constants/Components";
import { SimpleEditor } from "constants/ViewConstants";

const columnMetaTemplate = {
    "columnName": "",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "",
    "sortable": false
};

class ReactTableRenderer {
    constructor() {
    }

    render(rowsMetaData) {
        debugger;
        var griddleColMetaData = [];
        var columnMeta;
        rowsMetaData.map(rowMeta => {
            rowMeta.cells.map(cell => {
                columnMeta = Object.assign({}, columnMetaTemplate);
                columnMeta.columnName = cell.modelElement;
                columnMeta.order = cell.fieldMetadata.displayOrder;
                columnMeta.displayName = cell.fieldMetadata.description;
                if (cell.fieldMetadata.fieldType === "FREE") {
                    columnMeta.customComponent = GridCustomComponents.TextBox;
                }
                griddleColMetaData.push(columnMeta);
            });
        });

        return griddleColMetaData;
    }
}

export default new ReactTableRenderer();
