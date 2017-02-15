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

class RuleEditor extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this.onChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onDelete = this.onDelete.bind(this);

        this.selectorProps = _.merge({}, commonProps);
        this.selectorProps.handlers.onChange = this._onChange;
        this.selectorProps.bindAttr = "RULENAME";

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

        this.state = { message: {}, rules: [], ruleDef: "" };
    }
    componentDidMount() {
        var _this = this;
        ServiceManager.getRuleMetaList()
            .then(response => {
                var rules = [{ label: "Select Rule", value: "" }].concat(response.data);
                _this.setState({ rules });
            });
    }
    render() {
        debugger;
        this.selectorProps.options = this.state.rules;
        if (this.state.rules.length > 0)
            this.selectorProps.value = this.state.rules[0].value;
        else
            this.selectorProps.value = "";

        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div style={{ fontSize: "30px" }}>Rule Editor</div>
                    </Col>
                </Row>
                {this.state.message !== {} && <Message {...this.state.message} />}
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Select {...this.selectorProps} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <textarea rows="12" style={{ width: "100%" }} value={this.state.ruleDef}
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
        if (val.RULENAME) {
            var _this = this;
            ServiceManager.getRuleMetadata(val.RULENAME)
                .then(response => {
                    _this.setState({ ruleDef: response.data.Item.script });
                })
                .catch(error => console.error(error));
        }
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

export default RuleEditor;