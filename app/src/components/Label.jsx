import React from "react";

/******
accepts property in the below format
props = {
    labelText: {} || value,
    htmlAttrs: {},
    styles: {
        label: {className: String, inlineStyle: {}}
    }
} 
*******/
class Label extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var htmlAttrs = this.props.htmlAttrs;
        var labelStyles = this.props.styles.label;
        return (
            <div>
                <label id={htmlAttrs.id} className={labelStyles.className} style={labelStyles.inlineStyle}>
                    {this.props.labelText}
                </label>
            </div>
        );
    }
}

export default Label;