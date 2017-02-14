import React from "react";
import _ from "lodash";
import ReactRenderer from "renderer/ReactRenderer.jsx";
import ServiceManager from "service/ServiceManager";
import { Message } from "constants/Components";
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

        var response = ServiceManager.getViewDef("EMPLOYEE", "EDITOR");
        this.viewDef = response.data;
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
        var _this = this;
        //fetch record
        var selectedEntity = {};
        selectedEntity[this.primaryKey] = this.props.param.selectedId;
        ServiceManager.getEntity(this.modelEntity, selectedEntity)
            .then(response => {
                var entity = response.data;
                var newState = { parent: {} };
                newState.parent[_this.modelEntity] = entity;
                _this.setState(newState);
            })
            .catch(error => console.error(error));
    }
    render() {
        var children = this._recursiveCloneChildren(this.childComponents);
        return (
            <div id="SimpleEditor" >
                {this.state.message !== {} && <Message {...this.state.message} />}
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
        var newState = _.merge({}, this.state, { parent: value });
        this.setState(newState);
    }
    onSave(evt) {
        var _this = this;
        ServiceManager.saveEntity(this.modelEntity, this.state.parent[this.modelEntity], function (response) {
            _this.setState({
                message: {
                    type: response.status,
                    message: response.status === "success" ? "Save successful!" : "Save failed!"
                }
            });
        });
    }
    onCancel(evt) {
        ReactCommon.goBack();
    }
    onDelete(evt) {
        debugger;
        console.log(this.state);
    }
}

export default SimpleEditor;