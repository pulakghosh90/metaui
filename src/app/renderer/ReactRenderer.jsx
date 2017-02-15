import React from "react";
import { TextBox, Row, Col, Button, Checkbox, TextStatic } from "constants/Components";
import { SimpleEditor } from "constants/ViewConstants";
import _ from "lodash";

class ReactRenderer {
    constructor() {
        this.render = this.render.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.createComponent = this.createComponent.bind(this);
    }
    render(viewDef, commonProps) {
        this.commonProps = commonProps;
        return { viewDef: viewDef.rows.map(this.renderRow), primaryKey: this.primaryKey };
    }
    renderRow(row, index) {
        return (
            <Row key={"row:" + index} >
                {row.cells.map(this.renderCell)}
            </Row>
        );
    }
    renderCell(cell, index, cells) {
        var len = cells.length;
        var colSpan = 12 / len;
        var fieldMetadata = cell.fieldMetadata;
        var component;
        var Cell;
        if (cell.fieldMetadata && !cell.modelElement.includes("ADDRESS") && !cell.modelElement.includes("SERVICEDATES")) {
            if (cell.fieldMetadata.isPrimaryKey) {
                this.primaryKey = cell.fieldMetadata.name;
            }
            component = this.createComponent(cell.fieldMetadata);
            // var textFieldProps = this.getComponentProps(cell, index);
            Cell = (
                <Col xs={colSpan} sm={colSpan} md={colSpan} lg={colSpan} key={"cell:" + index} >
                    {component}
                </Col>
            );
        } else if (cell.action && cell.action === "SAVE") {
            var buttons = [];

            var btnProps = _.merge({}, this.commonProps.action, { handlers: {} });
            var handlers = this.commonProps.action.handlers;
            btnProps.handlers.onClick = handlers.onSave;
            btnProps.styles.label.className = "btn btn-primary";
            btnProps.styles.label.inlineStyle = { marginRight: "5px", marginLeft: "5px" };
            btnProps.labelText = "SAVE";
            buttons.push((<Button {...btnProps} key="SAVE" />));

            btnProps = _.merge({}, this.commonProps.action, { handlers: {} });
            handlers = this.commonProps.action.handlers;
            btnProps.handlers.onClick = handlers.onDelete;
            btnProps.styles.label.className = "btn btn-danger";
            btnProps.styles.label.inlineStyle = { marginRight: "5px", marginLeft: "5px" };
            btnProps.labelText = "DELETE";
            buttons.push((<Button {...btnProps} key="DELETE" />));

            btnProps = _.merge({}, this.commonProps.action, { handlers: {} });
            handlers = this.commonProps.action.handlers;
            btnProps.handlers.onClick = handlers.onCancel;
            btnProps.styles.label.className = "btn btn-default";
            btnProps.styles.label.inlineStyle = { marginRight: "5px", marginLeft: "5px" };
            btnProps.labelText = "CANCEL";
            buttons.push((<Button {...btnProps} key="CANCEL" />));

            Cell = (
                <Col xs={12} sm={12} md={12} lg={12} key={"cell:" + index} >
                    {buttons}
                </Col>
            );
        } else {
            Cell = (
                <Col xs={colSpan} sm={colSpan} md={colSpan} lg={colSpan}
                    key={"cell:" + index} >
                </Col>
            );
        }
        return Cell;
    }
    createComponent(fieldMetadata) {
        var props;
        if (fieldMetadata.dataType === "STRING" &&
            (fieldMetadata.isPrimaryKey || fieldMetadata.fieldType === "CALCULATED")) {
            props = _.merge({}, this.commonProps.textStatic,
                {
                    labelText: fieldMetadata.description,
                    bindAttr: fieldMetadata.key
                });
            return <TextStatic {...props} />;
        } else if (fieldMetadata.dataType === "STRING" && fieldMetadata.fieldType === "FREE") {
            props = _.merge({}, this.commonProps.textBox,
                {
                    labelText: fieldMetadata.description,
                    bindAttr: fieldMetadata.key
                });
            return <TextBox {...props} />;
        } else if (fieldMetadata.dataType === "BOOLEAN" && fieldMetadata.fieldType === "FREE") {
            props = _.merge({}, this.commonProps.checkBox, {
                labelText: fieldMetadata.description,
                styles: {
                    label: { className: "", inlineStyle: {} }
                },
                value: false,
                handlers: {},
                bindAttr: fieldMetadata.key
            });
            return <Checkbox {...props} />;
        } else {
            return null;
        }
    }
}

export default new ReactRenderer();