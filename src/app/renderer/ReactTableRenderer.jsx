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
        var buttons = [];
        var columnMeta;
        rowsMetaData.map(rowMeta => {
            rowMeta.cells.map((cell, index, arr) => {
                if (cell.fieldMetadata && cell.fieldMetadata.name !== "EMPLOYEEID"
                    && cell.fieldMetadata.name !== "NOTE"
                    && cell.fieldMetadata.name !== "SYSTEMID") {
                    columnMeta = Object.assign({}, columnMetaTemplate);
                    columnMeta.columnName = cell.modelElement;
                    columnMeta.order = cell.fieldMetadata.displayOrder;
                    columnMeta.displayName = cell.fieldMetadata.name;
                    if (cell.fieldMetadata.fieldType === "FREE") {
                        columnMeta.customComponent = GridCustomComponents.TextBox;
                        columnMeta.onChange = commonProps.textBox.handlers.onChange;
                    } else if (cell.fieldMetadata.fieldType === "CALCULATED") {
                        columnMeta.cssClassName = "col-calculated-right";
                    }
                    columnMetadata.push(columnMeta);
                    columns.push(cell.fieldMetadata.name);
                } else if (cell.action) {
                    var btnProps = _.merge({}, commonProps.action, { handlers: {} });
                    var handlers = commonProps.action.handlers;
                    var btnClass;
                    var onClick;
                    var labelText;
                    if (cell.action === "SAVE") {
                        btnClass = "btn btn-primary";
                        onClick = handlers.onSave;
                        labelText = "SAVE";
                    } else if (cell.action === "CANCEL") {
                        btnClass = "btn btn-default";
                        onClick = handlers.onCancel;
                        labelText = "CANCEL";
                    } else {
                        return;
                    }
                    btnProps.handlers.onClick = onClick;
                    btnProps.styles.label.className = btnClass;
                    btnProps.styles.label.inlineStyle = { marginRight: "5px", marginLeft: "5px" };
                    btnProps.labelText = labelText;
                    buttons.push((<Button {...btnProps} key={"cell:" + index} />));
                }
            });
        });
        var Cell = (
            <Col xs={12} sm={12} md={12} lg={12} key="btns" style={{ textAlign: "right" }}>{buttons}</Col>
        );
        actions.push(Cell);
        return { columnMetadata, columns, actions };
    }
}

export default new ReactTableRenderer();
