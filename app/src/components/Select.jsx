import React from "react";

/******
accepts property in the below format
props = {
    labelText: String
    htmlAttrs: {},
    styles: {
        select: {className: String, inlineStyle: {}},
        label: {className: String, inlineStyle: {}}
    },
    options: [],
    value: String,
    handlers: {},
    bindAttr: String,
} 
*******/
class Select extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this.onChange.bind(this);
        this._findValue = this.findValue.bind(this);

        this.state = { value: this.props.value };
    }
    onChange(evt) {
        debugger;
        var val = evt.target.options[evt.target.selectedIndex].value;
        var state = {};
        var entityNprops = this.props.bindAttr.split(".");
        if (entityNprops.length > 1) {
            var entityName = entityNprops[0];
            var props = entityNprops[1];
            state[entityName] = {};
            state[entityName][props] = val;
        } else {
            state[entityNprops[0]] = val;
        }
        this.setState({ value: val });
        this.props.handlers.onChange(state);
    }
    findValue() {
        if (this.props && this.props.parent && this.props.parent !== {}) {
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
        var selectStyles = this.props.styles.select || {};
        var labelStyles = this.props.styles.label || {};
        var style = Object.assign({}, labelStyles.inlineStyle, { paddingRight: "10px" });
        var options = this.props.options || [];
        var value = this.state.value || this._findValue();

        return (
            <div>
                {
                    this.props.labelText &&
                    <label className={labelStyles.className} style={style}>
                        {this.props.labelText}
                    </label>
                }
                <select id={htmlAttrs.id} className={selectStyles.className} value={value}
                    onChange={this._onChange} style={selectStyles.inlineStyle}>
                    {
                        options.map((option, index) => {
                            return <option key={index} value={option.value}>{option.label}</option>;
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Select;