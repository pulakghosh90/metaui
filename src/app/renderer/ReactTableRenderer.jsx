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

    render(rowsMetaData, commonProps) {
        debugger;
        var columnMetadata = [];
        var columns = [];
        var actions = [];
        var columnMeta;
        rowsMetaData.map(rowMeta => {
            rowMeta.cells.map((cell, index, arr) => {
                if (cell.fieldMetadata && cell.fieldMetadata.name !== "EMPLOYEEID" && cell.fieldMetadata.name !== "NOTE") {
                    columnMeta = Object.assign({}, columnMetaTemplate);
                    columnMeta.columnName = cell.modelElement;
                    columnMeta.order = cell.fieldMetadata.displayOrder;
                    columnMeta.displayName = cell.fieldMetadata.name;
                    if (cell.fieldMetadata.fieldType === "FREE") {
                        columnMeta.customComponent = GridCustomComponents.TextBox;
                        columnMeta.onChange = commonProps.textBox.handlers.onChange;
                    }
                    columnMetadata.push(columnMeta);
                    columns.push(cell.fieldMetadata.name);
                } else if (cell.action) {
                    var colSpan = 12 / arr.length;
                    var btnProps = _.merge({}, commonProps.action, { handlers: {} });
                    var handlers = commonProps.action.handlers;
                    var btnClass;
                    var onClick;
                    var labelText;
                    switch (cell.action) {
                        case "SAVE":
                            btnClass = "btn btn-primary";
                            onClick = handlers.onSave;
                            labelText = "SAVE";
                            break;
                        case "DELETE":
                            btnClass = "btn btn-danger";
                            onClick = handlers.onDelete;
                            labelText = "DELETE";
                            break;
                        case "CANCEL":
                            btnClass = "btn btn-default";
                            onClick = handlers.onCancel;
                            labelText = "CANCEL";
                            break;
                        default:
                            btnClass = "btn btn-default";
                            break;
                    };
                    btnProps.handlers.onClick = onClick;
                    btnProps.styles.label.className = btnClass;
                    btnProps.labelText = labelText;
                    var Cell = (
                        <Col xs={colSpan} sm={colSpan} md={colSpan} lg={colSpan}
                            key={"cell:" + index} >
                            <Button {...btnProps} />
                        </Col>
                    );
                    actions.push(Cell);
                }
            });
        });

        return { columnMetadata, columns, actions };
    }
}

export default new ReactTableRenderer();
