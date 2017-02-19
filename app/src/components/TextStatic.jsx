import React from "react";

/******
accepts property in the below format
props = {
    labelText: String,
    htmlAttrs: {},
    styles: {
        label: {className: String, inlineStyle: {}},
        value: {className: String, inlineStyle: {}}
    },
    value: String,
    bindAttr: String
} 
*******/
class TextStatic extends React.Component {
    constructor(props) {
        super(props);
        this._findValue = this.findValue.bind(this);
    }
    render() {
        var htmlAttrs = this.props.htmlAttrs;
        var labelStyles = this.props.styles.label;
        var valueStyles = this.props.styles.value;
        var value = this._findValue();
        return (
            <div>
                {value &&
                    <label className={labelStyles.className} style={labelStyles.inlineStyle}>
                        {this.props.labelText}
                    </label>
                }
                {value &&
                    <label className={valueStyles.className} style={valueStyles.inlineStyle}>
                        {value}
                    </label>
                }
            </div>
        );
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
}

export default TextStatic;