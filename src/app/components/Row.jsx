import React from "react";
import _ from "lodash";

class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var className = "row";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        var row = (
            <div className={className} style={this.props.style}>
                {this.props.children}
            </div>
        );
        return row;
    }
}

export default Row;