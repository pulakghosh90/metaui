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
        this.setState({ style: { border: "1px solid #ff0000" } });
        this.props.metadata.onChange(Object.assign({}, this.props.rowData, state));
    }
    render() {
        debugger;
        return (
            <div>
                <input value={this.props.data} onChange={this._onChange} style={this.state.style} />
            </div>
        );
    }
}

class GriddleGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Griddle {...this.props}  />
        );
    }
}

const GridCustomComponents = {
    TextBox
};
export {
    GridCustomComponents
};

export default GriddleGrid;