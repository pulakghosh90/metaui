import React from "react";
import Griddle from "griddle-react";

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this.onChange.bind(this);
        this.state = { style: { width: "160px" } };
    }
    onChange(evt) {
        debugger;
        var state = {};
        state[this.props.metadata.columnName] = evt.target.value;
        // this.setState({ style: { border: "1px solid #ff0000" } });
        this.props.rowData.dirty = true;
        this.props.metadata.onChange(Object.assign({}, this.props.rowData, state));
    }
    render() {
        return (
            <div>
                <input value={this.props.data} onChange={this._onChange} style={this.state.style} />
            </div>
        );
    }
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = this.onClick.bind(this);
    }
    onClick(evt) {
        evt.preventDefault();
        this.props.metadata.onClick(this.props.rowData);
    }
    render() {
        return (
            <button onClick={this._onClick} style={this.props.metadata.style}>
                {
                    this.props.metadata.icon &&
                    <span className={this.props.metadata.icon} aria-hidden style={this.props.metadata.iconStyle}></span>
                }
                {this.props.metadata.labelText}
            </button>
        );
    }
}

class GriddleGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Griddle {...this.props} />
        );
    }
}

const GridCustomComponents = {
    TextBox, Button
};
export {
    GridCustomComponents
};

export default GriddleGrid;