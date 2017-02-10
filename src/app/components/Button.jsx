import React from "react";

/******
accepts property in the below format
props = {
    labelText: {} || value,
    htmlAttrs: {},
    styles: {
        label: {className: String, inlineStyle: {}}
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
        var key = htmlAttrs.key || htmlAttrs.id;
        var className = labelStyles.className || "btn btn-default";

        return (
            <div>
                <button key={key} id={htmlAttrs.id} className={className}
                    style={labelStyles.inlineStyle} onClick={this._onClick} type="submit">
                    {this.props.labelText}
                </button>
            </div>
        );
    }
}

export default Button;