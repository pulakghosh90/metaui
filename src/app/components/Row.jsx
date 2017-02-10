import React from "react";
import _ from "lodash";

const inlineStyle = {
    // paddingTop: "5px",
    paddingBottom: "5px"
};

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
            <div className={className} style={inlineStyle}>
                {this.props.children}
            </div>
        );
        return row;
    }
}

export default Row;