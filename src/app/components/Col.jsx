import React from "react";
import _ from "lodash";

const col_xs_prefix = "col-xs-";
const col_sm_prefix = "col-sm-";
const col_md_prefix = "col-md-";
const col_lg_prefix = "col-lg-";
const SPACE = " ";

class Col extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var className = "";
        if (this.props.xs) {
            className += col_xs_prefix + this.props.xs;
        }
        if (this.props.sm) {
            className += SPACE + col_sm_prefix + this.props.sm;
        }
        if (this.props.md) {
            className += SPACE + col_md_prefix + this.props.md;
        }
        if (this.props.lg) {
            className += SPACE + col_lg_prefix + this.props.lg;
        }
        if (this.props.className) {
            className += SPACE + this.props.className;
        }
        var col = (
            <div className={className}>
                {this.props.children}
            </div>
        );
        return col;
    }
}

export default Col;