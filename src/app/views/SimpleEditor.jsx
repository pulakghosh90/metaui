import React from "react";
import ReactRenderer from "renderer/ReactRenderer.jsx";
import _ from "lodash";
import ServiceManager from "service/ServiceManager";
import { Row, Col, Link } from "constants/Components";
import Container from "views/Container.jsx";

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
        this.viewDef = ServiceManager.getViewDef();
        this.componentId = this.viewDef.name;
        this.modelEntity = this.viewDef.modelEntity;

        //event handlers
        this._onChange = this.onChange.bind(this);
        this._onSave = this.onSave.bind(this);
        this._onCancel = this.onCancel.bind(this);
        this._onDelete = this.onDelete.bind(this);
        this._renderJSON = this.renderJSON.bind(this);
        this._recursiveCloneChildren = this.recursiveCloneChildren.bind(this);

        var parent = {};
        parent[this.viewDef.modelEntity] = {};
        this.state = {};
        this.state.parent = parent;
        //text field props
        this.commonProps = commonFieldProps;
        this.commonProps.textBox.handlers = { onChange: this._onChange };
        this.commonProps.action.handlers = {
            onSave: this._onSave,
            onCancel: this._onCancel,
            onDelete: this._onDelete
        };

        this.childComponents = this._renderJSON();
    }
    componentDidMount() {
        debugger;
        //fetch record
        var emp = ServiceManager.getEmployees(this.props.param.employeeId);
        var newState = { parent: {} };
        newState.parent[this.modelEntity] = emp;
        this.setState(newState);
    }
    render() {
        console.log(this.state);
        var children = this._recursiveCloneChildren(this.childComponents);
        debugger;
        return (
            <div id="SimpleEditor" >
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
        console.log(this.state);
    }
    onCancel(evt) {
        debugger;
        console.log(this.state);
    }
    onDelete(evt) {
        debugger;
        console.log(this.state);
    }
}

export default SimpleEditor;