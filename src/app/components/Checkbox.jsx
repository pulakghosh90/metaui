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
    }
    onClick(evt) {
        var state = {};
        state[this.props.bindAttr] = evt.target.checked;
        this.props.handlers.onChange(state);
    }

    render() {
        var htmlAttrs = this.props.htmlAttrs;
        var labelStyles = this.props.styles.label;
        var style = Object.assign({}, { paddingLeft: "5px", fontWeight: 100 }, labelStyles.inlineStyle);
        var key = htmlAttrs.key || htmlAttrs.id;

        return (
            <div >
                <input type="checkbox" key={key} id={htmlAttrs.id} value={this.props.value}
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