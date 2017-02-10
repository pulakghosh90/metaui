import React from "react";
import { TextBox, Row, Col, Button } from "constants/Components";
import { SimpleEditor } from "constants/ViewConstants";
import _ from "lodash";

class ReactRenderer {
    constructor() {
        this._renderRow = this.renderRow.bind(this);
        this._renderCell = this.renderCell.bind(this);
        this._createComponent = this.createComponent.bind(this);
        this._getComponentProps = this.getComponentProps.bind(this);
    }
    render(viewDef, commonProps) {
        this.commonProps = commonProps;
        // return (
        //     <Container>
        //         viewDef.rows.map(this._renderRow);
        //     </Container>
        // );
        return viewDef.rows.map(this._renderRow);
    }
    renderRow(row, index) {
        return (
            <Row key={"row:" + index} >
                {row.cells.map(this._renderCell)}
            </Row>
        );
    }
    renderCell(cell, index, cells) {
        var len = cells.length;
        var colSpan = 12 / len;
        var fieldMetadata = cell.fieldMetadata;
        var Component;
        var Cell;
        if (cell.fieldMetadata) {
            Component = this._createComponent(cell.fieldMetadata);
            var textFieldProps = this._getComponentProps(cell, index);
            Cell = (
                <Col xs={colSpan} sm={colSpan} md={colSpan} lg={colSpan}
                    key={"cell:" + index} >
                    <Component {...textFieldProps} />
                </Col>
            );
        } else if (cell.action) {
            var btnProps = _.merge({}, this.commonProps.action, { handlers: {} });
            var handlers = this.commonProps.action.handlers;
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
            Cell = (
                <Col xs={colSpan} sm={colSpan} md={colSpan} lg={colSpan}
                    key={"cell:" + index} >
                    <Button {...btnProps} />
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
        switch (fieldMetadata.dataType) {
            case "STRING":
                return TextBox;
            default:
                return TextBox;
        }
    }
    getComponentProps(cell, index) {
        return _.merge({}, this.commonProps.textBox,
            {
                labelText: cell.fieldMetadata.description,
                htmlAttrs: {
                    id: cell.modelElement + index
                },
                bindAttr: cell.fieldMetadata.key
            });
    }
}

export default new ReactRenderer();