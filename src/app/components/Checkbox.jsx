import React from "react";

/******
accepts property in the below format
props = {
    labelText: {} || value,
    htmlAttrs: {},
    styles: {
        label: {className: String, inlineStyle: {}}
    },
    value: {} || value,
    handlers: {},
    bindAttr: String
} 
*******/
class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = this.onClick.bind(this);
        this._findValue = this.findValue.bind(this);
    }
    onClick(evt) {
        debugger;
        var state = {};
        var entityNprops = this.props.bindAttr.split(".");
        if (entityNprops.length > 1) {
            var entityName = entityNprops[0];
            var props = entityNprops[1];
            state[entityName] = {};
            state[entityName][props] = evt.target.checked;
        } else {
            state[entityNprops[0]] = evt.target.checked;
        }
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
        var htmlAttrs = this.props.htmlAttrs;
        var labelStyles = this.props.styles.label;
        var style = Object.assign({}, { paddingLeft: "5px", fontWeight: 100 }, labelStyles.inlineStyle);
        var value = this._findValue();
        return (
            <div >
                <input type="checkbox" id={htmlAttrs.id} value={value}
                    onClick={this._onClick} />
                {
                    this.props.labelText &&
                    <label style={style} className={labelStyles.className}>
                        {this.props.labelText}
                    </label>
                }
            </div>
        );
    }
}

export default Checkbox;