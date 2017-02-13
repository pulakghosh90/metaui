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
        this.state = { value: "" };
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
    render() {
        var htmlAttrs = this.props.htmlAttrs || {};
        var selectStyles = this.props.styles.select || {};
        var labelStyles = this.props.styles.label || {};
        var options = this.props.options || [];
        var value = this.props.value;

        return (
            <div>
                {
                    this.props.labelText &&
                    <label className={labelStyles.className} style={{ paddingRight: "10px" }}>
                        {this.props.labelText}
                    </label>
                }
                <select id={htmlAttrs.id} className={selectStyles.className} value={this.state.value} onChange={this._onChange}
                    style={selectStyles.inlineStyle}>
                    {
                        options.map((option, index) => {
                            if (option.value === value) {
                                return <option key={index} value={option.value}>{option.label}</option>;
                            } else {
                                return <option key={index} value={option.value}>{option.label}</option>;
                            }
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Select;