import React from "react";
import _ from "lodash";
import { Select, Row, Col, Message, Button } from "constants/Components";
import ServiceManager from "service/ServiceManager";
import ReactCommon from "common/ReactCommon";

const commonProps = {
    labelText: "Select Entity:",
    htmlAttrs: {},
    styles: {
        select: { className: "", inlineStyle: {} },
        label: { className: "", inlineStyle: {} }
    },
    options: [],
    value: "",
    handlers: {},
    bindAttr: "",
};
const actionProps = {
    labelText: "",
    htmlAttrs: {},
    styles: { label: {} },
    handlers: {}
};

class EntityEditor extends React.Component {
    constructor(props) {
        super(props);
        this._onEntityDefChange = this.onEntityDefChange.bind(this);
        this._onFieldDefChange = this.onFieldDefChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onDelete = this.onDelete.bind(this);
        this._onSelectEntity = this.onSelectEntity.bind(this);

        this.selectorProps = _.merge({}, commonProps);
        this.selectorProps.handlers.onChange = this._onSelectEntity;
        this.selectorProps.bindAttr = "ENTITYNAME";

        this.saveBtnProps = _.merge({}, actionProps);
        this.saveBtnProps.handlers.onClick = this._onSave;
        this.saveBtnProps.styles.label.className = "btn btn-primary";
        this.saveBtnProps.styles.label.inlineStyle = { marginRight: "5px", marginLeft: "5px" };
        this.saveBtnProps.labelText = "SAVE";

        this.cancelBtnProps = _.merge({}, actionProps);
        this.cancelBtnProps.handlers.onClick = this._onCancel;
        this.cancelBtnProps.styles.label.className = "btn btn-default";
        this.cancelBtnProps.styles.label.inlineStyle = { marginRight: "5px", marginLeft: "5px" };
        this.cancelBtnProps.labelText = "CANCEL";

        this.state = { message: {}, entities: [], fieldDef: "", entityDef: "", selectedEntity: "" };
    }
    componentDidMount() {
        var _this = this;
        ServiceManager.getEntityMetaList()
            .then(response => {
                var entities = [];
                response.data.forEach(en => {
                    if (en.name === "EMPLOYEE" || en.name === "TIMEPAIR")
                        entities.push({ label: en.name, value: en.name });
                });
                entities = [{ label: "Select Entity", value: "" }].concat(entities);
                _this.setState({ entities });
            });
    }
    render() {
        debugger;
        this.selectorProps.options = this.state.entities;
        if (this.state.entities.length > 0)
            this.selectorProps.value = this.state.entities[0].value;
        else
            this.selectorProps.value = "";

        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div style={{ fontSize: "30px" }}>Entity Editor</div>
                    </Col>
                </Row>
                {this.state.message !== {} && <Message {...this.state.message} />}
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Select {...this.selectorProps} />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: "10px" }}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <label>Entity Definition</label>
                        <textarea rows="3" style={{ width: "100%" }} value={this.state.entityDef}
                            onChange={this._onEntityDefChange}>
                        </textarea>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <label>Field Definition</label>
                        <textarea rows="15" style={{ width: "100%" }} value={this.state.fieldDef}
                            onChange={this._onFieldDefChange}>
                        </textarea>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px" }}>
                    <Col xs={12} sm={12} md={12} lg={12} style={{ textAlign: "right" }}>
                        <Button {...this.saveBtnProps} />
                        <Button {...this.cancelBtnProps} />
                    </Col>
                </Row>
            </div>
        );
    }
    onSelectEntity(val) {
        debugger;
        var _this = this;
        ServiceManager.getEntityMetadata(val.ENTITYNAME)
            .then(response => {
                _this.setState({ entityDef: JSON.stringify(response.data, null, '\t'), selectedEntity: val.ENTITYNAME });
            })
            .catch(error => console.error(error));

        ServiceManager.getFieldMetadata(val.ENTITYNAME)
            .then(response => {
                _this.setState({ fieldDef: JSON.stringify(response.data, null, '\t') });
            })
            .catch(error => console.error(error));
    }
    onEntityDefChange(evt) {
        debugger;
        this.setState({ entityDef: evt.target.value });
    }
    onFieldDefChange(evt) {
        debugger;
        this.setState({ fieldDef: evt.target.value });
    }
    onSave() {
        debugger;
        var _this = this;
        ServiceManager.saveFieldMetadata(this.state.selectedEntity, this.state.fieldDef)
            .then(response => {
                _this.setState({
                    message: {
                        type: response.status,
                        message: "Save successful!"
                    }
                });
            })
            .catch(error => {
                _this.setState({
                    message: {
                        type: "error",
                        message: "Error occured while save!"
                    }
                });
            });
    }
    onCancel() {
        ReactCommon.goBack();
    }
    onDelete() {

    }
}

export default EntityEditor;