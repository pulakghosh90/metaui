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
        this._onChange = this.onChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onDelete = this.onDelete.bind(this);

        this.selectorProps = _.merge({}, commonProps);
        this.selectorProps.handlers.onChange = this._onChange;
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

        this.state = { message: {}, entities: [], fieldDef: "", entityDef: "" };
    }
    componentDidMount() {
        var _this = this;
        ServiceManager.getEntityMetaList()
            .then(response => {
                var entities = [{ label: "Select Entity", value: "" }].concat(response.data);
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
                        <textarea rows="3" style={{ width: "100%" }} value={this.state.entityDef}
                            onChange={this._onChange}>
                        </textarea>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <textarea rows="15" style={{ width: "100%" }} value={this.state.fieldDef}
                            onChange={this._onChange}>
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
    onChange(val) {
        debugger;
        var _this = this;
        ServiceManager.getEntityMetadata(val.ENTITYNAME)
            .then(response => {
                _this.setState({ entityDef: JSON.stringify(response.data) });
            })
            .catch(error => console.error(error));
        ServiceManager.getFiledMetadata(val.ENTITYNAME)
            .then(response => {
                _this.setState({ fieldDef: JSON.stringify(response.data) });
            })
            .catch(error => console.error(error));
    }
    onSave() {
        debugger;
    }
    onCancel() {
        ReactCommon.goBack();
    }
    onDelete() {

    }
}

export default EntityEditor;