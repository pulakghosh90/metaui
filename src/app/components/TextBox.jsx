import React from "react";
import _ from "lodash";

/******
accepts property in the below format
props = {
    labelText: {} || value,
    htmlAttrs: {},
    styles: {
        input: {className: String, inlineStyle: {}},
        label: {className: String, inlineStyle: {}}
    },
    value: {} || value,
    handlers: {},
    bindAttr: String,
    validator: function,
    rules : {}
} 
*******/
class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this.onChange.bind(this);
        this._findValue = this.findValue.bind(this);
    }
    onChange(evt) {
        var state = {};
        var entityNprops = this.props.bindAttr.split(".");
        if (entityNprops.length > 1) {
            var entityName = entityNprops[0];
            var props = entityNprops[1];
            state[entityName] = {};
            state[entityName][props] = evt.target.value;
        } else {
            state[entityNprops[0]] = evt.target.value;
        }
        this.currentVal = state;
        this.props.handlers.onChange(state);
    }
    findValue() {
        if (this.props && this.props.parent) {
            var entityNprops = this.props.bindAttr.split(".");
            if (entityNprops.length > 1) {
                var entityName = entityNprops[0];
                var props = entityNprops[1];
                return this.props.parent[entityName][props] || "";
            } else {
                return this.props.value[entityNprops[0]] || "";
            }
        }
    }
    render() {
        var htmlAttrs = this.props.htmlAttrs || {};
        var inputStyles = this.props.styles.input || {};
        var labelStyles = this.props.styles.label || {};
        var value = this._findValue();
        var key = htmlAttrs.key || htmlAttrs.id;
        var type = htmlAttrs.password ? "password" : "text";
        return (
            <div>
                {
                    this.props.labelText &&
                    <label className={labelStyles.className} style={labelStyles.inlineStyle}>
                        {this.props.labelText}
                    </label>
                }
                <input type={type} key={key} id={htmlAttrs.id} className={inputStyles.className}
                    style={inputStyles.inlineStyle}
                    placeholder={htmlAttrs.placeholder}
                    value={value}
                    onChange={this._onChange} />
            </div>
        );
    }
}

export default TextBox;