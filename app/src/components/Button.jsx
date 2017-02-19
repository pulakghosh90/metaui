import React from "react";

/******
accepts property in the below format
props = {
    labelText: {} || value,
    htmlAttrs: {},
    styles: {
        label: {className: String, inlineStyle: {}},
        icon: String
    },
    handlers: {}
} 
*******/
class Button extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = this.onClick.bind(this);
    }
    onClick(evt) {
        evt.preventDefault();
        this.props.handlers.onClick(evt);
    }
    render() {
        var htmlAttrs = this.props.htmlAttrs;
        var labelStyles = this.props.styles.label;
        var className = labelStyles.className || "btn btn-default";
        return (
            <button id={htmlAttrs.id} className={className}
                style={labelStyles.inlineStyle} onClick={this._onClick} type="submit">
                {
                    this.props.styles.icon &&
                    <span className={this.props.styles.icon}></span>
                }
                {this.props.labelText}
            </button>
        );
    }
}

export default Button;