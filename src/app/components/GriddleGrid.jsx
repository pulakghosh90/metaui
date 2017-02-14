import React from "react";
import Griddle from "griddle-react";

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this.onChange.bind(this);
    }
    onChange(evt) {
        debugger;
    }
    render() {
        debugger;
        return (
            <div>
                <input value={this.props.data} onChange={this._onChange} style={{ width: "160px" }} />
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
            <Griddle {...this.props} tableClassName="table table-hover" useGriddleStyles={false} showPager={false} />
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