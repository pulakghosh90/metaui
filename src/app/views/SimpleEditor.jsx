import React from "react";
import _ from "lodash";
import ReactRenderer from "renderer/ReactRenderer.jsx";
import ServiceManager from "service/ServiceManager";
import { Row, Col, Link, Message } from "constants/Components";
import ReactCommon from "common/ReactCommon";

const commonFieldProps = {
    textBox: {
        labelText: null,
        htmlAttrs: { password: false },
        styles: {
            input: { className: "" },
            label: {
                inlineStyle: {
                    width: "200px",
                    wordWrap: "break-word"
                }
            }
        },
        handlers: {},
        rules: {},
        validator: () => { }
    },
    action: {
        labelText: "",
        htmlAttrs: {},
        styles: { label: { className: "" } },
        handlers: {}
    }
};

class SimpleEditor extends React.Component {
    constructor(props) {
        debugger;
        super(props);

        //event handlers
        this._onChange = this.onChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onDelete = this.onDelete.bind(this);
        this._renderJSON = this.renderJSON.bind(this);
        this._recursiveCloneChildren = this.recursiveCloneChildren.bind(this);

        this.viewDef = ServiceManager.getViewDef("EMPLOYEE", "EDITOR");
        this.componentId = this.viewDef.name;
        this.modelEntity = this.viewDef.modelEntity;

        var parent = {};
        parent[this.viewDef.modelEntity] = {};
        this.state = {};
        this.state.parent = parent;
        this.state.message = {};
        //text field props
        this.commonProps = commonFieldProps;
        this.commonProps.textBox.handlers = { onChange: this._onChange };
        this.commonProps.action.handlers = {
            onSave: this._onSave,
            onCancel: this._onCancel,
            onDelete: this._onDelete
        };

        var viewInfo = this._renderJSON();
        this.childComponents = viewInfo.viewDef;
        this.primaryKey = viewInfo.primaryKey;
    }
    componentDidMount() {
        debugger;
        //fetch record
        var selectedEntity = {};
        selectedEntity[this.primaryKey] = this.props.param.selectedId;
        var entity = ServiceManager.getEntity(this.modelEntity, selectedEntity);
        var newState = { parent: {} };
        newState.parent[this.modelEntity] = entity;
        this.setState(newState);
    }
    render() {
        var children = this._recursiveCloneChildren(this.childComponents);
        return (
            <div id="SimpleEditor" >
                {this.state.message !== {} &&
                    <Message {...this.state.message} />
                }
                {children}
            </div>
        );
    }
    renderJSON() {
        return ReactRenderer.render(this.viewDef, this.commonProps);
    }

    recursiveCloneChildren(children) {
        return React.Children.map(children, function (child) {
            var childProps = {};
            if (React.isValidElement(child)) {
                childProps = { parent: this.state.parent };
            }
            childProps.children = this._recursiveCloneChildren(child.props.children);
            return React.cloneElement(child, childProps);
        }.bind(this));
    }
    onChange(value) {
        debugger;
        var newState = _.merge({}, this.state, { parent: value });
        this.setState(newState);
    }
    onSave(evt) {
        debugger;
        var entity = this.state.parent[this.modelEntity];
        var response = ServiceManager.saveEntity(this.modelEntity, entity);
        this.setState(response);
    }
    onCancel(evt) {
        debugger;
        ReactCommon.goBack();
    }
    onDelete(evt) {
        debugger;
        console.log(this.state);
    }
}

export default SimpleEditor;