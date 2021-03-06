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

    render(rowsMetaData, commonProps) {
        debugger;
        var columnMetadata = [];
        var columns = [];
        var actions = [];
        var columnMeta;
        columnMetadata = this.createAddDeleteBtn(commonProps);
        columns.push("addRow");
        // columns.push("deleteRow");
        rowsMetaData.map(rowMeta => {
            rowMeta.cells.map((cell, index, arr) => {
                if (cell.fieldMetadata && cell.fieldMetadata.name !== "EMPLOYEEID" && cell.fieldMetadata.name !== "EMPLOYEE"
                    && cell.fieldMetadata.name !== "NOTE" && cell.fieldMetadata.name !== "SYSTEMID") {
                    columnMeta = Object.assign({}, columnMetaTemplate);
                    columnMeta.columnName = cell.modelElement;
                    columnMeta.order = cell.fieldMetadata.displayOrder + 2;
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
                    actions.push((<Button {...btnProps} key={"cell:" + index} />));
                }
            });
        });
        return { columnMetadata, columns, actions };
    }

    createAddDeleteBtn(commonProps) {
        var buttons = [];
        var columnMeta = Object.assign({}, columnMetaTemplate);
        columnMeta.columnName = "addRow";
        columnMeta.order = 0;
        columnMeta.displayName = "";
        columnMeta.customComponent = GridCustomComponents.Button;
        columnMeta.onClick = commonProps.addRow.handlers.onClick;
        columnMeta.icon = "fa fa-plus-square-o";
        columnMeta.iconStyle = {
            fontSize: "25px"
        }
        columnMeta.style = {
            background: "#fff",
            border: "none"
        }
        buttons.push(columnMeta);

        // columnMeta = Object.assign({}, columnMetaTemplate);
        // columnMeta.columnName = "deleteRow";
        // columnMeta.order = 1;
        // columnMeta.displayName = "";
        // columnMeta.customComponent = GridCustomComponents.Button;
        // columnMeta.onClick = commonProps.deleteRow.handlers.onClick;
        // columnMeta.icon = "fa fa-minus-square-o";
        // columnMeta.iconStyle = {
        //     fontSize: "25px"
        // }
        // columnMeta.style = {
        //     background: "#fff",
        //     border: "none"
        // }
        // buttons.push(columnMeta);
        return buttons;
    }
}

export default new ReactTableRenderer();
